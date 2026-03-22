export const s01 = {
  id: "s01",
  num: "01",
  title: "Core Python Fundamentals",
  badge: "must",
  topics: [
    {
      id: "t01",
      name: "Data Types & Variables",
      imp: "must", time: "5 min", difficulty: "Starter",
      subtopics: ["int/float/str/bool", "type()/casting", "None type", "mutable vs immutable"],
      content: {
        locked: false,
        vibe: "Data Types 🧱 — every app you've ever used stores data. Types are how Python knows what to do with each one.",
        explanation: [
          "Every single piece of data your code touches gets categorized. When you double tap an Instagram post, that's a <strong>bool</strong> flipping from False to True. When you see a Spotify song title, that's a <strong>str</strong> (string). The number of likes? An <strong>int</strong> (integer). If you treat a string like an integer, congrats — your app just crashed. 😬",
          "The absolute core: <strong>int</strong> (whole numbers), <strong>float</strong> (decimals like 99.99), <strong>str</strong> (text), and <strong>bool</strong> (True/False). But the real boss fight is understanding <strong>mutable vs immutable</strong>. Lists and dicts are mutable — you can change them in place. Strings and ints are immutable — you can't actually change them, Python just throws the old one away and builds a new one.",
          "<code>None</code> is Python's \"empty chair\" — it's not 0, it's not a blank string, it's literally <em>nothing</em>. Always use <code>is None</code> to check for it, never <code>== None</code>.",
          "<code>type()</code> tells you what something is, and casting (like <code>int(\"42\")</code>) lets you force a string to become a number. You'll do this 50 times a day when reading user inputs."
        ],
        ascii: `  # Mutable vs Immutable — The Core Difference

  x = [1, 2, 3]    →  id: 0x7f1a   ← same object, contents change
  x.append(4)      →  id: 0x7f1a   ✅ still same address!

  y = "hello"      →  id: 0x4b2c
  y = y + " world" →  id: 0x9d4e   ← NEW object created ❌`,
        code: [
          {
            label: "🎮 Game Inventory — casting raw strings",
            language: "python",
            code: `# Reading saved game data (everything is a string in the file)
raw_save = {
    "player_name": "ShadowNinja99",
    "level": "42",         # string!
    "health": "98.5",      # string!
    "is_poisoned": "0",    # string!
    "equipped_item": None 
}

# Type casting to make the data actually usable
name = str(raw_save["player_name"])
level = int(raw_save["level"])          # "42" → 42
health = float(raw_save["health"])      # "98.5" → 98.5
is_poisoned = bool(int(raw_save["is_poisoned"]))  # "0" → 0 → False

# Always check for None properly
current_weapon = raw_save["equipped_item"] if raw_save["equipped_item"] is not None else "Fists"

print(f"Lvl {level} {name} | HP: {health} | Weapon: {current_weapon}")
# Lvl 42 ShadowNinja99 | HP: 98.5 | Weapon: Fists`
          },
          {
            label: "😱 The mutable trap — every Python dev falls for this",
            language: "python",
            code: `# THE BUG: mutable default argument
def setup_player(name, inventory=[]):    # ← this [] is shared across ALL players!
    inventory.append("Starter Sword")
    return {"name": name, "inv": inventory}

p1 = setup_player("NoobSlayer")
print(p1)  # {'name': 'NoobSlayer', 'inv': ['Starter Sword']}
p2 = setup_player("Leeroy")
print(p2)  # {'name': 'Leeroy', 'inv': ['Starter Sword', 'Starter Sword']} ← WAIT WHAT 😱

# THE FIX: use None as default, create a fresh list inside
def setup_player_fixed(name, inventory=None):
    if inventory is None:
        inventory = []  # fresh list every time 🎯
    inventory.append("Starter Sword")
    return {"name": name, "inv": inventory}`
          }
        ],
        gotchas: [
          { title: "Mutable default arguments", body: "Using [] or {} as a default param means it's shared across ALL function calls. Classic 3am bug. Use None instead." },
          { title: "0.1 + 0.2 ≠ 0.3", body: "Floating point math is literally lying to you. Use the decimal module for money/finance calculations." }
        ],
        real_world: "When you build a Discord bot, every message event comes in as a string. If someone types <code>!roll 20</code>, your bot has to slice the string, extract the \"20\", cast it to an <code>int()</code>, and roll a random number. Without type casting and understanding what data you're holding, the bot will literally crash trying to do math on the word '20'.",
        quiz: [
          { q: "What does type([]) return?", options: ["<class 'array'>", "<class 'list'>", "<class 'object'>", "Error"], answer: 1, explanation: "[] is a list. Python keeps it real — no fancy names like 'array' for the basic list." },
          { q: "Which of these is immutable?", options: ["list", "dict", "tuple", "set"], answer: 2, explanation: "Tuples cannot be changed after creation — they're basically VIP-locked 🔒" }
        ],
        resources: [
          { label: "Python Docs — Built-in Types", url: "https://docs.python.org/3/library/stdtypes.html" }
        ]
      }
    },
    {
      id: "t02",
      name: "Control Flow",
      imp: "must", time: "8 min", difficulty: "Brain-melter",
      subtopics: ["if/elif/else", "for & while loops", "break/continue/pass", "match-case (3.10+)"],
      content: {
        locked: false,
        vibe: "Control Flow 🔀 — every game, every recommendation algorithm is just control flow. Python making decisions fast.",
        explanation: [
          "Control flow is the skeleton of your app. <code>if/elif/else</code> is how your code makes decisions. <code>for</code> loops iterate over things like a Spotify queue. <code>while</code> loops keep the game running until your health hits zero. That's literally it.",
          "Every Netflix recommendation is basically a giant if/else tree. \"If they watch sci-fi, and if they binged Stranger Things, show them Dark.\" Control flow is how logic happens.",
          "<code>break</code> exits the loop completely (like rage quitting), <code>continue</code> skips to the next item (like skipping a song), and <code>pass</code> is Python's \"I know I need something here but I'll write it later\" — it's the <code>TODO</code> of code.",
          "Python's <code>for</code> loop doesn't count numbers like C or Java; it <em>iterates over items in a collection</em>. It's asking for the next item, then the next, until it's empty."
        ],
        ascii: `  # Logic Decision Tree

  ┌──────────────────────┐
  │   Has Subscription?   │
  └──────────┬───────────┘
             │
      ┌──────┴──────┐
      │ YES         │ NO
      ▼             ▼
  ┌────────┐   ┌──────────┐
  │Play 🎵 │   │Play 📢   │
  │No Ads  │   │30s Ad    │
  └────────┘   └──────────┘`,
        code: [
          {
            label: "🎵 Spotify Queue — break, continue, and loops",
            language: "python",
            code: `# Processing a music queue
playlist = [
    {"song": "Blinding Lights", "status": "available"},
    {"song": "Shape of You", "status": "region_blocked"},
    {"song": "Levitating", "status": "available"},
    {"song": "Sponsor Ad", "status": "ad"},
    {"song": "Bad Guy", "status": "available"}
]

has_premium = True

for track in playlist:
    if track["status"] == "region_blocked":
        print(f"⏭️ Skipping: {track['song']} (Not available in your country)")
        continue    # jumps immediately to the next track
        
    if track["status"] == "ad" and has_premium:
        print(f"✨ Premium feature: Skipped Ad")
        continue
        
    if track["song"] == "Levitating":
        print("🛑 User paused the queue.")
        break       # halts the entire loop completely

    print(f"▶️ Now playing: {track['song']}")`
          },
          {
            label: "🆕 match-case (Python 3.10+) — handling commands cleanly",
            language: "python",
            code: `# A simple text adventure game command parser using match-case
def process_command(command):
    match command.split():
        case ["go", direction] if direction in ["north", "south", "east", "west"]:
            print(f"You walk towards the {direction}.")
        case ["take", item]:
            print(f"You put the {item} in your inventory.")
        case ["attack", enemy, "with", weapon]:
            print(f"You strike the {enemy} with your {weapon}!")
        case ["quit" | "exit"]:
            print("Thanks for playing!")
            return False
        case _:   # The default catch-all
            print("I don't understand that command. 🤷")
    return True

process_command("go north")             # You walk towards the north.
process_command("attack goblin with sword") # You strike the goblin with your sword!`
          }
        ],
        gotchas: [
          { title: "Infinite while loops", body: "Forgetting the break in while loops = your script hangs forever trying to run to infinity. Always have an exit." },
          { title: "match-case needs 3.10+", body: "If your deployment server runs Python 3.8, match-case throws a syntax error." }
        ],
        real_world: "When you build an Instagram bot that auto-likes posts, you use a <code>while True:</code> loop to keep the bot alive 24/7. Inside, an <code>if</code> statement checks if the post has a specific hashtag. If it does, you hit the API to like it. If you hit a rate limit error, you <code>break</code> the loop or `time.sleep()` so you don't get banned.",
        quiz: [
          { q: "What does 'pass' do in Python?", options: ["Exits the loop", "Skips iteration", "Absolutely nothing", "Raises an error"], answer: 2, explanation: "pass is a no-op placeholder. It literally does nothing." },
          { q: "Which keyword skips to the next iteration?", options: ["break", "pass", "continue", "skip"], answer: 2, explanation: "continue says 'nah, skip this one' and jumps to the next loop item." }
        ],
        resources: [
          { label: "Python Docs — Control Flow", url: "https://docs.python.org/3/tutorial/controlflow.html" }
        ]
      }
    },
    {
      id: "t03",
      name: "Functions",
      imp: "must", time: "6 min", difficulty: "Moderate",
      subtopics: ["*args/**kwargs", "default & keyword args", "return values", "LEGB scope rule"],
      content: {
        locked: false,
        vibe: "Functions 🔧 — write it once, use it a thousand times. Like keyboard shortcuts you invent yourself.",
        explanation: [
          "Functions are how you stop repeating code. <code>def calculate_damage()</code> is infinitely more readable than 20 lines of inline math. Functions are abstractions — you package up complexity and put a neat label on it.",
          "<code>*args</code> catches extra unnamed arguments as a tuple, <code>**kwargs</code> catches extra named arguments as a dictionary. Think of *args as \"give me whatever you've got\" and **kwargs as \"give me your labeled parameters.\"",
          "The <strong>LEGB Scope Rule</strong> is just Python asking \"where did this variable come from?\" It checks Local (inside the function), Enclosing (outer function), Global (outside), and Builtin. It's like checking your own pockets, then asking your friend, then asking the room.",
          "Functions <em>always</em> return something. If you forget the <code>return</code> statement, it returns <code>None</code>. Always explicitly return your data!"
        ],
        ascii: `  # LEGB Variable Lookup Order

  ┌───────────────────────────────────┐
  │  B — Builtins (print, len...)     │
  │  ┌─────────────────────────────┐  │
  │  │  G — Global (module level)  │  │ 
  │  │  ┌───────────────────────┐  │  │
  │  │  │  E — Enclosing        │  │  │ 
  │  │  │  ┌─────────────────┐  │  │  │
  │  │  │  │  L — Local      │  │  │  │
  │  │  │  │  (starts here!) │  │  │  │
  │  │  │  └─────────────────┘  │  │  │
  │  │  └───────────────────────┘  │  │
  │  └─────────────────────────────┘  │
  └───────────────────────────────────┘`,
        code: [
          {
            label: "🔧 Building a flexible profile generator",
            language: "python",
            code: `def create_user_profile(username, role="member", *badges, **social_links):
    """
    *badges collects all extra positional args into a tuple
    **social_links collects all named args into a dictionary
    """
    profile = {
        "user": username,
        "role": role,
        "achievements": list(badges),   
        "links": social_links           
    }
    return profile

# Now watch how flexible this is to call:
player = create_user_profile(
    "xX_Sniper_Xx",           # username (required)
    "admin",                  # role (positional, overrides default)
    "First Blood", "MVP",     # *badges (captured as tuple)
    twitter="@sniper",        # **social_links (captured as dict)
    twitch="twitch.tv/snpr"   
)

print(player["achievements"]) # ['First Blood', 'MVP']
print(player["links"])        # {'twitter': '@sniper', 'twitch': 'twitch.tv/snpr'}`
          }
        ],
        gotchas: [
          { title: "Implicit None returns", body: "If you do `result = my_list.sort()`, result becomes None because sort() modifies the list in place and doesn't explicitly return anything." },
          { title: "Abusing the global keyword", body: "If you have to use the `global` keyword inside a function to modify a variable, your code architecture is probably messy." }
        ],
        real_world: "When building a web scraper, you don't write the scraping logic over and over for every URL. You write a single function `def extract_product_price(url)` that takes a URL, fetches the HTML, finds the price tag, and returns the float value. You then map that function to a list of 100 URLs and let Python do the heavy lifting.",
        quiz: [
          { q: "What does *args let you do?", options: ["Define a required argument", "Pass unlimited keyword arguments", "Pass unlimited positional arguments", "Return a list"], answer: 2, explanation: "*args gathers any extra positional arguments into a tuple." }
        ],
        resources: []
      }
    },
    {
      id: "t04",
      name: "String Manipulation",
      imp: "must", time: "7 min", difficulty: "Moderate",
      subtopics: ["f-strings/format()", "slicing & indexing", "split/join/strip", "regex basics"],
      content: {
        locked: false,
        vibe: "Strings 🧵 — every username, tweet, and search query is a string. Get used to slicing them up.",
        explanation: [
          "Strings are text. But to Python, a string is just an array of characters. The moment you treat a string like an array, slicing it apart becomes an absolute breeze.",
          "<strong>f-strings</strong> (Python 3.6+) changed the game. <code>f\"Hello {username}, you have {followers} followers\"</code> is beautiful. You can even do math inside them: <code>f\"{price * 0.8:.2f}\"</code> format numbers to 2 decimal places.",
          "<strong>split/join/strip</strong> are everyday tools. <code>.split(\",\")</code> turns a CSV string into a list. <code>\" \".join(words_list)</code> sews a list of words back into a sentence. <code>.strip()</code> gets rid of that annoying extra space the user accidentally typed.",
          "When things get crazy (like validating email addresses or finding phone numbers in text), you bring out <strong>Regex (Regular Expressions)</strong>. Regex is a mini-language dedicated purely to pattern matching."
        ],
        ascii: `  # Slicing a String Array
  
  s = "P y t h o n"
       0 1 2 3 4 5    ← index
      -6-5-4-3-2-1    ← negative index

  s[0]   → "P"        s[-1]  → "n"
  s[2:5] → "tho"      s[:3]  → "Pyt"
  s[::-1]→ "nohtyP"   ← reverse string hack!`,
        code: [
          {
            label: "💬 WhatsApp chat parser",
            language: "python",
            code: `# Breaking apart a raw string from a chat export
raw_message = "   [22/10/2023, 14:30] rahul: bro you coming to the game tonight?   \\n"

# 1. Strip whitespace
clean_msg = raw_message.strip()

# 2. Split into time and actual message content
# It looks like: "[22/10/2023, 14:30]", "rahul: bro you coming..."
parts = clean_msg.split("] ")

# 3. Clean up the timestamp
timestamp = parts[0].replace("[", "")

# 4. Extract sender and text
sender_and_text = parts[1].split(": ")
sender = sender_and_text[0]
text = ": ".join(sender_and_text[1:]) # Re-join in case message had colons

print(f"Time: {timestamp}\\nUser: {sender}\\nText: {text}")
# Time: 22/10/2023, 14:30
# User: rahul
# Text: bro you coming to the game tonight?`
          }
        ],
        gotchas: [
          { title: "Strings are immutable", body: "You can't do s[0] = 'X'. You have to create a brand new string." }
        ],
        real_world: "When people sign up for your web app, you use string manipulation to check if their username has spaces, use `.lower()` to save their email cleanly so 'User@Gmail.com' matches 'user@gmail.com', and use regex to verify the email is actually formatted correctly.",
        quiz: [
          { q: "What does s[::-1] do?", options: ["Throws error", "Returns last letter", "Reverses string", "Slices first half"], answer: 2, explanation: "Python's oldest party trick: start to finish, stepping backwards by 1." }
        ],
        resources: []
      }
    }
  ]
}
