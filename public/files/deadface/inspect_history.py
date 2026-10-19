import sqlite3
import datetime

def chrome_time(timestamp):
    # Chrome timestamps are microseconds since Jan 1, 1601 UTC
    if not timestamp:
        return None
    try:
        return datetime.datetime(1601, 1, 1) + datetime.timedelta(microseconds=timestamp)
    except:
        return timestamp

conn = sqlite3.connect(r'C:\CTFS\DEAD FACE CTF\Hooked\extracted\ctf_artifacts\Chrome\User Data\Default\History')
c = conn.cursor()

print("=== TABLES ===")
c.execute("SELECT name FROM sqlite_master WHERE type='table';")
print([r[0] for r in c.fetchall()])

print("\n=== URLS ===")
c.execute("SELECT id, url, title, visit_count, typed_count, last_visit_time FROM urls;")
for r in c.fetchall():
    print(f"ID: {r[0]}, URL: {r[1]}, Title: {r[2]}, Visits: {r[3]}, Typed: {r[4]}, Last Visit: {chrome_time(r[5])}")

print("\n=== VISITS ===")
c.execute("SELECT id, url, visit_time, from_visit, transition FROM visits;")
for r in c.fetchall():
    print(f"ID: {r[0]}, URL_ID: {r[1]}, Time: {chrome_time(r[2])}, From: {r[3]}, Transition: {r[4]}")

print("\n=== LOGIN DATA ===")
conn2 = sqlite3.connect(r'C:\CTFS\DEAD FACE CTF\Hooked\extracted\ctf_artifacts\Chrome\User Data\Default\Login Data')
c2 = conn2.cursor()
c2.execute("SELECT origin_url, action_url, username_value FROM logins;")
for r in c2.fetchall():
    print(r)

