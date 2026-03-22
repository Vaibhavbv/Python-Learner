export const s02 = {
  id: "s02",
  num: "02",
  title: "Data Structures",
  badge: "must",
  topics: [
    {
      id: "t05",
      name: "Lists",
      imp: "must", time: "5 min", difficulty: "Easy Win",
      subtopics: ["comprehensions", "sorting/slicing", "common operations", "nested lists"],
      content: {
        locked: false,
        vibe: "Lists 📦 — basically Python's Swiss Army knife. A Spotify queue, an Instagram feed, a chat history — all lists.",
        explanation: [
          "Lists are everywhere. They are ordered, they are mutable (you can change them), and they can hold anything — strings, numbers, dicts, even other lists.",
          "<strong>List comprehensions</strong> are the most Pythonic thing ever. <code>[x*2 for x in stats if x > 10]</code> — a filter and transform in one line. They aren't just flexes; they actually run faster than equivalent for-loops because Python optimizes them in C.",
          "<strong>Slicing</strong> works just like it does on strings: <code>my_list[start:stop:step]</code>. You can grab the top 10 scores with <code>leaderboard[:10]</code> or the last 3 messages with <code>chat[-3:]</code>.",
          "<strong>Nested lists</strong> are lists inside lists (like a 2D grid for a game board). But watch out for the cloning trap: <code>[[0]*3]*3</code> creates 3 shortcuts to the EXACT SAME list. Use <code>[[0]*3 for _ in range(3)]</code> to make 3 independent lists."
        ],
        ascii: `  # List Comprehension Structure

  new_list = [ expression for item in old_list if condition ]
                  │            │                 │
           What to keep     The loop      The filter rule

  [ song.upper() for song in playlist if "remix" not in song ]`,
        code: [
          {
            label: "🎵 Spotify Playlist Manager",
            language: "python",
            code: `playlist = [
    {"title": "Blinding Lights", "artist": "The Weeknd", "plays": 150},
    {"title": "Levitating", "artist": "Dua Lipa", "plays": 300},
    {"title": "Save Your Tears", "artist": "The Weeknd", "plays": 200},
]

# 1. List Comprehension — Get all songs by The Weeknd
weeknd_songs = [track["title"] for track in playlist if track["artist"] == "The Weeknd"]
print(weeknd_songs) # ['Blinding Lights', 'Save Your Tears']

# 2. Sorting a list of dicts (in-place)
playlist.sort(key=lambda x: x["plays"], reverse=True)

# 3. Slicing — Get top 2 most played
top_2 = playlist[:2]
for idx, track in enumerate(top_2, 1):
    print(f"#{idx}: {track['title']} ({track['plays']} plays)")`
          }
        ],
        gotchas: [
          { title: "[[0]*n]*n creates shared refs", body: "All rows point to the exact same list. Change one, change them all. Use a comprehension instead." },
          { title: "list.sort() returns None", body: "It sorts in-place! Use `sorted(list)` if you need it to hand you back a new sorted list." }
        ],
        real_world: "When building a 2D game like Tic-Tac-Toe or Battleship, the game board is just a nested list (a list of lists). When rendering an Instagram feed, you're literally just looping over a list of JSON objects (posts) and rendering a UI component for each one.",
        quiz: [
          { q: "What's the output of [1,2,3][-1]?", options: ["1", "3", "Error", "None"], answer: 1, explanation: "Negative indexing grabs from the end. -1 is the last item." }
        ],
        resources: []
      }
    },
    {
      id: "t06",
      name: "Dictionaries",
      imp: "must", time: "6 min", difficulty: "Moderate",
      subtopics: ["dict comprehensions", "defaultdict/OrderedDict", ".get()/.items()/.update()", "nested dicts"],
      content: {
        locked: false,
        vibe: "Dicts 📖 — every user profile, every JSON response, every game config file. It's all Dicts.",
        explanation: [
          "If lists are Swiss Army knives, dicts are the entire toolbox. A dictionary is a key-value store. You give it a key, it gives you the value instantly — O(1) time. Almost everything in Python (under the hood) is a dict.",
          "<code>.get(key, default)</code> is your best friend. If the key doesn't exist, it gives you the default instead of crashing your app with a <code>KeyError</code>.",
          "<strong>defaultdict</strong> from the <code>collections</code> module automatically creates default values for missing keys (like starting everyone's score at 0 without checking first).",
          "Since Python 3.7, dicts <strong>maintain insertion order</strong>. If you add 'A' then 'B', they stay in that order."
        ],
        ascii: `  # Hash Table — How Dicts Are So Fast

  my_dict = {"username": "Ninja", "level": 99}

  Key         Hash Function     Bucket     Value
  ─────────   ──────────────    ──────     ────────
  "username" → hash("username") → [  3 ]  →  "Ninja"
  "level"    → hash("level")    → [  7 ]  →  99

  Lookup my_dict["username"] takes 1 step, no matter how huge the dict is.`,
        code: [
          {
            label: "💬 WhatsApp-style Group Chat tracker",
            language: "python",
            code: `from collections import defaultdict

# We want to track how many messages each user sent.
chat_history = [
    {"user": "rahul", "msg": "yo"},
    {"user": "sneha", "msg": "hey!!"},
    {"user": "rahul", "msg": "pubg tonight?"},
    {"user": "kun", "msg": "im down"},
]

# Using defaultdict means we don't have to write:
# if user not in message_counts: message_counts[user] = 0
message_counts = defaultdict(int)

for chat in chat_history:
    message_counts[chat["user"]] += 1

print(dict(message_counts)) 
# {'rahul': 2, 'sneha': 1, 'kun': 1}

# .get() saves you from crashing
toxic_level = chat_history[0].get("toxic_score", 0) # Returns 0 instead of crashing!`
          }
        ],
        gotchas: [
          { title: "KeyError on missing keys", body: "Always use `.get('key', 'default')` when the key might not exist." },
          { title: "Dict keys must be hashable", body: "You can't use a list as a dict key. If you need a sequence as a key, use a tuple." }
        ],
        real_world: "JSON essentially maps 1:1 to Python dictionaries. Every time you pull data from an API — like getting weather data, fetching Twitch stream details, or grabbing a user's GitHub repos — you're pulling down a giant dictionary. You navigate it by chaining keys: `weather_data[\"current\"][\"temp\"]`.",
        quiz: [
          { q: "Dict lookup time complexity is?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, explanation: "O(1) constant time! Dicts use hash tables, making lookups instant." }
        ],
        resources: []
      }
    },
    {
      id: "t07",
      name: "Tuples & Sets",
      imp: "must", time: "8 min", difficulty: "Brain-melter",
      subtopics: ["immutability of tuples", "set operations", "frozenset", "when to use each"],
      content: {
        locked: false,
        vibe: "Tuples & Sets 🎯 — tuples for coordinates that don't change, sets for tracking unique Instagram followers.",
        explanation: [
          "<strong>Tuples</strong> are rigid lists. Once created, they cannot be changed. No `.append()`, no modifying elements. Because they are immutable, they are hashable — meaning you can actually use them as keys in a dictionary (like `{(x, y): \"Wall\"}`).",
          "<strong>Sets</strong> are collections with NO duplicates. They are unordered. Think of them as the bouncer at a club — 'you're already inside, you can't come in again.'",
          "Sets are insanely fast for checking if something exists (`username in taken_names` is instant).",
          "Sets also give you math operations: <code>union (|)</code> (combine), <code>intersection (&)</code> (what's in both), and <code>difference (-)</code> (what's in A but not B)."
        ],
        ascii: `  # Set Operations (Venn Diagram Math)

  A = {1, 2, 3}      B = {3, 4, 5}

  A | B (Union)        → {1, 2, 3, 4, 5}
  A & B (Intersection) → {3}
  A - B (Difference)   → {1, 2}`,
        code: [
          {
            label: "📸 Instagram Follower Tracker (Sets)",
            language: "python",
            code: `# Sets are perfect for finding who unfollowed you or who doesn't follow back
my_followers = {"@ninja", "@pewdiepie", "@mrbeast", "@mkbhd"}
following = {"@mkbhd", "@mrbeast", "@elonmusk"}

# Who am I following that doesn't follow me back?
# (Everything in 'following' minus what's in 'my_followers')
snakes = following - my_followers
print(f"Not following back: {snakes}") # {'@elonmusk'}

# Who are my true mutuals? (Intersection)
mutuals = my_followers & following
print(f"Mutuals: {mutuals}") # {'@mkbhd', '@mrbeast'}`
          },
          {
            label: "🎮 Using Tuples for strict data",
            language: "python",
            code: `# Tuples to represent unchangeable RGB colors or screen coordinates
RED = (255, 0, 0)
GREEN = (0, 255, 0)

# If you try RED[0] = 100, Python throws an error. Safe!

# Unpacking tuples is the cleanest syntax ever:
r, g, b = RED
print(f"Red channel is {r}")`
          }
        ],
        gotchas: [
          { title: "Single-element tuple needs a comma", body: "`(42)` is just the number 42. `(42,)` is a tuple. The comma makes the tuple!" },
          { title: "Sets are completely unordered", body: "Never rely on the order of a set. If you need it ordered later, sort it into a list." }
        ],
        real_world: "When checking if a new username is taken on signup, you don't scan a list of 10 million names. You check a giant SET of taken usernames. Membership testing in sets takes the exact same amount of time whether the set has 10 items or 10 billion items.",
        quiz: [
          { q: "Elements in A but not B?", options: ["A | B", "A & B", "A - B", "A ^ B"], answer: 2, explanation: "A - B is difference — everything in A that ISN'T in B." }
        ],
        resources: []
      }
    },
    {
      id: "t08",
      name: "Collections Module",
      imp: "high", time: "10 min", difficulty: "Advanced",
      subtopics: ["Counter/deque", "namedtuple/ChainMap", "heapq", "bisect"],
      content: {
        locked: false,
        vibe: "Collections 🧰 — Counter alone will save you hours. It's stdlib magic hiding in plain sight.",
        explanation: [
          "The <code>collections</code> module has specialized data containers. They are faster and cleaner than writing complex loops.",
          "<strong>Counter</strong> takes a list and counts how many times everything shows up. <code>Counter(votes).most_common(1)</code> instantly tells you the winner of a poll. It feels like cheating.",
          "<strong>deque</strong> (pronounced 'deck') is a double-ended queue. You can add or drop items from BOTH the front and back instantly (O(1) time). Lists, on the other hand, are terrible at adding things to the front — they have to shift every other item over.",
          "<strong>namedtuple</strong> is a tuple where you can access items by name (`player.health`) instead of index (`player[1]`). It looks like a class, but it's as lightweight as a tuple."
        ],
        ascii: `  # Counter vs Manual Loop

  # You want to count hashtag frequency:
  tags = ["#python", "#coding", "#python", "#tech"]

  # The manual way:
  counts = {}
  for tag in tags:
      if tag not in counts: counts[tag] = 0
      counts[tag] += 1

  # The Counter way:
  counts = Counter(tags)`,
        code: [
          {
            label: "🗳️ Discord bot poll vote counter",
            language: "python",
            code: `from collections import Counter

# Raw stream of emoji reactions on a Discord poll message
reactions = ["👍", "🔥", "👍", "👎", "🔥", "🔥", "👍", "👍"]

# Counter literally does all the work
vote_counts = Counter(reactions)

print(vote_counts) 
# Counter({'👍': 4, '🔥': 3, '👎': 1})

# Get the absolute winner
winner = vote_counts.most_common(1)[0][0]
print(f"The winning vote is {winner}!")`
          },
          {
            label: "🔄 deque — recent search history",
            language: "python",
            code: `from collections import deque

# A deque with maxlen auto-deletes the oldest item when it fills up.
# Perfect for "Recent Searches" history!
recent_searches = deque(maxlen=3)

recent_searches.append("python tutorials")
recent_searches.append("how to center a div")
recent_searches.append("best mechanical keyboards")

print(list(recent_searches))
# All 3 are there. Watch what happens when we add a 4th:

recent_searches.append("mechanical keyboard typing sound 10 hours")

print(list(recent_searches))
# The 'python tutorials' search was automatically pushed out!
# ['how to center a div', 'best mechanical keyboards', 'mechanical...']`
          }
        ],
        gotchas: [
          { title: "deque random access is slow", body: "`my_deque[50]` takes a lot longer than a list. Use deque when you only care about the front and back." }
        ],
        real_world: "Building a \"Top 10 Trending Words on Twitter\" script? You don't build complex sorting logic — you just throw all the words into a `Counter()` and call `.most_common(10)`. Tracking a player's last 5 movements to allow a \"rewind\" feature like in Forza? You store them in a `deque(maxlen=5)`.",
        quiz: [
          { q: "deque(maxlen=3) with 4 appends?", options: ["Error", "Oldest drops", "Newest rejected", "Nothing"], answer: 1, explanation: "maxlen makes it auto-drop the oldest item. Built-in history limiter!" }
        ],
        resources: []
      }
    }
  ]
}
