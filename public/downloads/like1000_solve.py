import tarfile
import os

for i in range(1000, 0, -1):
    tar_name = f"{i}.tar"
    if os.path.exists(tar_name):
        print(f"Extracting {tar_name}...")
        try:
            with tarfile.open(tar_name, "r") as tar:
                tar.extractall()
            os.remove(tar_name)
        except Exception as e:
            print(f"Error extracting {tar_name}: {e}")

if os.path.exists("filler.txt"):
    os.remove("filler.txt")

print("\nDone! Look at the folder now.")
