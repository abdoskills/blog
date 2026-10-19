import wave
import numpy as np

# DTMF frequencies
ROW_FREQS = [697, 770, 852, 941]
COL_FREQS = [1209, 1336, 1477, 1633]

KEY_MAP = {
    (697, 1209): '1', (697, 1336): '2', (697, 1477): '3', (697, 1633): 'A',
    (770, 1209): '4', (770, 1336): '5', (770, 1477): '6', (770, 1633): 'B',
    (852, 1209): '7', (852, 1336): '8', (852, 1477): '9', (852, 1633): 'C',
    (941, 1209): '*', (941, 1336): '0', (941, 1477): '#', (941, 1633): 'D'
}

def get_dtmf_digit(chunk, rate):
    # Goertzel or standard DFT at the 8 frequencies
    n = len(chunk)
    k_r = [int(0.5 + n * f / rate) for f in ROW_FREQS]
    k_c = [int(0.5 + n * f / rate) for f in COL_FREQS]
    
    fft = np.abs(np.fft.rfft(chunk * np.hamming(n)))
    
    # check energy
    r_energies = [fft[k] for k in k_r]
    c_energies = [fft[k] for k in k_c]
    
    max_r = max(r_energies)
    max_c = max(c_energies)
    
    total_energy = np.sum(fft)
    
    if max_r > 30000 and max_c > 30000 and (max_r + max_c) / total_energy > 0.15:
        best_r = ROW_FREQS[r_energies.index(max_r)]
        best_c = COL_FREQS[c_energies.index(max_c)]
        return KEY_MAP.get((best_r, best_c))
    return None

def decode_dtmf_stream(wav_path):
    with wave.open(wav_path, 'rb') as wf:
        n_samples = wf.getnframes()
        rate = wf.getframerate()
        data = np.frombuffer(wf.readframes(n_samples), dtype=np.int16)
        
    step = int(rate * 0.01) # 10ms
    win = int(rate * 0.04)  # 40ms window
    
    digits = []
    current_digit = None
    digit_duration = 0
    silence_duration = 0
    
    for i in range(0, len(data) - win, step):
        d = get_dtmf_digit(data[i:i+win], rate)
        if d == current_digit and d is not None:
            digit_duration += 1
        elif d != current_digit:
            if current_digit is not None and digit_duration >= 3: # at least 30ms
                digits.append(current_digit)
            current_digit = d
            digit_duration = 1 if d is not None else 0
            
    if current_digit is not None and digit_duration >= 3:
        digits.append(current_digit)
        
    res = "".join(digits)
    print(f"{wav_path} decoded: {len(res)} digits -> {res}")
    return res

in_d = decode_dtmf_stream('call_in.wav')
out_d = decode_dtmf_stream('call_out.wav')
