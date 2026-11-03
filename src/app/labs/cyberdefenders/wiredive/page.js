"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CopyButton from "@/components/CopyButton";

export default function WireDiveLabWriteup() {
  const [activeOpId, setActiveOpId] = useState("q1");

  const operations = [
    {
        "id": "part1",
        "num": "01",
        "title": "DHCP & DNS Protocol Triage",
        "pcap": "dhcp.pcapng & dns.pcapng",
        "badge": "5 QUESTIONS",
        "tag": "DORA/DNS",
        "questions": [
            {
                "id": "q1",
                "num": "01",
                "file": "dhcp.pcapng",
                "tag": "DHCP",
                "part": "part1",
                "title": "What IP address is requested by the client?",
                "ans": "192.168.2.244",
                "short": "Requested Client IP",
                "filter": "dhcp",
                "steps": [
                    "Open <code>dhcp.pcapng</code> in Wireshark.",
                    "Apply the display filter <code>dhcp</code> (or <code>bootp.option.dhcp == 3</code> for DHCP Requests specifically) to isolate DHCP traffic.",
                    "Inspect the DHCP Request packet (Packet 189) where the client requests its allocated IP address.",
                    "Expand <strong>Dynamic Host Configuration Protocol</strong> \u2794 <strong>Option: (50) Requested IP Address</strong>, which shows <code>192.168.2.244</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028220606.png"
                ]
            },
            {
                "id": "q2",
                "num": "02",
                "file": "dhcp.pcapng",
                "tag": "DHCP",
                "part": "part1",
                "title": "What is the transaction ID for the DHCP release?",
                "ans": "0x9f8fa557",
                "short": "DHCP Release TxID",
                "filter": "dhcp",
                "steps": [
                    "With the <code>dhcp</code> filter active, look at the very first packet in the trace: <strong>Packet 176</strong> (DHCP Release).",
                    "Click on Packet 176 and expand the <strong>Dynamic Host Configuration Protocol (Release)</strong> tree in the Packet Details pane.",
                    "Locate the <strong>Transaction ID</strong> field directly under Message/Hardware type: <code>0x9f8fa557</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028214839.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028214941.png"
                ]
            },
            {
                "id": "q3",
                "num": "03",
                "file": "dhcp.pcapng",
                "tag": "MAC",
                "part": "part1",
                "title": "What is the MAC address of the client?",
                "ans": "00:0c:29:82:f5:94",
                "short": "Client MAC Address",
                "filter": "dhcp",
                "steps": [
                    "In the same DHCP Release packet (Packet 176), inspect the client hardware identification.",
                    "In the <strong>Dynamic Host Configuration Protocol</strong> header, locate the field <strong>Client MAC address</strong>.",
                    "It shows <code>VMware_82:f5:94 (00:0c:29:82:f5:94)</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028220908.png"
                ]
            },
            {
                "id": "q4",
                "num": "04",
                "file": "dns.pcapng",
                "tag": "DNS",
                "part": "part1",
                "title": "What is the response for the lookup for flag.fruitinc.xyz?",
                "ans": "acooldnsflag",
                "short": "TXT Flag Lookup",
                "filter": "dns.qry.name == \"flag.fruitinc.xyz\"",
                "steps": [
                    "Switch to the second capture file: <code>dns.pcapng</code>.",
                    "Filter for the target domain: <code>dns.qry.name == \"flag.fruitinc.xyz\"</code> or scan standard queries.",
                    "Locate the Standard query response for <code>flag.fruitinc.xyz</code>.",
                    "Expand the <strong>Answers</strong> section of the DNS packet: the <strong>TXT</strong> record contains <code>acooldnsflag</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028221522.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028221722.png"
                ]
            },
            {
                "id": "q5",
                "num": "05",
                "file": "dns.pcapng",
                "tag": "ROOT",
                "part": "part1",
                "title": "Which root server responds to the google.com query? Hostname.",
                "ans": "e.root-servers.net",
                "short": "Root DNS Server Hostname",
                "filter": "dns",
                "steps": [
                    "<strong>Common Pitfall Avoidance:</strong> Packet 2 shows a root query, but it is merely requesting the list of root servers (<code>NS &lt;Root&gt;</code>), NOT answering for <code>google.com</code>!",
                    "Look right below it at <strong>Packet 3</strong>: The client sends a query for <code>google.com</code> to destination IP <code>192.203.230.10</code>.",
                    "Look at <strong>Packet 4</strong>: IP <code>192.203.230.10</code> responds to the <code>google.com</code> query by providing a referral pointing to the <code>.com</code> name servers (<code>gtld-servers.net</code>).",
                    "Resolving the fixed root server IP <code>192.203.230.10</code> (via reverse DNS lookup <code>nslookup 192.203.230.10</code> or standard IANA root server lists) reveals: <code>e.root-servers.net</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028222112.png"
                ]
            }
        ]
    },
    {
        "id": "part2",
        "num": "02",
        "title": "SMB Shares & Secrets Extraction",
        "pcap": "smb.pcapng",
        "badge": "4 QUESTIONS",
        "tag": "SMB/NTLM",
        "questions": [
            {
                "id": "q6",
                "num": "06",
                "file": "smb.pcapng",
                "tag": "SMB",
                "part": "part2",
                "title": "What is the path of the file that is opened?",
                "ans": "HelloWorld\\TradeSecrets.txt",
                "short": "Opened File Path",
                "filter": "smb2.filename contains \"txt\" || smb2.cmd == 5",
                "steps": [
                    "Switch to the third capture file: <code>smb.pcapng</code>.",
                    "To quickly pinpoint file access without manually scrolling through hundreds of packets, apply a filter for SMB2 Create / Open requests: <code>smb2.cmd == 5</code> or <code>smb2.filename contains \"txt\"</code>.",
                    "Inspect the SMB2 Create Request (Packet 147). Under <strong>SMB2 (Server Message Block Protocol Version 2)</strong> \u2794 <strong>Create Request (0x05)</strong>, locate the <strong>Filename</strong> field: <code>HelloWorld\\TradeSecrets.txt</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028232201.png"
                ]
            },
            {
                "id": "q7",
                "num": "07",
                "file": "smb.pcapng",
                "tag": "STATUS",
                "part": "part2",
                "title": "What was the hex status code when the user SAMBA\\jtomato logs in?",
                "ans": "0xc000006d",
                "short": "NTLM Logon Failure Status",
                "filter": "ntlmssp.auth.username == \"jtomato\"",
                "steps": [
                    "Search for user <code>jtomato</code> by filtering: <code>ntlmssp.auth.username == \"jtomato\"</code> (or press Ctrl+F \u2794 String \u2794 jtomato).",
                    "Wireshark isolates <strong>Packet 75</strong>: <code>Session Setup Request, NTLMSSP_AUTH, User: SAMBA\\jtomato</code>.",
                    "<strong>The Trap:</strong> Packet 75 is a client request and will never contain a status code. The status code is returned by the server in the response!",
                    "Double-click the blue generated <code>[Response in: 76]</code> link in the SMB2 Header (or step to <strong>Packet 76</strong>).",
                    "In Packet 76 (<code>Session Setup Response, Error: STATUS_LOGON_FAILURE</code>), expand the SMB2 Header: <strong>NT Status: STATUS_LOGON_FAILURE (0xc000006d)</strong>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028234432.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028234311.png"
                ]
            },
            {
                "id": "q8",
                "num": "08",
                "file": "smb.pcapng",
                "tag": "TREE",
                "part": "part2",
                "title": "What is the tree that is being browsed?",
                "ans": "\\\\192.168.2.10\\public",
                "short": "Mounted SMB File Share",
                "filter": "smb2.cmd == 3",
                "steps": [
                    "In SMB2, connecting to a shared network directory is designated as a <strong>Tree Connect</strong>. Before a client can browse files, it issues a <code>Tree Connect Request</code>.",
                    "Filter specifically for Tree Connect commands: <code>smb2.cmd == 3</code>.",
                    "Two Tree Connect requests are observed: Packet 124 connects to <code>\\\\192.168.2.10\\IPC$</code> (system RPC management), and <strong>Packet 133</strong> connects to <code>\\\\192.168.2.10\\public</code>.",
                    "Packet 133 is the actual shared filesystem tree where subsequent directory operations and <code>HelloWorld\\TradeSecrets.txt</code> reside: <code>\\\\192.168.2.10\\public</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261028235525.png"
                ]
            },
            {
                "id": "q9",
                "num": "09",
                "file": "smb.pcapng",
                "tag": "FLAG",
                "part": "part2",
                "title": "What is the flag in the file?",
                "ans": "OneSuperDuperSecret",
                "short": "TradeSecrets.txt Flag",
                "filter": "Export SMB Objects",
                "steps": [
                    "We know the client accessed <code>TradeSecrets.txt</code>. To extract its unencrypted contents, use Wireshark's built-in file carver: <strong>File \u2794 Export Objects \u2794 SMB...</strong>.",
                    "Locate <code>\\HelloWorld\\TradeSecrets.txt</code> (50,166 bytes), select it, and save it to disk.",
                    "Open the saved file (which contains the Bee Movie script) and search for <code>flag</code>:",
                    "<code>... Order in this court! flag&lt;OneSuperDuperSecret&gt; - You're all thinking ...</code>",
                    "*(Alternative method)*: In Wireshark, press Ctrl+F \u2794 Packet bytes \u2794 String \u2794 <code>flag</code> to jump straight to the data frame."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029000721.png"
                ]
            }
        ]
    },
    {
        "id": "part3",
        "num": "03",
        "title": "Linux Reverse Shell & PrivEsc",
        "pcap": "shell.pcapng",
        "badge": "7 QUESTIONS",
        "tag": "SHELL/SUDO",
        "questions": [
            {
                "id": "q10",
                "num": "10",
                "file": "shell.pcapng",
                "tag": "PORT",
                "part": "part3",
                "title": "What port is the shell listening on?",
                "ans": "4444",
                "short": "Initial Shell Port",
                "filter": "tcp.port == 4444",
                "steps": [
                    "Switch to <code>shell.pcapng</code>.",
                    "<strong>Strategy:</strong> Rather than analyzing packet-by-packet, follow the TCP Stream to reconstruct the entire interactive terminal session.",
                    "Right-click Packet #1 \u2794 <strong>Follow \u2794 TCP Stream</strong> (Stream 0).",
                    "In Statistics \u2794 Conversations \u2794 TCP or Packet #1: Client <code>192.168.2.5:52242</code> connects to <code>192.168.2.244:4444</code>.",
                    "The Linux shell prompt <code>jtomato@ns01:~$</code> appears over port <code>4444</code>."
                ],
                "images": []
            },
            {
                "id": "q11",
                "num": "11",
                "file": "shell.pcapng",
                "tag": "PORT",
                "part": "part3",
                "title": "What is the port for the second shell?",
                "ans": "9999",
                "short": "Second Netcat Shell Port",
                "filter": "tcp.port == 9999",
                "steps": [
                    "Stay in the same TCP Stream 0 window and scroll down to observe attacker commands.",
                    "Towards the end of the session, the attacker spawns a second netcat listener:",
                    "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S nc -nvlp 9999 &lt; /etc/passwd</code>",
                    "The flag <code>-p 9999</code> specifies port <code>9999</code>. Netcat confirms: <code>Listening on [0.0.0.0] (family 0, port 9999)</code>."
                ],
                "images": []
            },
            {
                "id": "q12",
                "num": "12",
                "file": "shell.pcapng",
                "tag": "NC",
                "part": "part3",
                "title": "What version of netcat is installed?",
                "ans": "1.10-41.1",
                "short": "Netcat Package Version",
                "filter": "Follow TCP Stream 0",
                "steps": [
                    "In Stream 0, examine the package installation command executed prior to spawning the listener:",
                    "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S apt install netcat</code>",
                    "Review the APT package manager output lines:",
                    "<code>Get:1 http://us.archive.ubuntu.com/ubuntu bionic/universe amd64 netcat all 1.10-41.1</code>",
                    "<code>Unpacking netcat (1.10-41.1) ...</code>",
                    "The installed netcat package version string is <code>1.10-41.1</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029001816.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029001750.png"
                ]
            },
            {
                "id": "q13",
                "num": "13",
                "file": "shell.pcapng",
                "tag": "FILE",
                "part": "part3",
                "title": "What file is added to the second shell?",
                "ans": "/etc/passwd",
                "short": "Streamed Input File",
                "filter": "Follow TCP Stream 0",
                "steps": [
                    "In Stream 0, analyze the command line syntax used to initiate the listener on port 9999:",
                    "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S nc -nvlp 9999 &lt; /etc/passwd</code>",
                    "The input redirection operator <code>&lt;</code> streams the file <code>/etc/passwd</code> directly into netcat for any incoming connection to download."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029002109.png"
                ]
            },
            {
                "id": "q14",
                "num": "14",
                "file": "shell.pcapng",
                "tag": "PASS",
                "part": "part3",
                "title": "What password is used to elevate the shell?",
                "ans": "*umR@Q%4V&RC",
                "short": "Plaintext Sudo Password",
                "filter": "Follow TCP Stream 0",
                "steps": [
                    "Linux privilege escalation in this session is executed via <code>sudo -S</code> (which reads credentials from standard input).",
                    "Notice the attacker pipelines their password into sudo across several commands:",
                    "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S apt update</code>",
                    "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S apt install netcat</code>",
                    "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S -i</code>",
                    "The password used for elevation is <code>*umR@Q%4V&amp;RC</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029001702.png"
                ]
            },
            {
                "id": "q15",
                "num": "15",
                "file": "shell.pcapng",
                "tag": "OS",
                "part": "part3",
                "title": "What is the codename of the target system's OS version?",
                "ans": "bionic",
                "short": "Ubuntu Codename",
                "filter": "Follow TCP Stream 0",
                "steps": [
                    "In Stream 0, examine the output of the <code>apt update</code> command:",
                    "<code>Hit:1 http://us.archive.ubuntu.com/ubuntu bionic InRelease</code>",
                    "<code>Hit:2 http://us.archive.ubuntu.com/ubuntu bionic-updates InRelease</code>",
                    "In Debian/Ubuntu distributions, repository paths reflect the OS release codename (Ubuntu 18.04 LTS is <code>bionic</code>)."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029002311.png"
                ]
            },
            {
                "id": "q16",
                "num": "16",
                "file": "shell.pcapng",
                "tag": "USER",
                "part": "part3",
                "title": "How many users are on the target system?",
                "ans": "31",
                "short": "Exfiltrated Users Count",
                "filter": "tcp.port == 9999",
                "steps": [
                    "In Q13, we saw <code>/etc/passwd</code> was served over port 9999.",
                    "Filter for the second shell traffic: <code>tcp.port == 9999</code>.",
                    "Right-click any packet \u2794 <strong>Follow \u2794 TCP Stream</strong> (Stream 6).",
                    "The complete <code>/etc/passwd</code> file is dumped in plaintext (from <code>root:x:0:0...</code> down to <code>bind:x:111:113...</code>).",
                    "Counting the individual user entries line-by-line yields exactly <code>31</code> accounts."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029002415.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029002519.png"
                ]
            }
        ]
    },
    {
        "id": "part4",
        "num": "04",
        "title": "Enterprise Infrastructure & Cisco IOS",
        "pcap": "network.pcapng",
        "badge": "13 QUESTIONS",
        "tag": "STP/CDP/SNMP",
        "questions": [
            {
                "id": "q17",
                "num": "17",
                "file": "network.pcapng",
                "tag": "NTP",
                "part": "part4",
                "title": "What is the IPv6 NTP server IP?",
                "ans": "2003:51:6012:110::dcf7:123",
                "short": "IPv6 NTP Server Address",
                "filter": "ntp",
                "steps": [
                    "Switch to the fourth capture file: <code>network.pcapng</code>.",
                    "Filter for Network Time Protocol traffic: <code>ntp</code>.",
                    "Inspect the IPv6 packets. The external NTP server communicating with the local host is <code>2003:51:6012:110::dcf7:123</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029002906.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029002943.png"
                ]
            },
            {
                "id": "q18",
                "num": "18",
                "file": "network.pcapng",
                "tag": "DHCP",
                "part": "part4",
                "title": "What is the first IP address that is requested by the DHCP client?",
                "ans": "192.168.20.11",
                "short": "First Requested DHCP IP",
                "filter": "bootp.option.dhcp == 3 || dhcp",
                "steps": [
                    "Filter for DHCP traffic: <code>dhcp</code> (or filter specifically for DHCP Request messages: <code>bootp.option.dhcp == 3</code>).",
                    "The DHCP DORA handshake proceeds: Discover \u2794 Offer \u2794 Request \u2794 Ack.",
                    "Inspect the very first <strong>DHCP Request</strong> in the trace (<strong>Packet 1254</strong>).",
                    "Expand <strong>Dynamic Host Configuration Protocol</strong> \u2794 <strong>Option: (50) Requested IP Address</strong>, which shows <code>192.168.20.11</code>."
                ],
                "images": []
            },
            {
                "id": "q19",
                "num": "19",
                "file": "network.pcapng",
                "tag": "DNS",
                "part": "part4",
                "title": "What is the first authoritative name server returned for the domain that is being queried?",
                "ans": "ns1.hans.hosteurope.de",
                "short": "First Authoritative NS",
                "filter": "dns",
                "steps": [
                    "Filter for DNS traffic: <code>dns</code>.",
                    "Locate the first DNS query response: <strong>Packet 243</strong> (resolving <code>blog.webernetz.net</code>).",
                    "In Packet Details, expand the <strong>Authoritative nameservers</strong> section.",
                    "The very first authoritative nameserver record returned is <code>Name Server: ns1.hans.hosteurope.de</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029005444.png"
                ]
            },
            {
                "id": "q20",
                "num": "20",
                "file": "network.pcapng",
                "tag": "STP",
                "part": "part4",
                "title": "What is the number of the first VLAN to have a topology change occur?",
                "ans": "20",
                "short": "Topology Change VLAN ID",
                "filter": "stp.flags.tc == 1",
                "steps": [
                    "Spanning Tree Protocol (STP) signals network topology reconfigurations using the Topology Change (TC) bit flag.",
                    "Filter for STP BPDUs where the TC bit is active: <code>stp.flags.tc == 1</code>.",
                    "Examine the very first packet returned: <strong>Packet 42</strong>.",
                    "In Packet Details, expand the IEEE 802.1Q Virtual LAN header or Spanning Tree Originating VLAN (PVID): it indicates VLAN <code>20</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029010107.png"
                ]
            },
            {
                "id": "q21",
                "num": "21",
                "file": "network.pcapng",
                "tag": "CDP",
                "part": "part4",
                "title": "What is the port for CDP for CCNP-LAB-S2?",
                "ans": "GigabitEthernet0/2",
                "short": "CDP Outgoing Port ID",
                "filter": "cdp",
                "steps": [
                    "Cisco Discovery Protocol (CDP) broadcasts layer-2 neighbor details between Cisco switches and routers.",
                    "Filter for CDP packets: <code>cdp</code>.",
                    "Locate the announcement from device <code>CCNP-LAB-S2.webernetz.net</code> (<strong>Packet 133</strong>).",
                    "Expand <strong>Cisco Discovery Protocol</strong> \u2794 <strong>Port ID</strong>: <code>Sent through Interface: GigabitEthernet0/2</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029010337.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029010317.png"
                ]
            },
            {
                "id": "q22",
                "num": "22",
                "file": "network.pcapng",
                "tag": "STP",
                "part": "part4",
                "title": "What is the MAC address for the root bridge for VLAN 60?",
                "ans": "00:21:1b:ae:31:80",
                "short": "VLAN 60 Root Bridge MAC",
                "filter": "vlan.id == 60 && stp",
                "steps": [
                    "Filter for STP traffic specifically tagged on VLAN 60: <code>vlan.id == 60 &amp;&amp; stp</code>.",
                    "Select any matching BPDU packet (e.g., <strong>Packet 20</strong>).",
                    "Expand <strong>Spanning Tree Protocol</strong> \u2794 <strong>Root Identifier</strong>.",
                    "Read the <strong>Root Bridge System ID</strong> MAC: <code>00:21:1b:ae:31:80</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029010422.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029010454.png"
                ]
            },
            {
                "id": "q23",
                "num": "23",
                "file": "network.pcapng",
                "tag": "IOS",
                "part": "part4",
                "title": "What is the IOS version running on CCNP-LAB-S2?",
                "ans": "12.1(22)EA14",
                "short": "Cisco IOS Version",
                "filter": "cdp",
                "steps": [
                    "Return to the CDP announcement for switch <code>CCNP-LAB-S2</code> (<strong>Packet 133</strong>).",
                    "Expand the <strong>Software Version</strong> TLV.",
                    "It displays: <code>IOS (tm) C2950 Software (C2950-I6K2L2Q4-M), Version 12.1(22)EA14, RELEASE SOFTWARE (fc1)</code>.",
                    "The IOS release version matching the required format is <code>12.1(22)EA14</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029010607.png"
                ]
            },
            {
                "id": "q24",
                "num": "24",
                "file": "network.pcapng",
                "tag": "HSRP",
                "part": "part4",
                "title": "What is the virtual IP address used for HSRP group 121?",
                "ans": "192.168.121.1",
                "short": "HSRP Virtual IP",
                "filter": "hsrp || hsrp2.group == 121",
                "steps": [
                    "Filter for Cisco Hot Standby Router Protocol traffic: <code>hsrp</code> (or group 121: <code>hsrp2.group == 121</code>).",
                    "Select an HSRP packet belonging to group 121 (e.g., <strong>Packet 15</strong>).",
                    "Expand <strong>Cisco Hot Standby Router Protocol</strong> \u2794 <strong>Group State TLV</strong>.",
                    "Inspect the <strong>Virtual IP Address</strong> field: <code>192.168.121.1</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029010842.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029010755.png"
                ]
            },
            {
                "id": "q25",
                "num": "25",
                "file": "network.pcapng",
                "tag": "IPv6",
                "part": "part4",
                "title": "How many router solicitations were sent?",
                "ans": "3",
                "short": "ICMPv6 Solicitations Count",
                "filter": "icmpv6.type == 133",
                "steps": [
                    "<strong>Technical Context:</strong> Under IPv6 SLAAC (Stateless Address Autoconfiguration), connecting hosts broadcast ICMPv6 Router Solicitations to <code>ff02::2</code> (All-Routers multicast) requesting network prefixes.",
                    "In ICMPv6, Type 133 designates Router Solicitations (while Type 134 designates Router Advertisements).",
                    "Filter directly for solicitations: <code>icmpv6.type == 133</code>.",
                    "Wireshark isolates exactly 3 packets: <strong>Packet 1187</strong>, <strong>Packet 1220</strong>, and <strong>Packet 1267</strong>. Check Wireshark status bar: <code>Packets: 3890 \u00b7 Displayed: 3 (0.1%)</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029012152.png"
                ]
            },
            {
                "id": "q26",
                "num": "26",
                "file": "network.pcapng",
                "tag": "MGMT",
                "part": "part4",
                "title": "What is the management address of CCNP-LAB-S2?",
                "ans": "192.168.121.20",
                "short": "Management IP Address",
                "filter": "cdp",
                "steps": [
                    "Return to the CDP packet for <code>CCNP-LAB-S2</code> (<strong>Packet 133</strong>).",
                    "Expand the <strong>Management Addresses</strong> TLV (or <strong>Addresses</strong> section).",
                    "The configured device management IP is listed as <code>192.168.121.20</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029011026.png"
                ]
            },
            {
                "id": "q27",
                "num": "27",
                "file": "network.pcapng",
                "tag": "SNMP",
                "part": "part4",
                "title": "What is the interface being reported on in the first SNMP query?",
                "ans": "Fa0/1",
                "short": "Queried SNMP Interface",
                "filter": "snmp",
                "steps": [
                    "Filter for Simple Network Management Protocol traffic: <code>snmp</code>.",
                    "Locate the first query sequence: <strong>Packet 1911</strong> (<code>get-request</code>) and <strong>Packet 1912</strong> (<code>get-response</code>).",
                    "In <strong>Packet 1912</strong>, expand <strong>variable-bindings</strong>.",
                    "The SNMP response resolves OID <code>1.3.6.1.2.1.31.1.1.1.1.2</code> (IF-MIB ifName for index 2) with the string <code>\"Fa0/1\"</code> (FastEthernet 0/1)."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029011205.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029011338.png"
                ]
            },
            {
                "id": "q28",
                "num": "28",
                "file": "network.pcapng",
                "tag": "TFTP",
                "part": "part4",
                "title": "When was the NVRAM config last updated?",
                "ans": "2017-03-03 21:02",
                "short": "NVRAM Last Update Timestamp",
                "filter": "tftp",
                "steps": [
                    "Network engineers often automate Cisco router backups using <code>archive</code> over TFTP.",
                    "Filter for TFTP traffic: <code>tftp</code>.",
                    "In <strong>Packet 3766</strong>, the router sends a TFTP Write Request for file <code>CCNP-LAB-R2-Mar--3-20-02-38.701-7</code>.",
                    "Right-click Packet 3766 \u2794 <strong>Follow \u2794 UDP Stream</strong> (or export the object via File \u2794 Export Objects \u2794 TFTP...).",
                    "Read the timestamp comments stamped at the very top of the configuration:",
                    "<code>! Last configuration change at 20:55:45 UTC Fri Mar 3 2017 by weberjoh</code>",
                    "<code>! NVRAM config last updated at 21:02:36 UTC Fri Mar 3 2017 by weberjoh</code>",
                    "Formatting as <code>yyyy-mm-dd hh:mm</code> gives <code>2017-03-03 21:02</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261029011812.png"
                ]
            },
            {
                "id": "q29",
                "num": "29",
                "file": "network.pcapng",
                "tag": "RADIUS",
                "part": "part4",
                "title": "What is the IPv6 of the RADIUS server?",
                "ans": "2001:DB8::1812",
                "short": "RADIUS Server IPv6",
                "filter": "Follow UDP Stream 8 (TFTP config)",
                "steps": [
                    "In enterprise network operations, RADIUS provides centralized AAA authentication for administrative switch and router logins.",
                    "Search within the plaintext Cisco router configuration dumped in Q28 for the keyword <code>radius</code>.",
                    "The configuration reveals:",
                    "<code>radius server blubb</code>",
                    "<code> address ipv6 2001:DB8::1812 auth-port 1812 acct-port 1813</code>",
                    "The configured RADIUS server IPv6 address is <code>2001:DB8::1812</code>."
                ],
                "images": []
            }
        ]
    },
    {
        "id": "part5",
        "num": "05",
        "title": "Decrypted TLS & pfSense Administration",
        "pcap": "https.pcapng",
        "badge": "6 QUESTIONS",
        "tag": "TLS/HTTP2",
        "questions": [
            {
                "id": "q30",
                "num": "30",
                "file": "https.pcapng",
                "tag": "HTTP",
                "part": "part5",
                "title": "What has been added to web interaction with web01.fruitinc.xyz?",
                "ans": "y2*Lg4cHe@Ps",
                "short": "Custom Header Flag",
                "filter": "ip.addr == 192.168.2.20 && http",
                "steps": [
                    "<strong>Prerequisite \u2014 TLS Decryption:</strong> Open <code>https.pcapng</code>. Go to <strong>Edit \u2794 Preferences... \u2794 Protocols \u2794 TLS</strong>. Under <strong>(Pre)-Master-Secret log filename</strong>, browse and select <code>secret_sauce.txt</code> from the lab archive. Wireshark instantly decrypts all TLS streams!",
                    "<strong>The Missing Response Wireshark Trap:</strong> Filtering by <code>http.host == \"web01.fruitinc.xyz\"</code> only displays request frames (675 and 707) because responses do not have a <code>Host:</code> header!",
                    "Filter instead by destination server IP: <code>ip.addr == 192.168.2.20 &amp;&amp; http</code> (or follow the HTTP stream on Packet 675).",
                    "Inspect the server response in <strong>Packet 678</strong> (<code>HTTP/1.1 200 OK</code>). Under the HTTP headers, locate the custom response header: <code>flag: y2*Lg4cHe@Ps</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103132230.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103133231.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103133043.png"
                ]
            },
            {
                "id": "q31",
                "num": "31",
                "file": "https.pcapng",
                "tag": "SLACK",
                "part": "part5",
                "title": "What is the name of the photo that is viewed in slack?",
                "ans": "get_a_new_phone_today__720.jpg",
                "short": "Slack Image Thumbnail",
                "filter": "http.host == \"files.slack.com\"",
                "steps": [
                    "Slack serves media assets through <code>files.slack.com</code>. In-feed channel previews download thumbnail assets from <code>/files-tmb/</code>.",
                    "Filter for Slack file requests: <code>http.host == \"files.slack.com\"</code>.",
                    "Inspect <strong>Packet 6642</strong>:",
                    "<code>GET /files-tmb/TTL7QHDUJ-F011PDVK8TD-115062e5c0/get_a_new_phone_today__720.jpg HTTP/1.1</code>",
                    "Notice the pattern with the double underscore before 720: <code>get_a_new_phone_today__720.jpg</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103133057.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103132711.png"
                ]
            },
            {
                "id": "q32",
                "num": "32",
                "file": "https.pcapng",
                "tag": "AUTH",
                "part": "part5",
                "title": "What is the username and password to login to 192.168.2.1?",
                "ans": "admin:Ac5R4D9iyqD5bSh",
                "short": "pfSense WebGUI Credentials",
                "filter": "ip.addr == 192.168.2.1 && http2",
                "steps": [
                    "Traffic to the pfSense firewall at <code>192.168.2.1</code> utilizes <strong>HTTP/2</strong>.",
                    "Filter for HTTP/2 traffic communicating with the gateway: <code>ip.addr == 192.168.2.1 &amp;&amp; http2</code>.",
                    "Locate <strong>Packet 936</strong> (HTTP/2 HEADERS frame for <code>POST /</code>) followed by <strong>Packet 937</strong> (HTTP/2 DATA frame).",
                    "Expand <strong>HTML Form URL Encoded: application/x-www-form-urlencoded</strong>:",
                    "<code>usernamefld: admin</code>",
                    "<code>passwordfld: Ac5R4D9iyqD5bSh</code>",
                    "Formatted as <code>username:password</code> gives <code>admin:Ac5R4D9iyqD5bSh</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103133814.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103133940.png"
                ]
            },
            {
                "id": "q33",
                "num": "33",
                "file": "https.pcapng",
                "tag": "OCSP",
                "part": "part5",
                "title": "What is the certStatus for the certificate with a serial number of 07752cebe5222fcf5c7d2038984c5198?",
                "ans": "good",
                "short": "OCSP Certificate Status",
                "filter": "ocsp.serialNumber == 07:75:2c:eb:e5:22:2f:cf:5c:7d:20:38:98:4c:51:98",
                "steps": [
                    "Online Certificate Status Protocol (OCSP) verifies whether an SSL/TLS certificate has been revoked.",
                    "Filter for OCSP packets: <code>ocsp</code> (or match the serial: <code>ocsp.serialNumber == 07:75:2c:eb:e5:22:2f:cf:5c:7d:20:38:98:4c:51:98</code>).",
                    "Inspect the OCSP response in <strong>Packet 160</strong>.",
                    "Expand <strong>Online Certificate Status Protocol</strong> \u2794 <strong>responseBytes</strong> \u2794 <strong>BasicOCSPResponse</strong> \u2794 <strong>tbsResponseData</strong> \u2794 <strong>responses</strong>.",
                    "Under serial number <code>0x07752cebe5222fcf5c7d2038984c5198</code>, inspect the status field: <strong>certStatus: good (0)</strong>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103134414.png"
                ]
            },
            {
                "id": "q34",
                "num": "34",
                "file": "https.pcapng",
                "tag": "LEAK",
                "part": "part5",
                "title": "What is the email of someone who needs to change their password?",
                "ans": "Jim.Tomato@fruitinc.xyz",
                "short": "Exposed Slack User Email",
                "filter": "urlencoded-form.key == \"password\"",
                "steps": [
                    "Filter for decrypted HTTP form submissions containing plaintext passwords: <code>urlencoded-form.key == \"password\"</code>.",
                    "Examine <strong>Packet 4758</strong> (authentication request submitted to <code>fruitincworkspace.slack.com</code>).",
                    "In the URL-encoded POST payload:",
                    "<code>email: Jim.Tomato@fruitinc.xyz</code>",
                    "<code>password: v^DDLM98GbM#</code>",
                    "Employee Jim Tomato transmitted his account credentials over an insecure connection, exposing his password."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103134121.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103134155.png"
                ]
            },
            {
                "id": "q35",
                "num": "35",
                "file": "https.pcapng",
                "tag": "SVC",
                "part": "part5",
                "title": "A service is assigned to an interface. What is the interface, and what is the service?",
                "ans": "lan:ntp",
                "short": "Configured Interface & Service",
                "filter": "ip.addr == 192.168.2.1 && http2",
                "steps": [
                    "In Q32, the administrator authenticated into the pfSense firewall at <code>192.168.2.1</code>.",
                    "In <strong>Packet 1076</strong>, the admin accesses <code>GET /services_ntpd.php</code> (NTP daemon management).",
                    "In <strong>Packets 1107 &amp; 1108</strong>, the admin submits a configuration form: <code>POST /services_ntpd.php</code>.",
                    "Inspect the multipart form payload in Packet 1108 under <code>name=\"interface[]\"</code>:",
                    "Raw data is displayed in hex: <code>6c616e</code>. Converting hex to ASCII: <code>6c</code> (l), <code>61</code> (a), <code>6e</code> (n) \u2794 <code>lan</code>.",
                    "The configured daemon service is <code>ntp</code> on interface <code>lan</code>, formatted as <code>lan:ntp</code>."
                ],
                "images": [
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103134656.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103134745.png",
                    "/images/cyberdefenders/wiredive/Pasted_image_20261103135738.png"
                ]
            }
        ]
    }
];

  const allQuestionIds = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24", "q25", "q26", "q27", "q28", "q29", "q30", "q31", "q32", "q33", "q34", "q35"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = allQuestionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allQuestionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (top <= scrollPosition) {
            setActiveOpId(allQuestionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      <main className="flex-grow pt-6 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Breadcrumbs */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <Link href="/labs" className="hover:text-emerald-400 transition-colors">
              THREAT LABS
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/labs/cyberdefenders" className="hover:text-emerald-400 transition-colors">
              CYBERDEFENDERS
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-emerald-400 uppercase">WIREDIVE LAB</span>
          </div>

          {/* Banner Graphic */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black/60 max-w-4xl mx-auto">
            <Image
              src="/images/cyberdefenders/wiredive_banner.png"
              alt="CyberDefenders WireDive Lab Banner"
              width={1200}
              height={630}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-8 border-b border-zinc-800 pb-8 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 text-xs font-mono font-bold">
                CyberDefenders • Blue Team Lab #37
              </span>
              <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-xs font-mono">
                Network Forensics / PCAP Analysis
              </span>
              <span className="px-2.5 py-1 rounded bg-blue-950/40 text-blue-400 border border-blue-800/40 text-xs font-mono">
                TLS Decryption
              </span>
              <span className="px-2.5 py-1 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-800/40 text-xs font-mono">
                Cisco IOS & Routing
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-4">
              CyberDefenders — WireDive Lab Writeup
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
              Comprehensive step-by-step investigation of 5 multi-protocol packet capture traces. Spanning DHCP address allocation, DNS lookups, SMB share exfiltration, Linux reverse shells, enterprise Cisco switching protocols (STP, CDP, HSRP, SNMP, TFTP NVRAM configs), and decrypting HTTPS/HTTP2 traffic via SSL pre-master secret key logs.
            </p>

            {/* Key Forensic Traces Overview Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#0a0a0f] border border-zinc-800">
              <span className="text-xs font-mono uppercase text-zinc-400 font-bold block mb-2">
                Forensic Artifact Trace Files (5):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 font-mono text-xs">
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-emerald-400 font-bold block text-[11px]">dhcp.pcapng & dns.pcapng</span>
                  <span className="text-zinc-400 text-[10px]">DORA process, MAC addresses, root DNS referrals</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-amber-400 font-bold block text-[11px]">smb.pcapng</span>
                  <span className="text-zinc-400 text-[10px]">NTLMSSP auth failure & SMB object extraction</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-rose-400 font-bold block text-[11px]">shell.pcapng</span>
                  <span className="text-zinc-400 text-[10px]">Interactive TCP streams, netcat & sudo privesc</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800">
                  <span className="text-cyan-400 font-bold block text-[11px]">network.pcapng</span>
                  <span className="text-zinc-400 text-[10px]">Cisco STP, CDP, HSRP, ICMPv6, SNMP & TFTP NVRAM</span>
                </div>
                <div className="bg-zinc-900/80 p-2.5 rounded border border-zinc-800 sm:col-span-2 md:col-span-2">
                  <span className="text-purple-400 font-bold block text-[11px]">https.pcapng + secret_sauce.txt</span>
                  <span className="text-zinc-400 text-[10px]">TLS pre-master secret key decryption, HTTP/2 streams & pfSense WebGUI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Download Artifact Box & Reference Box */}
          <div className="max-w-4xl mx-auto mb-10 space-y-3">
            <div className="bg-gradient-to-r from-emerald-950/30 to-[#0e0e13] border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider font-bold">
                    Challenge Artifact
                  </span>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] mt-1">
                    37-WireDive.zip (26.5 MB)
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">
                    Source: <code className="text-zinc-300 bg-black/50 px-1 py-0.5 rounded">C:\CTFS\CyberDefenders\WIRE DIVE LAB</code>
                  </p>
                </div>
                <a
                  href="/files/cyberdefenders/37-WireDive.zip"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs transition-all duration-300 shadow-md hover:shadow-emerald-500/25 shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download 37-WireDive.zip
                </a>
              </div>
            </div>

            {/* Official Lab Reference Box */}
            <div className="bg-[#0e0e13]/90 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <div>
                  <span className="text-zinc-400">Official Lab Reference: </span>
                  <span className="text-white font-bold">CyberDefenders — WireDive (Lab #37)</span>
                </div>
              </div>
              <a
                href="https://cyberdefenders.org/blueteam-ctf-challenges/wiredive/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-mono transition-colors shrink-0"
              >
                <span>Open on CyberDefenders.org</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile Operations Index Bar */}
          <div className="lg:hidden mb-8 p-3 rounded-xl bg-[#0a0a0f] border border-zinc-800 overflow-x-auto">
            <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-2 font-bold px-1">
              Operations Index (35 Questions)
            </span>
            <div className="flex gap-2 min-w-max">
              {operations.map((op) => (
                <button
                  key={op.id}
                  onClick={() => scrollToElement(op.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5 bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                >
                  <span>{op.num}.</span>
                  <span>{op.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Section with Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 bg-[#0a0a0f]/90 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-xl max-h-[calc(100vh-8rem)] overflow-y-auto space-y-4 font-mono text-xs shadow-xl">
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold px-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>Operations Index</span>
                  <span className="text-[10px] text-emerald-400 font-bold">35 Questions</span>
                </div>

                {operations.map((op) => (
                  <div key={op.id} className="space-y-1.5 pt-2 first:pt-0">
                    <div className="px-2 py-1 text-[11px] font-bold text-white bg-zinc-900/60 rounded border border-zinc-800/80 flex items-center justify-between">
                      <span className="truncate">{op.num}. {op.title}</span>
                      <span className="text-[9px] text-emerald-400 shrink-0 ml-1">{op.tag}</span>
                    </div>
                    <div className="pl-2 space-y-0.5 border-l border-zinc-800 ml-2">
                      {op.questions.map((q) => (
                        <button
                          key={q.id}
                          onClick={() => scrollToElement(q.id)}
                          className={`w-full text-left px-2 py-1 rounded transition-colors flex items-center justify-between text-[11px] ${
                            activeOpId === q.id
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                          }`}
                        >
                          <span className="truncate">{q.num}. {q.short}</span>
                          <span className="text-[9px] text-zinc-500 shrink-0 ml-1">{q.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-12">
              {/* Operation 01 Banner */}
              <div id="part1" className="scroll-mt-24 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 01 • DORA/DNS
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Target PCAP: <code className="text-white bg-black/60 px-1.5 py-0.5 rounded border border-zinc-800">dhcp.pcapng & dns.pcapng</code>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide">
                  DHCP & DNS Protocol Triage
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Covering questions 01 through 05 with Wireshark packet stream analysis.
                </p>
              </div>

              {/* Question 01 */}
              <section id="q1" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q01 • DHCP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: dhcp.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q1: What IP address is requested by the client?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Open <code>dhcp.pcapng</code> in Wireshark." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Apply the display filter <code>dhcp</code> (or <code>bootp.option.dhcp == 3</code> for DHCP Requests specifically) to isolate DHCP traffic." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect the DHCP Request packet (Packet 189) where the client requests its allocated IP address." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand <strong>Dynamic Host Configuration Protocol</strong> \u2794 <strong>Option: (50) Requested IP Address</strong>, which shows <code>192.168.2.244</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"dhcp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>dhcp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028220606.png"
                    alt={"Wireshark packet capture analysis for What IP address is requested by the client?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      192.168.2.244
                    </span>
                  </div>
                  <CopyButton text={"192.168.2.244"} />
                </div>
              </section>

              {/* Question 02 */}
              <section id="q2" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q02 • DHCP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: dhcp.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q2: What is the transaction ID for the DHCP release?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "With the <code>dhcp</code> filter active, look at the very first packet in the trace: <strong>Packet 176</strong> (DHCP Release)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Click on Packet 176 and expand the <strong>Dynamic Host Configuration Protocol (Release)</strong> tree in the Packet Details pane." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Locate the <strong>Transaction ID</strong> field directly under Message/Hardware type: <code>0x9f8fa557</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"dhcp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>dhcp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028214839.png"
                    alt={"Wireshark packet capture analysis for What is the transaction ID for the DHCP release?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028214941.png"
                    alt={"Wireshark packet capture analysis for What is the transaction ID for the DHCP release?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      0x9f8fa557
                    </span>
                  </div>
                  <CopyButton text={"0x9f8fa557"} />
                </div>
              </section>

              {/* Question 03 */}
              <section id="q3" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q03 • MAC
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: dhcp.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q3: What is the MAC address of the client?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In the same DHCP Release packet (Packet 176), inspect the client hardware identification." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In the <strong>Dynamic Host Configuration Protocol</strong> header, locate the field <strong>Client MAC address</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "It shows <code>VMware_82:f5:94 (00:0c:29:82:f5:94)</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"dhcp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>dhcp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028220908.png"
                    alt={"Wireshark packet capture analysis for What is the MAC address of the client?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      00:0c:29:82:f5:94
                    </span>
                  </div>
                  <CopyButton text={"00:0c:29:82:f5:94"} />
                </div>
              </section>

              {/* Question 04 */}
              <section id="q4" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q04 • DNS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: dns.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q4: What is the response for the lookup for flag.fruitinc.xyz?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Switch to the second capture file: <code>dns.pcapng</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for the target domain: <code>dns.qry.name == \"flag.fruitinc.xyz\"</code> or scan standard queries." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Locate the Standard query response for <code>flag.fruitinc.xyz</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand the <strong>Answers</strong> section of the DNS packet: the <strong>TXT</strong> record contains <code>acooldnsflag</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"dns.qry.name == \"flag.fruitinc.xyz\""} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>dns.qry.name == "flag.fruitinc.xyz"</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028221522.png"
                    alt={"Wireshark packet capture analysis for What is the response for the lookup for flag.fruitinc.xyz?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028221722.png"
                    alt={"Wireshark packet capture analysis for What is the response for the lookup for flag.fruitinc.xyz?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      acooldnsflag
                    </span>
                  </div>
                  <CopyButton text={"acooldnsflag"} />
                </div>
              </section>

              {/* Question 05 */}
              <section id="q5" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q05 • ROOT
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: dns.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q5: Which root server responds to the google.com query? Hostname.
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Common Pitfall Avoidance:</strong> Packet 2 shows a root query, but it is merely requesting the list of root servers (<code>NS &lt;Root&gt;</code>), NOT answering for <code>google.com</code>!" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Look right below it at <strong>Packet 3</strong>: The client sends a query for <code>google.com</code> to destination IP <code>192.203.230.10</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Look at <strong>Packet 4</strong>: IP <code>192.203.230.10</code> responds to the <code>google.com</code> query by providing a referral pointing to the <code>.com</code> name servers (<code>gtld-servers.net</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Resolving the fixed root server IP <code>192.203.230.10</code> (via reverse DNS lookup <code>nslookup 192.203.230.10</code> or standard IANA root server lists) reveals: <code>e.root-servers.net</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"dns"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>dns</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028222112.png"
                    alt={"Wireshark packet capture analysis for Which root server responds to the google.com query? Hostname."}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      e.root-servers.net
                    </span>
                  </div>
                  <CopyButton text={"e.root-servers.net"} />
                </div>
              </section>

              {/* Operation 02 Banner */}
              <div id="part2" className="scroll-mt-24 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 02 • SMB/NTLM
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Target PCAP: <code className="text-white bg-black/60 px-1.5 py-0.5 rounded border border-zinc-800">smb.pcapng</code>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide">
                  SMB Shares & Secrets Extraction
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Covering questions 06 through 09 with Wireshark packet stream analysis.
                </p>
              </div>

              {/* Question 06 */}
              <section id="q6" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q06 • SMB
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: smb.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q6: What is the path of the file that is opened?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Switch to the third capture file: <code>smb.pcapng</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "To quickly pinpoint file access without manually scrolling through hundreds of packets, apply a filter for SMB2 Create / Open requests: <code>smb2.cmd == 5</code> or <code>smb2.filename contains \"txt\"</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect the SMB2 Create Request (Packet 147). Under <strong>SMB2 (Server Message Block Protocol Version 2)</strong> \u2794 <strong>Create Request (0x05)</strong>, locate the <strong>Filename</strong> field: <code>HelloWorld\\TradeSecrets.txt</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"smb2.filename contains \"txt\" || smb2.cmd == 5"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>smb2.filename contains "txt" || smb2.cmd == 5</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028232201.png"
                    alt={"Wireshark packet capture analysis for What is the path of the file that is opened?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      HelloWorld\TradeSecrets.txt
                    </span>
                  </div>
                  <CopyButton text={"HelloWorld\\TradeSecrets.txt"} />
                </div>
              </section>

              {/* Question 07 */}
              <section id="q7" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q07 • STATUS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: smb.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q7: What was the hex status code when the user SAMBA\jtomato logs in?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Search for user <code>jtomato</code> by filtering: <code>ntlmssp.auth.username == \"jtomato\"</code> (or press Ctrl+F \u2794 String \u2794 jtomato)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Wireshark isolates <strong>Packet 75</strong>: <code>Session Setup Request, NTLMSSP_AUTH, User: SAMBA\\jtomato</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>The Trap:</strong> Packet 75 is a client request and will never contain a status code. The status code is returned by the server in the response!" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Double-click the blue generated <code>[Response in: 76]</code> link in the SMB2 Header (or step to <strong>Packet 76</strong>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In Packet 76 (<code>Session Setup Response, Error: STATUS_LOGON_FAILURE</code>), expand the SMB2 Header: <strong>NT Status: STATUS_LOGON_FAILURE (0xc000006d)</strong>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"ntlmssp.auth.username == \"jtomato\""} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>ntlmssp.auth.username == "jtomato"</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028234432.png"
                    alt={"Wireshark packet capture analysis for What was the hex status code when the user SAMBA\\jtomato logs in?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028234311.png"
                    alt={"Wireshark packet capture analysis for What was the hex status code when the user SAMBA\\jtomato logs in?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      0xc000006d
                    </span>
                  </div>
                  <CopyButton text={"0xc000006d"} />
                </div>
              </section>

              {/* Question 08 */}
              <section id="q8" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q08 • TREE
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: smb.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q8: What is the tree that is being browsed?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In SMB2, connecting to a shared network directory is designated as a <strong>Tree Connect</strong>. Before a client can browse files, it issues a <code>Tree Connect Request</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter specifically for Tree Connect commands: <code>smb2.cmd == 3</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Two Tree Connect requests are observed: Packet 124 connects to <code>\\\\192.168.2.10\\IPC$</code> (system RPC management), and <strong>Packet 133</strong> connects to <code>\\\\192.168.2.10\\public</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Packet 133 is the actual shared filesystem tree where subsequent directory operations and <code>HelloWorld\\TradeSecrets.txt</code> reside: <code>\\\\192.168.2.10\\public</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"smb2.cmd == 3"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>smb2.cmd == 3</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261028235525.png"
                    alt={"Wireshark packet capture analysis for What is the tree that is being browsed?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      \\192.168.2.10\public
                    </span>
                  </div>
                  <CopyButton text={"\\\\192.168.2.10\\public"} />
                </div>
              </section>

              {/* Question 09 */}
              <section id="q9" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q09 • FLAG
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: smb.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q9: What is the flag in the file?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "We know the client accessed <code>TradeSecrets.txt</code>. To extract its unencrypted contents, use Wireshark's built-in file carver: <strong>File \u2794 Export Objects \u2794 SMB...</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Locate <code>\\HelloWorld\\TradeSecrets.txt</code> (50,166 bytes), select it, and save it to disk." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Open the saved file (which contains the Bee Movie script) and search for <code>flag</code>:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>... Order in this court! flag&lt;OneSuperDuperSecret&gt; - You're all thinking ...</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "*(Alternative method)*: In Wireshark, press Ctrl+F \u2794 Packet bytes \u2794 String \u2794 <code>flag</code> to jump straight to the data frame." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"Export SMB Objects"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>Export SMB Objects</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029000721.png"
                    alt={"Wireshark packet capture analysis for What is the flag in the file?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      OneSuperDuperSecret
                    </span>
                  </div>
                  <CopyButton text={"OneSuperDuperSecret"} />
                </div>
              </section>

              {/* Operation 03 Banner */}
              <div id="part3" className="scroll-mt-24 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 03 • SHELL/SUDO
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Target PCAP: <code className="text-white bg-black/60 px-1.5 py-0.5 rounded border border-zinc-800">shell.pcapng</code>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide">
                  Linux Reverse Shell & PrivEsc
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Covering questions 10 through 16 with Wireshark packet stream analysis.
                </p>
              </div>

              {/* Question 10 */}
              <section id="q10" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q10 • PORT
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: shell.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q10: What port is the shell listening on?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Switch to <code>shell.pcapng</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Strategy:</strong> Rather than analyzing packet-by-packet, follow the TCP Stream to reconstruct the entire interactive terminal session." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Right-click Packet #1 \u2794 <strong>Follow \u2794 TCP Stream</strong> (Stream 0)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In Statistics \u2794 Conversations \u2794 TCP or Packet #1: Client <code>192.168.2.5:52242</code> connects to <code>192.168.2.244:4444</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The Linux shell prompt <code>jtomato@ns01:~$</code> appears over port <code>4444</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"tcp.port == 4444"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>tcp.port == 4444</code>
                  </div>
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      4444
                    </span>
                  </div>
                  <CopyButton text={"4444"} />
                </div>
              </section>

              {/* Question 11 */}
              <section id="q11" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q11 • PORT
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: shell.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q11: What is the port for the second shell?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Stay in the same TCP Stream 0 window and scroll down to observe attacker commands." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Towards the end of the session, the attacker spawns a second netcat listener:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S nc -nvlp 9999 &lt; /etc/passwd</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "The flag <code>-p 9999</code> specifies port <code>9999</code>. Netcat confirms: <code>Listening on [0.0.0.0] (family 0, port 9999)</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"tcp.port == 9999"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>tcp.port == 9999</code>
                  </div>
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      9999
                    </span>
                  </div>
                  <CopyButton text={"9999"} />
                </div>
              </section>

              {/* Question 12 */}
              <section id="q12" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q12 • NC
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: shell.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q12: What version of netcat is installed?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In Stream 0, examine the package installation command executed prior to spawning the listener:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S apt install netcat</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Review the APT package manager output lines:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>Get:1 http://us.archive.ubuntu.com/ubuntu bionic/universe amd64 netcat all 1.10-41.1</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>Unpacking netcat (1.10-41.1) ...</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "The installed netcat package version string is <code>1.10-41.1</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"Follow TCP Stream 0"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>Follow TCP Stream 0</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029001816.png"
                    alt={"Wireshark packet capture analysis for What version of netcat is installed?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029001750.png"
                    alt={"Wireshark packet capture analysis for What version of netcat is installed?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      1.10-41.1
                    </span>
                  </div>
                  <CopyButton text={"1.10-41.1"} />
                </div>
              </section>

              {/* Question 13 */}
              <section id="q13" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q13 • FILE
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: shell.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q13: What file is added to the second shell?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In Stream 0, analyze the command line syntax used to initiate the listener on port 9999:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S nc -nvlp 9999 &lt; /etc/passwd</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "The input redirection operator <code>&lt;</code> streams the file <code>/etc/passwd</code> directly into netcat for any incoming connection to download." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"Follow TCP Stream 0"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>Follow TCP Stream 0</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029002109.png"
                    alt={"Wireshark packet capture analysis for What file is added to the second shell?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      /etc/passwd
                    </span>
                  </div>
                  <CopyButton text={"/etc/passwd"} />
                </div>
              </section>

              {/* Question 14 */}
              <section id="q14" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q14 • PASS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: shell.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q14: What password is used to elevate the shell?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Linux privilege escalation in this session is executed via <code>sudo -S</code> (which reads credentials from standard input)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Notice the attacker pipelines their password into sudo across several commands:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S apt update</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S apt install netcat</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>echo \"*umR@Q%4V&amp;RC\" | sudo -S -i</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "The password used for elevation is <code>*umR@Q%4V&amp;RC</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"Follow TCP Stream 0"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>Follow TCP Stream 0</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029001702.png"
                    alt={"Wireshark packet capture analysis for What password is used to elevate the shell?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      *umR@Q%4V&amp;RC
                    </span>
                  </div>
                  <CopyButton text={"*umR@Q%4V&RC"} />
                </div>
              </section>

              {/* Question 15 */}
              <section id="q15" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q15 • OS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: shell.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q15: What is the codename of the target system's OS version?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In Stream 0, examine the output of the <code>apt update</code> command:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>Hit:1 http://us.archive.ubuntu.com/ubuntu bionic InRelease</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>Hit:2 http://us.archive.ubuntu.com/ubuntu bionic-updates InRelease</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "In Debian/Ubuntu distributions, repository paths reflect the OS release codename (Ubuntu 18.04 LTS is <code>bionic</code>)." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"Follow TCP Stream 0"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>Follow TCP Stream 0</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029002311.png"
                    alt={"Wireshark packet capture analysis for What is the codename of the target system's OS version?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      bionic
                    </span>
                  </div>
                  <CopyButton text={"bionic"} />
                </div>
              </section>

              {/* Question 16 */}
              <section id="q16" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q16 • USER
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: shell.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q16: How many users are on the target system?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In Q13, we saw <code>/etc/passwd</code> was served over port 9999." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for the second shell traffic: <code>tcp.port == 9999</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Right-click any packet \u2794 <strong>Follow \u2794 TCP Stream</strong> (Stream 6)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The complete <code>/etc/passwd</code> file is dumped in plaintext (from <code>root:x:0:0...</code> down to <code>bind:x:111:113...</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Counting the individual user entries line-by-line yields exactly <code>31</code> accounts." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"tcp.port == 9999"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>tcp.port == 9999</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029002415.png"
                    alt={"Wireshark packet capture analysis for How many users are on the target system?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029002519.png"
                    alt={"Wireshark packet capture analysis for How many users are on the target system?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      31
                    </span>
                  </div>
                  <CopyButton text={"31"} />
                </div>
              </section>

              {/* Operation 04 Banner */}
              <div id="part4" className="scroll-mt-24 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 04 • STP/CDP/SNMP
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Target PCAP: <code className="text-white bg-black/60 px-1.5 py-0.5 rounded border border-zinc-800">network.pcapng</code>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide">
                  Enterprise Infrastructure & Cisco IOS
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Covering questions 17 through 29 with Wireshark packet stream analysis.
                </p>
              </div>

              {/* Question 17 */}
              <section id="q17" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q17 • NTP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q17: What is the IPv6 NTP server IP?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Switch to the fourth capture file: <code>network.pcapng</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for Network Time Protocol traffic: <code>ntp</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect the IPv6 packets. The external NTP server communicating with the local host is <code>2003:51:6012:110::dcf7:123</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"ntp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>ntp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029002906.png"
                    alt={"Wireshark packet capture analysis for What is the IPv6 NTP server IP?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029002943.png"
                    alt={"Wireshark packet capture analysis for What is the IPv6 NTP server IP?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      2003:51:6012:110::dcf7:123
                    </span>
                  </div>
                  <CopyButton text={"2003:51:6012:110::dcf7:123"} />
                </div>
              </section>

              {/* Question 18 */}
              <section id="q18" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q18 • DHCP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q18: What is the first IP address that is requested by the DHCP client?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Filter for DHCP traffic: <code>dhcp</code> (or filter specifically for DHCP Request messages: <code>bootp.option.dhcp == 3</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The DHCP DORA handshake proceeds: Discover \u2794 Offer \u2794 Request \u2794 Ack." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect the very first <strong>DHCP Request</strong> in the trace (<strong>Packet 1254</strong>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand <strong>Dynamic Host Configuration Protocol</strong> \u2794 <strong>Option: (50) Requested IP Address</strong>, which shows <code>192.168.20.11</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"bootp.option.dhcp == 3 || dhcp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>bootp.option.dhcp == 3 || dhcp</code>
                  </div>
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      192.168.20.11
                    </span>
                  </div>
                  <CopyButton text={"192.168.20.11"} />
                </div>
              </section>

              {/* Question 19 */}
              <section id="q19" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q19 • DNS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q19: What is the first authoritative name server returned for the domain that is being queried?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Filter for DNS traffic: <code>dns</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Locate the first DNS query response: <strong>Packet 243</strong> (resolving <code>blog.webernetz.net</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In Packet Details, expand the <strong>Authoritative nameservers</strong> section." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The very first authoritative nameserver record returned is <code>Name Server: ns1.hans.hosteurope.de</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"dns"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>dns</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029005444.png"
                    alt={"Wireshark packet capture analysis for What is the first authoritative name server returned for the domain that is being queried?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      ns1.hans.hosteurope.de
                    </span>
                  </div>
                  <CopyButton text={"ns1.hans.hosteurope.de"} />
                </div>
              </section>

              {/* Question 20 */}
              <section id="q20" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q20 • STP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q20: What is the number of the first VLAN to have a topology change occur?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Spanning Tree Protocol (STP) signals network topology reconfigurations using the Topology Change (TC) bit flag." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for STP BPDUs where the TC bit is active: <code>stp.flags.tc == 1</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Examine the very first packet returned: <strong>Packet 42</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In Packet Details, expand the IEEE 802.1Q Virtual LAN header or Spanning Tree Originating VLAN (PVID): it indicates VLAN <code>20</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"stp.flags.tc == 1"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>stp.flags.tc == 1</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029010107.png"
                    alt={"Wireshark packet capture analysis for What is the number of the first VLAN to have a topology change occur?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      20
                    </span>
                  </div>
                  <CopyButton text={"20"} />
                </div>
              </section>

              {/* Question 21 */}
              <section id="q21" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q21 • CDP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q21: What is the port for CDP for CCNP-LAB-S2?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Cisco Discovery Protocol (CDP) broadcasts layer-2 neighbor details between Cisco switches and routers." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for CDP packets: <code>cdp</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Locate the announcement from device <code>CCNP-LAB-S2.webernetz.net</code> (<strong>Packet 133</strong>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand <strong>Cisco Discovery Protocol</strong> \u2794 <strong>Port ID</strong>: <code>Sent through Interface: GigabitEthernet0/2</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"cdp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>cdp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029010337.png"
                    alt={"Wireshark packet capture analysis for What is the port for CDP for CCNP-LAB-S2?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029010317.png"
                    alt={"Wireshark packet capture analysis for What is the port for CDP for CCNP-LAB-S2?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      GigabitEthernet0/2
                    </span>
                  </div>
                  <CopyButton text={"GigabitEthernet0/2"} />
                </div>
              </section>

              {/* Question 22 */}
              <section id="q22" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q22 • STP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q22: What is the MAC address for the root bridge for VLAN 60?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Filter for STP traffic specifically tagged on VLAN 60: <code>vlan.id == 60 &amp;&amp; stp</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Select any matching BPDU packet (e.g., <strong>Packet 20</strong>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand <strong>Spanning Tree Protocol</strong> \u2794 <strong>Root Identifier</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Read the <strong>Root Bridge System ID</strong> MAC: <code>00:21:1b:ae:31:80</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"vlan.id == 60 && stp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>vlan.id == 60 &amp;&amp; stp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029010422.png"
                    alt={"Wireshark packet capture analysis for What is the MAC address for the root bridge for VLAN 60?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029010454.png"
                    alt={"Wireshark packet capture analysis for What is the MAC address for the root bridge for VLAN 60?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      00:21:1b:ae:31:80
                    </span>
                  </div>
                  <CopyButton text={"00:21:1b:ae:31:80"} />
                </div>
              </section>

              {/* Question 23 */}
              <section id="q23" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q23 • IOS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q23: What is the IOS version running on CCNP-LAB-S2?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Return to the CDP announcement for switch <code>CCNP-LAB-S2</code> (<strong>Packet 133</strong>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand the <strong>Software Version</strong> TLV." }} />
                  <p dangerouslySetInnerHTML={{ __html: "It displays: <code>IOS (tm) C2950 Software (C2950-I6K2L2Q4-M), Version 12.1(22)EA14, RELEASE SOFTWARE (fc1)</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The IOS release version matching the required format is <code>12.1(22)EA14</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"cdp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>cdp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029010607.png"
                    alt={"Wireshark packet capture analysis for What is the IOS version running on CCNP-LAB-S2?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      12.1(22)EA14
                    </span>
                  </div>
                  <CopyButton text={"12.1(22)EA14"} />
                </div>
              </section>

              {/* Question 24 */}
              <section id="q24" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q24 • HSRP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q24: What is the virtual IP address used for HSRP group 121?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Filter for Cisco Hot Standby Router Protocol traffic: <code>hsrp</code> (or group 121: <code>hsrp2.group == 121</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Select an HSRP packet belonging to group 121 (e.g., <strong>Packet 15</strong>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand <strong>Cisco Hot Standby Router Protocol</strong> \u2794 <strong>Group State TLV</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect the <strong>Virtual IP Address</strong> field: <code>192.168.121.1</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"hsrp || hsrp2.group == 121"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>hsrp || hsrp2.group == 121</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029010842.png"
                    alt={"Wireshark packet capture analysis for What is the virtual IP address used for HSRP group 121?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029010755.png"
                    alt={"Wireshark packet capture analysis for What is the virtual IP address used for HSRP group 121?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      192.168.121.1
                    </span>
                  </div>
                  <CopyButton text={"192.168.121.1"} />
                </div>
              </section>

              {/* Question 25 */}
              <section id="q25" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q25 • IPv6
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q25: How many router solicitations were sent?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Technical Context:</strong> Under IPv6 SLAAC (Stateless Address Autoconfiguration), connecting hosts broadcast ICMPv6 Router Solicitations to <code>ff02::2</code> (All-Routers multicast) requesting network prefixes." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In ICMPv6, Type 133 designates Router Solicitations (while Type 134 designates Router Advertisements)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter directly for solicitations: <code>icmpv6.type == 133</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Wireshark isolates exactly 3 packets: <strong>Packet 1187</strong>, <strong>Packet 1220</strong>, and <strong>Packet 1267</strong>. Check Wireshark status bar: <code>Packets: 3890 \u00b7 Displayed: 3 (0.1%)</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"icmpv6.type == 133"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>icmpv6.type == 133</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029012152.png"
                    alt={"Wireshark packet capture analysis for How many router solicitations were sent?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      3
                    </span>
                  </div>
                  <CopyButton text={"3"} />
                </div>
              </section>

              {/* Question 26 */}
              <section id="q26" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q26 • MGMT
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q26: What is the management address of CCNP-LAB-S2?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Return to the CDP packet for <code>CCNP-LAB-S2</code> (<strong>Packet 133</strong>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand the <strong>Management Addresses</strong> TLV (or <strong>Addresses</strong> section)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The configured device management IP is listed as <code>192.168.121.20</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"cdp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>cdp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029011026.png"
                    alt={"Wireshark packet capture analysis for What is the management address of CCNP-LAB-S2?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      192.168.121.20
                    </span>
                  </div>
                  <CopyButton text={"192.168.121.20"} />
                </div>
              </section>

              {/* Question 27 */}
              <section id="q27" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q27 • SNMP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q27: What is the interface being reported on in the first SNMP query?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Filter for Simple Network Management Protocol traffic: <code>snmp</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Locate the first query sequence: <strong>Packet 1911</strong> (<code>get-request</code>) and <strong>Packet 1912</strong> (<code>get-response</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In <strong>Packet 1912</strong>, expand <strong>variable-bindings</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The SNMP response resolves OID <code>1.3.6.1.2.1.31.1.1.1.1.2</code> (IF-MIB ifName for index 2) with the string <code>\"Fa0/1\"</code> (FastEthernet 0/1)." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"snmp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>snmp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029011205.png"
                    alt={"Wireshark packet capture analysis for What is the interface being reported on in the first SNMP query?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029011338.png"
                    alt={"Wireshark packet capture analysis for What is the interface being reported on in the first SNMP query?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      Fa0/1
                    </span>
                  </div>
                  <CopyButton text={"Fa0/1"} />
                </div>
              </section>

              {/* Question 28 */}
              <section id="q28" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q28 • TFTP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q28: When was the NVRAM config last updated?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Network engineers often automate Cisco router backups using <code>archive</code> over TFTP." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for TFTP traffic: <code>tftp</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In <strong>Packet 3766</strong>, the router sends a TFTP Write Request for file <code>CCNP-LAB-R2-Mar--3-20-02-38.701-7</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Right-click Packet 3766 \u2794 <strong>Follow \u2794 UDP Stream</strong> (or export the object via File \u2794 Export Objects \u2794 TFTP...)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Read the timestamp comments stamped at the very top of the configuration:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>! Last configuration change at 20:55:45 UTC Fri Mar 3 2017 by weberjoh</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>! NVRAM config last updated at 21:02:36 UTC Fri Mar 3 2017 by weberjoh</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Formatting as <code>yyyy-mm-dd hh:mm</code> gives <code>2017-03-03 21:02</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"tftp"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>tftp</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261029011812.png"
                    alt={"Wireshark packet capture analysis for When was the NVRAM config last updated?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      2017-03-03 21:02
                    </span>
                  </div>
                  <CopyButton text={"2017-03-03 21:02"} />
                </div>
              </section>

              {/* Question 29 */}
              <section id="q29" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q29 • RADIUS
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: network.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q29: What is the IPv6 of the RADIUS server?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In enterprise network operations, RADIUS provides centralized AAA authentication for administrative switch and router logins." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Search within the plaintext Cisco router configuration dumped in Q28 for the keyword <code>radius</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The configuration reveals:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>radius server blubb</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code> address ipv6 2001:DB8::1812 auth-port 1812 acct-port 1813</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "The configured RADIUS server IPv6 address is <code>2001:DB8::1812</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"Follow UDP Stream 8 (TFTP config)"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>Follow UDP Stream 8 (TFTP config)</code>
                  </div>
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      2001:DB8::1812
                    </span>
                  </div>
                  <CopyButton text={"2001:DB8::1812"} />
                </div>
              </section>

              {/* Operation 05 Banner */}
              <div id="part5" className="scroll-mt-24 p-6 rounded-3xl bg-gradient-to-r from-zinc-900/90 via-[#0e0e14] to-zinc-900/80 border border-zinc-700/60 shadow-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold uppercase tracking-wider">
                    Operation 05 • TLS/HTTP2
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Target PCAP: <code className="text-white bg-black/60 px-1.5 py-0.5 rounded border border-zinc-800">https.pcapng</code>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-[family-name:var(--font-silkscreen)] tracking-wide">
                  Decrypted TLS & pfSense Administration
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                  Covering questions 30 through 35 with Wireshark packet stream analysis.
                </p>
              </div>

              {/* Question 30 */}
              <section id="q30" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q30 • HTTP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: https.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q30: What has been added to web interaction with web01.fruitinc.xyz?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "<strong>Prerequisite \u2014 TLS Decryption:</strong> Open <code>https.pcapng</code>. Go to <strong>Edit \u2794 Preferences... \u2794 Protocols \u2794 TLS</strong>. Under <strong>(Pre)-Master-Secret log filename</strong>, browse and select <code>secret_sauce.txt</code> from the lab archive. Wireshark instantly decrypts all TLS streams!" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<strong>The Missing Response Wireshark Trap:</strong> Filtering by <code>http.host == \"web01.fruitinc.xyz\"</code> only displays request frames (675 and 707) because responses do not have a <code>Host:</code> header!" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter instead by destination server IP: <code>ip.addr == 192.168.2.20 &amp;&amp; http</code> (or follow the HTTP stream on Packet 675)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect the server response in <strong>Packet 678</strong> (<code>HTTP/1.1 200 OK</code>). Under the HTTP headers, locate the custom response header: <code>flag: y2*Lg4cHe@Ps</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"ip.addr == 192.168.2.20 && http"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>ip.addr == 192.168.2.20 &amp;&amp; http</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103132230.png"
                    alt={"Wireshark packet capture analysis for What has been added to web interaction with web01.fruitinc.xyz?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103133231.png"
                    alt={"Wireshark packet capture analysis for What has been added to web interaction with web01.fruitinc.xyz?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103133043.png"
                    alt={"Wireshark packet capture analysis for What has been added to web interaction with web01.fruitinc.xyz?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      y2*Lg4cHe@Ps
                    </span>
                  </div>
                  <CopyButton text={"y2*Lg4cHe@Ps"} />
                </div>
              </section>

              {/* Question 31 */}
              <section id="q31" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q31 • SLACK
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: https.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q31: What is the name of the photo that is viewed in slack?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Slack serves media assets through <code>files.slack.com</code>. In-feed channel previews download thumbnail assets from <code>/files-tmb/</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for Slack file requests: <code>http.host == \"files.slack.com\"</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect <strong>Packet 6642</strong>:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>GET /files-tmb/TTL7QHDUJ-F011PDVK8TD-115062e5c0/get_a_new_phone_today__720.jpg HTTP/1.1</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Notice the pattern with the double underscore before 720: <code>get_a_new_phone_today__720.jpg</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"http.host == \"files.slack.com\""} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>http.host == "files.slack.com"</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103133057.png"
                    alt={"Wireshark packet capture analysis for What is the name of the photo that is viewed in slack?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103132711.png"
                    alt={"Wireshark packet capture analysis for What is the name of the photo that is viewed in slack?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      get_a_new_phone_today__720.jpg
                    </span>
                  </div>
                  <CopyButton text={"get_a_new_phone_today__720.jpg"} />
                </div>
              </section>

              {/* Question 32 */}
              <section id="q32" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q32 • AUTH
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: https.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q32: What is the username and password to login to 192.168.2.1?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Traffic to the pfSense firewall at <code>192.168.2.1</code> utilizes <strong>HTTP/2</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for HTTP/2 traffic communicating with the gateway: <code>ip.addr == 192.168.2.1 &amp;&amp; http2</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Locate <strong>Packet 936</strong> (HTTP/2 HEADERS frame for <code>POST /</code>) followed by <strong>Packet 937</strong> (HTTP/2 DATA frame)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand <strong>HTML Form URL Encoded: application/x-www-form-urlencoded</strong>:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>usernamefld: admin</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>passwordfld: Ac5R4D9iyqD5bSh</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Formatted as <code>username:password</code> gives <code>admin:Ac5R4D9iyqD5bSh</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"ip.addr == 192.168.2.1 && http2"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>ip.addr == 192.168.2.1 &amp;&amp; http2</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103133814.png"
                    alt={"Wireshark packet capture analysis for What is the username and password to login to 192.168.2.1?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103133940.png"
                    alt={"Wireshark packet capture analysis for What is the username and password to login to 192.168.2.1?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      admin:Ac5R4D9iyqD5bSh
                    </span>
                  </div>
                  <CopyButton text={"admin:Ac5R4D9iyqD5bSh"} />
                </div>
              </section>

              {/* Question 33 */}
              <section id="q33" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q33 • OCSP
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: https.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q33: What is the certStatus for the certificate with a serial number of 07752cebe5222fcf5c7d2038984c5198?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Online Certificate Status Protocol (OCSP) verifies whether an SSL/TLS certificate has been revoked." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Filter for OCSP packets: <code>ocsp</code> (or match the serial: <code>ocsp.serialNumber == 07:75:2c:eb:e5:22:2f:cf:5c:7d:20:38:98:4c:51:98</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect the OCSP response in <strong>Packet 160</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Expand <strong>Online Certificate Status Protocol</strong> \u2794 <strong>responseBytes</strong> \u2794 <strong>BasicOCSPResponse</strong> \u2794 <strong>tbsResponseData</strong> \u2794 <strong>responses</strong>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Under serial number <code>0x07752cebe5222fcf5c7d2038984c5198</code>, inspect the status field: <strong>certStatus: good (0)</strong>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"ocsp.serialNumber == 07:75:2c:eb:e5:22:2f:cf:5c:7d:20:38:98:4c:51:98"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>ocsp.serialNumber == 07:75:2c:eb:e5:22:2f:cf:5c:7d:20:38:98:4c:51:98</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103134414.png"
                    alt={"Wireshark packet capture analysis for What is the certStatus for the certificate with a serial number of 07752cebe5222fcf5c7d2038984c5198?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      good
                    </span>
                  </div>
                  <CopyButton text={"good"} />
                </div>
              </section>

              {/* Question 34 */}
              <section id="q34" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q34 • LEAK
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: https.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q34: What is the email of someone who needs to change their password?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "Filter for decrypted HTTP form submissions containing plaintext passwords: <code>urlencoded-form.key == \"password\"</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Examine <strong>Packet 4758</strong> (authentication request submitted to <code>fruitincworkspace.slack.com</code>)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In the URL-encoded POST payload:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>email: Jim.Tomato@fruitinc.xyz</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "<code>password: v^DDLM98GbM#</code>" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Employee Jim Tomato transmitted his account credentials over an insecure connection, exposing his password." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"urlencoded-form.key == \"password\""} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>urlencoded-form.key == "password"</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103134121.png"
                    alt={"Wireshark packet capture analysis for What is the email of someone who needs to change their password?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103134155.png"
                    alt={"Wireshark packet capture analysis for What is the email of someone who needs to change their password?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      Jim.Tomato@fruitinc.xyz
                    </span>
                  </div>
                  <CopyButton text={"Jim.Tomato@fruitinc.xyz"} />
                </div>
              </section>

              {/* Question 35 */}
              <section id="q35" className="scroll-mt-24 p-6 sm:p-8 rounded-3xl bg-[#0a0a0f]/90 border border-zinc-800/80 shadow-2xl space-y-6">
                <div className="border-b border-zinc-800/80 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                      Q35 • SVC
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      Capture: https.pcapng
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-share-tech)] leading-snug">
                    Q35: A service is assigned to an interface. What is the interface, and what is the service?
                  </h3>
                </div>

                {/* Investigation Steps */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-3 font-sans">
                  <p dangerouslySetInnerHTML={{ __html: "In Q32, the administrator authenticated into the pfSense firewall at <code>192.168.2.1</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In <strong>Packet 1076</strong>, the admin accesses <code>GET /services_ntpd.php</code> (NTP daemon management)." }} />
                  <p dangerouslySetInnerHTML={{ __html: "In <strong>Packets 1107 &amp; 1108</strong>, the admin submits a configuration form: <code>POST /services_ntpd.php</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "Inspect the multipart form payload in Packet 1108 under <code>name=\"interface[]\"</code>:" }} />
                  <p dangerouslySetInnerHTML={{ __html: "Raw data is displayed in hex: <code>6c616e</code>. Converting hex to ASCII: <code>6c</code> (l), <code>61</code> (a), <code>6e</code> (n) \u2794 <code>lan</code>." }} />
                  <p dangerouslySetInnerHTML={{ __html: "The configured daemon service is <code>ntp</code> on interface <code>lan</code>, formatted as <code>lan:ntp</code>." }} />
                </div>

                {/* Wireshark Display Filter Box */}
                <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[11px]">
                      Wireshark Display Filter / Action
                    </span>
                    <CopyButton text={"ip.addr == 192.168.2.1 && http2"} />
                  </div>
                  <div className="p-3 sm:p-4 font-mono text-xs text-emerald-300 bg-black/40 overflow-x-auto">
                    <code>ip.addr == 192.168.2.1 &amp;&amp; http2</code>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103134656.png"
                    alt={"Wireshark packet capture analysis for A service is assigned to an interface. What is the interface, and what is the service?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103134745.png"
                    alt={"Wireshark packet capture analysis for A service is assigned to an interface. What is the interface, and what is the service?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Screenshot */}
                <div className="my-4 rounded-xl overflow-hidden border border-zinc-800 shadow-xl bg-black/50">
                  <Image
                    src="/images/cyberdefenders/wiredive/Pasted_image_20261103135738.png"
                    alt={"Wireshark packet capture analysis for A service is assigned to an interface. What is the interface, and what is the service?"}
                    width={1100}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Answer Box */}
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-[#0c0c12] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block font-bold">
                      Verified Flag / Answer:
                    </span>
                    <span className="font-mono text-base font-bold text-white tracking-wide break-all">
                      lan:ntp
                    </span>
                  </div>
                  <CopyButton text={"lan:ntp"} />
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}