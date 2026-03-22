export const s02 = {
  id: "s02",
  num: "02",
  title: "Data Structures",
  badge: "must",
  topics: [
    {
      id: "t05",
      name: "Lists",
      imp: "must",
      subtopics: ["comprehensions", "sorting/slicing", "common operations", "nested lists"],
      content: {
        locked: false,
        vibe: "Lists 📦 — basically Python's Swiss Army knife, except it's free and always in your pocket.",
        explanation: [
          "Lists are Python's bread and butter. API responses? List of dicts. CSV rows? List of lists. Query results? List of tuples. You will literally live inside lists as a data engineer. They're ordered, mutable, and can hold anything — ints, strings, other lists, dicts, even functions.",
          "<strong>List comprehensions</strong> are the most Pythonic thing ever. <code>[x*2 for x in range(10) if x > 3]</code> — a filter + transform in one line. They're not just syntactic sugar — they're actually faster than equivalent for loops because Python optimizes them internally.",
          "<strong>Slicing</strong> works just like strings: <code>my_list[start:stop:step]</code>. <code>my_list[:5]</code> → first 5 elements. <code>my_list[-3:]</code> → last 3. <code>my_list[::2]</code> → every other element. You can even assign to slices: <code>my_list[1:3] = [10, 20]</code>.",
          "<strong>Nested lists</strong> are everywhere in data work. But be careful with <code>[[0]*3]*3</code> — this creates 3 references to the SAME inner list, not 3 independent lists. Use <code>[[0]*3 for _ in range(3)]</code> instead. This bug will cost you 2 hours of debugging."
        ],
        ascii: `  # List — Memory Model

  my_list = ["chai", 42, True]

  my_list (list object)
  ┌─────────┬─────────┬─────────┐
  │  ptr[0] │  ptr[1] │  ptr[2] │  ← list stores pointers
  └────┬────┴────┬────┴────┬────┘
       │         │         │
       ▼         ▼         ▼
    ┌──────┐  ┌─────┐  ┌──────┐
    │"chai"│  │ 42  │  │ True │   ← actual objects on heap
    │ str  │  │ int │  │ bool │
    └──────┘  └─────┘  └──────┘

  # Why .append() is O(1) but .insert(0, x) is O(n):
  append:  [..., new]       ← just add at the end
  insert:  [new, → → → →]  ← shift EVERYTHING right 😰`,
        code: [
          {
            label: "🏏 IPL scoreboard — list comprehensions in action",
            language: "python",
            code: `# IPL match data — real-world list operations
innings = [
    {"batsman": "Kohli", "runs": 73, "balls": 49, "fours": 8, "sixes": 2},
    {"batsman": "Rohit", "runs": 45, "balls": 38, "fours": 5, "sixes": 1},
    {"batsman": "SKY", "runs": 104, "balls": 52, "fours": 9, "sixes": 8},
    {"batsman": "Pant", "runs": 28, "balls": 22, "fours": 3, "sixes": 1},
]

# List comprehension — filter + transform in one shot 🎯
big_scores = [p["batsman"] for p in innings if p["runs"] >= 50]
# ['Kohli', 'SKY']

# Strike rates with calculation inside comprehension
strike_rates = [
    {"name": p["batsman"], "sr": round(p["runs"]/p["balls"]*100, 1)}
    for p in innings
]
strike_rates.sort(key=lambda x: x["sr"], reverse=True)

for player in strike_rates[:3]:
    print(f"{player['name']:>10}: SR {player['sr']}")`
          },
          {
            label: "⚠️ The nested list trap — and how to avoid it",
            language: "python",
            code: `# THE TRAP: using * to create nested lists
bad_matrix = [[0] * 3] * 3
bad_matrix[0][0] = 1
print(bad_matrix)
# [[1, 0, 0], [1, 0, 0], [1, 0, 0]]  ← ALL rows changed 😱

# THE FIX: use comprehension for independent lists
good_matrix = [[0] * 3 for _ in range(3)]
good_matrix[0][0] = 1
print(good_matrix)
# [[1, 0, 0], [0, 0, 0], [0, 0, 0]]  ← only first row ✅

# Real-world: building pipeline results grid
pipeline_results = [
    {"stage": stage, "status": "pending", "rows": 0}
    for stage in ["extract", "validate", "transform", "load"]
]`
          }
        ],
        gotchas: [
          { title: "[[0]*n]*n creates shared refs", body: "All rows point to the same list. Use a comprehension to create independent inner lists." },
          { title: "list.sort() returns None", body: "It sorts in-place. Use sorted(list) if you need a new sorted list returned." },
          { title: "x in list is O(n)", body: "Checking membership in a list scans every element. Use a set for O(1) lookups." }
        ],
        de_relevance: "Lists are everywhere in DE. <code>cursor.fetchall()</code> returns a list of tuples. <code>json.loads(response.text)</code> often returns a list of dicts. List comprehensions are your best friend in <strong>Airflow</strong> DAGs: <code>[create_task(table) for table in config['tables']]</code>. And in <strong>Pydantic</strong>, <code>List[OrderModel]</code> validates arrays of JSON objects.",
        quiz: [
          { q: "What's the output of [1,2,3][-1]?", options: ["1", "3", "Error", "None"], answer: 1, explanation: "Negative indexing starts from the end. -1 is the last element." },
          { q: "List comprehensions are faster because:", options: ["Less memory", "Python optimizes internally", "Skip type checking", "Fewer objects"], answer: 1, explanation: "Python's bytecode compiler optimizes comprehensions — fewer function calls under the hood." },
          { q: "sorted() vs .sort() — which returns a new list?", options: ["sorted()", ".sort()", "Both", "Neither"], answer: 0, explanation: "sorted() returns a new list. .sort() modifies in-place and returns None." }
        ],
        resources: [
          { label: "Python Docs — Lists", url: "https://docs.python.org/3/tutorial/datastructures.html" },
          { label: "Real Python — Python Lists", url: "https://realpython.com/python-list/" }
        ]
      }
    },
    {
      id: "t06",
      name: "Dictionaries",
      imp: "must",
      subtopics: ["dict comprehensions", "defaultdict/OrderedDict", ".get()/.items()/.update()", "nested dicts"],
      content: {
        locked: false,
        vibe: "Dicts 📖 — JSON is a dict. API responses are dicts. Config files are dicts. Everything. Is. A. Dict.",
        explanation: [
          "If lists are Python's Swiss Army knife, dicts are the entire toolbox. A dict is a key-value store — you give it a key, it gives you a value, in O(1) time. Under the hood, Python uses a hash table to make this magic happen.",
          "Here's the thing nobody tells beginners: <strong>almost everything in Python is a dict</strong>. Objects store attributes in <code>__dict__</code>. Modules are dicts. Global/local namespaces are dicts. When you do <code>obj.name</code>, Python is literally doing <code>obj.__dict__[\"name\"]</code> under the hood.",
          "<code>.get(key, default)</code> is your best friend — returns the default instead of throwing <code>KeyError</code>. <code>defaultdict</code> auto-creates values for missing keys. <strong>Dict comprehensions</strong> (<code>{k: v for k, v in items}</code>) are just as powerful as list comprehensions.",
          "Since Python 3.7, dicts <strong>maintain insertion order</strong>. This is guaranteed by the language spec. So <code>OrderedDict</code> is mostly legacy now, unless you need its extra features like <code>move_to_end()</code>."
        ],
        ascii: `  # Hash Table — How Dicts Work Under the Hood

  my_dict = {"name": "Kohli", "runs": 7263, "avg": 49.75}

  Key        Hash Function     Bucket    Value
  ─────────  ──────────────    ──────    ────────
  "name"  →  hash("name")  →  [  3 ] → "Kohli"
  "runs"  →  hash("runs")  →  [  7 ] → 7263
  "avg"   →  hash("avg")   →  [  1 ] → 49.75

  Lookup: my_dict["name"]
  Step 1: hash("name") → bucket 3
  Step 2: Go to bucket 3 → "Kohli"
  Time: O(1) — constant, regardless of dict size! 🎯`,
        code: [
          {
            label: "🍕 Zomato order analytics — dict operations masterclass",
            language: "python",
            code: `from collections import defaultdict, Counter

orders = [
    {"restaurant": "Domino's", "item": "Margherita", "amount": 299, "city": "Gurgaon"},
    {"restaurant": "McDonald's", "item": "McSpicy", "amount": 189, "city": "Delhi"},
    {"restaurant": "Domino's", "item": "Farmhouse", "amount": 499, "city": "Gurgaon"},
    {"restaurant": "Haldiram's", "item": "Thali", "amount": 350, "city": "Delhi"},
    {"restaurant": "McDonald's", "item": "McFlurry", "amount": 149, "city": "Noida"},
]

# defaultdict — auto-creates empty list for new keys
orders_by_city = defaultdict(list)
for order in orders:
    orders_by_city[order["city"]].append(order)

# Dict comprehension — total spend per city
city_spend = {
    city: sum(o["amount"] for o in city_orders)
    for city, city_orders in orders_by_city.items()
}
print(city_spend)  # {'Gurgaon': 798, 'Delhi': 539, 'Noida': 149}

# .get() — safe access with defaults
for order in orders:
    discount = order.get("discount", 0)  # no KeyError if missing!
    print(f"{order['item']}: ₹{order['amount'] - discount}")`
          },
          {
            label: "🔧 Nested dict config — the pattern you'll use daily",
            language: "python",
            code: `# Pipeline config as nested dict — real Airflow/dbt pattern
pipeline_config = {
    "source": {
        "type": "postgres",
        "host": "db.prod.internal",
        "tables": ["orders", "users", "payments"]
    },
    "destination": {
        "type": "redshift",
        "schema": "analytics",
        "write_mode": "upsert"
    }
}

# Safe nested access without KeyError
def deep_get(d, *keys, default=None):
    """Navigate nested dicts safely 🎯"""
    for key in keys:
        if isinstance(d, dict):
            d = d.get(key, default)
        else:
            return default
    return d

schema = deep_get(pipeline_config, "destination", "schema", default="public")
print(f"Loading to schema: {schema}")  # analytics`
          }
        ],
        gotchas: [
          { title: "KeyError on missing keys", body: "Always use .get(key, default) instead of dict[key] when the key might not exist." },
          { title: "Mutating dict while iterating", body: "for k in d: del d[k] raises RuntimeError. Iterate over list(d.keys()) instead." },
          { title: "Dict keys must be hashable", body: "You can't use a list as a dict key. Use a tuple instead." }
        ],
        de_relevance: "JSON IS a dict. Every API you call, every config file you read, every Airflow Variable — dicts everywhere. <strong>Pydantic</strong> models can be created from dicts via <code>Model(**data_dict)</code> and serialized back with <code>.model_dump()</code>. Understanding dict operations means transforming API responses into database-ready formats in seconds.",
        quiz: [
          { q: "Dict lookup time complexity?", options: ["O(n)", "O(log n)", "O(1)", "O(n²)"], answer: 2, explanation: "Hash table magic — O(1) constant time. This is why dicts are so fast." },
          { q: "What does .get('key') return if missing?", options: ["KeyError", "0", "''", "None"], answer: 3, explanation: ".get() returns None by default for missing keys. No KeyError, no drama." },
          { q: "Since Python 3.7, dicts are:", options: ["Unordered", "Insertion-ordered", "Sorted by key", "Random"], answer: 1, explanation: "Python 3.7+ guarantees insertion order. It's in the language spec." }
        ],
        resources: [
          { label: "Python Docs — Dictionaries", url: "https://docs.python.org/3/library/stdtypes.html#dict" },
          { label: "Real Python — Python Dicts", url: "https://realpython.com/python-dicts/" }
        ]
      }
    },
    {
      id: "t07",
      name: "Tuples & Sets",
      imp: "must",
      subtopics: ["immutability of tuples", "set operations (union/intersection/diff)", "frozenset", "when to use each"],
      content: {
        locked: false,
        vibe: "Tuples & Sets 🎯 — tuples for fixed records, sets for deduplication. Both show up constantly in data work.",
        explanation: [
          "<strong>Tuples</strong> are like lists that took a vow of silence — once created, they can't be changed. <code>point = (10, 20)</code> is a tuple, and you can't do <code>point[0] = 30</code>. This immutability makes them hashable (so you can use them as dict keys!) and slightly faster than lists.",
          "In data work, tuples are everywhere. <code>cursor.fetchone()</code> returns a tuple. <code>dict.items()</code> gives you tuples. Function return values like <code>return name, age</code> are actually tuples (Python auto-packs them).",
          "<strong>Sets</strong> are unordered collections with NO duplicates. Think of them as the bouncer at the club — \"you're already inside, can't come in again.\" Sets are <em>blazingly</em> fast for membership checks: <code>x in my_set</code> is O(1) vs O(n) for lists.",
          "Set operations — <strong>union</strong>, <strong>intersection</strong>, <strong>difference</strong> — are directly from math. \"Which users are in both datasets?\" → intersection. \"Which products in A but not B?\" → difference. <code>frozenset</code> is an immutable set — useful as a dict key."
        ],
        ascii: `  # Set Operations — Venn Diagram Style

  A = {1, 2, 3, 4}        B = {3, 4, 5, 6}

       ┌─────────────────────────┐
       │ A          ┌────────────┤──────────┐
       │            │ A ∩ B      │          │
       │  {1, 2}    │  {3, 4}    │  {5, 6}  │
       │  A - B     │ intersect  │  B - A   │
       └────────────┤────────────┘          │
                    │          B            │
                    └───────────────────────┘

  A | B  = {1, 2, 3, 4, 5, 6}   # union
  A & B  = {3, 4}                # intersection
  A - B  = {1, 2}                # difference
  A ^ B  = {1, 2, 5, 6}         # symmetric difference`,
        code: [
          {
            label: "🔍 Deduplication pipeline — sets in real data work",
            language: "python",
            code: `# Finding overlapping users across data sources
redshift_users = {"u001", "u002", "u003", "u004", "u005"}
mongodb_users = {"u003", "u004", "u005", "u006", "u007"}
active_sessions = {"u001", "u003", "u007", "u008"}

# Users in BOTH databases — who's synced correctly?
synced = redshift_users & mongodb_users
print(f"Synced users: {synced}")  # {'u003', 'u004', 'u005'}

# Users only in Redshift — migration missed these!
migration_gap = redshift_users - mongodb_users
print(f"Missing from Mongo: {migration_gap}")  # {'u001', 'u002'}

# ALL unique users across both systems
all_users = redshift_users | mongodb_users
print(f"Total unique: {len(all_users)}")  # 7

# Ghost sessions — active but not in any DB 🚨
ghost_sessions = active_sessions - all_users
print(f"Ghost sessions: {ghost_sessions}")  # {'u008'}

# Dedup list while preserving order
raw = ["click", "view", "click", "purchase", "view"]
unique_ordered = list(dict.fromkeys(raw))  # trick! 🎯
print(unique_ordered)  # ['click', 'view', 'purchase']`
          },
          {
            label: "📦 Tuples as data records — lighter than dicts",
            language: "python",
            code: `from collections import namedtuple

# Database results come as tuples
raw_results = [
    ("Kohli", "RCB", 7263, 49.75),
    ("Rohit", "MI", 6628, 48.96),
    ("SKY", "MI", 2340, 44.15),
]

# Named tuples — tuples with labels (best of both worlds!)
Player = namedtuple("Player", ["name", "team", "runs", "average"])
players = [Player(*row) for row in raw_results]

for p in players:
    print(f"{p.name} ({p.team}): {p.runs} runs at {p.average}")
    # Still immutable, still hashable, but readable! ✅

# Tuple unpacking — Python's cleanest syntax
for name, team, runs, avg in raw_results:
    if avg > 45:
        print(f"Elite: {name} — {avg} avg")`
          }
        ],
        gotchas: [
          { title: "Single-element tuple needs a comma", body: "(42) is an int, (42,) is a tuple. The comma makes it a tuple, not the parentheses." },
          { title: "Sets are unordered", body: "Don't rely on iteration order. For ordered unique elements, use dict.fromkeys()." },
          { title: "Set elements must be hashable", body: "You can't put a list in a set. Convert to tuple first." }
        ],
        de_relevance: "<code>cursor.fetchall()</code> returns tuples. <code>namedtuple</code> is the lightweight alternative to full classes for data records. Sets are your go-to for deduplication — removing duplicate rows, finding unique IDs, comparing datasets. In <strong>Airflow</strong>, task dependencies use set-like operations. In <strong>data quality checks</strong>, you compare sets of expected vs actual column names.",
        quiz: [
          { q: "How do you create a single-element tuple?", options: ["(1)", "[1]", "(1,)", "{1}"], answer: 2, explanation: "The comma makes the tuple, not the parentheses. (1) is just 1 with extra parens." },
          { q: "x in my_set is O(?) time:", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], answer: 1, explanation: "Sets use hash tables — O(1) lookups. Perfect for membership checks." },
          { q: "Elements in A but not B?", options: ["A | B", "A & B", "A - B", "A ^ B"], answer: 2, explanation: "A - B is the difference — everything in A that's not in B." }
        ],
        resources: [
          { label: "Python Docs — Sets", url: "https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset" },
          { label: "Real Python — Sets", url: "https://realpython.com/python-sets/" }
        ]
      }
    },
    {
      id: "t08",
      name: "Collections Module",
      imp: "high",
      subtopics: ["Counter/deque", "namedtuple/ChainMap", "heapq for priority queues", "bisect"],
      content: {
        locked: false,
        vibe: "Collections 🧰 — Counter alone will save you from writing 50 lines of groupby logic. Criminally underused.",
        explanation: [
          "The <code>collections</code> module is Python's \"we already built that for you\" package. It has specialized container types that are more efficient and readable than rolling your own with basic dicts and lists.",
          "<strong>Counter</strong> is the MVP. Give it any iterable and it counts occurrences. <code>Counter([\"a\",\"b\",\"a\"])</code> → <code>{\"a\":2, \"b\":1}</code>. It has <code>.most_common(n)</code> which returns the top N items. This one class replaces 50% of counting questions on StackOverflow.",
          "<strong>deque</strong> (pronounced \"deck\") is a double-ended queue — efficient append/pop from BOTH ends in O(1). Regular lists are O(n) for <code>insert(0, x)</code> or <code>pop(0)</code>. If you're implementing a sliding window, BFS, or FIFO queue, use deque.",
          "<strong>heapq</strong> gives you a priority queue using a min-heap. <code>heapq.nsmallest(3, data)</code> and <code>heapq.nlargest(3, data)</code> are faster than sorting when you only need the top/bottom k items."
        ],
        ascii: `  # Counter — Frequency Analysis Made Easy

  data = ["api", "db", "api", "cache", "api", "db"]

  Counter(data):
  ┌─────────┬───────┐
  │  Key    │ Count │
  ├─────────┼───────┤
  │  "api"  │   3   │ ████████████
  │  "db"   │   2   │ ████████
  │ "cache" │   1   │ ████
  └─────────┴───────┘

  # deque vs list — Performance
  ┌──────────────┬──────────┬──────────┐
  │ Operation    │  list    │  deque   │
  ├──────────────┼──────────┼──────────┤
  │ append right │  O(1) ✅ │  O(1) ✅ │
  │ append left  │  O(n) 😰 │  O(1) ✅ │
  │ pop right    │  O(1) ✅ │  O(1) ✅ │
  │ pop left     │  O(n) 😰 │  O(1) ✅ │
  └──────────────┴──────────┴──────────┘`,
        code: [
          {
            label: "📊 API monitoring — Counter for real-time analytics",
            language: "python",
            code: `from collections import Counter, defaultdict

api_logs = [
    {"endpoint": "/api/orders", "status": 200, "ms": 45},
    {"endpoint": "/api/users", "status": 200, "ms": 32},
    {"endpoint": "/api/orders", "status": 500, "ms": 2100},
    {"endpoint": "/api/orders", "status": 200, "ms": 67},
    {"endpoint": "/api/payments", "status": 401, "ms": 12},
    {"endpoint": "/api/users", "status": 200, "ms": 28},
]

# Counter — instant frequency analysis 🎯
endpoint_hits = Counter(log["endpoint"] for log in api_logs)
print("Top endpoints:", endpoint_hits.most_common(2))
# [('/api/orders', 3), ('/api/users', 2)]

status_counts = Counter(log["status"] for log in api_logs)
error_rate = status_counts.get(500, 0) / len(api_logs) * 100
print(f"Error rate: {error_rate:.1f}%")

# Counter arithmetic — compare time periods
morning = Counter({"orders": 150, "users": 80})
evening = Counter({"orders": 200, "users": 60})
diff = evening - morning  # only positive differences
print(f"Evening spike: {dict(diff)}")  # {'orders': 50}`
          },
          {
            label: "🔄 deque — sliding window for stream processing",
            language: "python",
            code: `from collections import deque

class MetricsWindow:
    def __init__(self, window_size=5):
        self.window = deque(maxlen=window_size)  # auto-drops old!

    def add(self, value):
        self.window.append(value)

    def average(self):
        return sum(self.window) / len(self.window) if self.window else 0

    def is_anomaly(self, threshold=2.0):
        if len(self.window) < 2:
            return False
        avg = sum(list(self.window)[:-1]) / (len(self.window) - 1)
        return self.window[-1] > avg * threshold

# Simulate response time monitoring
monitor = MetricsWindow(window_size=5)
for ms in [45, 52, 48, 51, 210, 47, 44]:
    monitor.add(ms)
    status = "🚨 ANOMALY" if monitor.is_anomaly() else "✅ Normal"
    print(f"  {ms}ms — avg: {monitor.average():.0f}ms — {status}")`
          }
        ],
        gotchas: [
          { title: "Counter subtraction drops negatives", body: "Counter(a=3) - Counter(a=5) gives Counter(), not Counter(a=-2). Use .subtract() for negatives." },
          { title: "deque random access is O(n)", body: "deque[i] is O(n), not O(1). Use deque for ends, list for random access." },
          { title: "heapq is min-heap only", body: "For max-heap, negate your values: heapq.heappush(h, -value)." }
        ],
        de_relevance: "<strong>Counter</strong> is essentially GROUP BY + COUNT in Python. When profiling data before loading into Redshift, Counter tells you value distributions instantly. <strong>deque</strong> with <code>maxlen</code> is the sliding window pattern used in stream processing (Kafka consumers, real-time alerting). And <strong>heapq</strong> shows up in priority-based task scheduling.",
        quiz: [
          { q: "Counter('banana') — how many 'a's?", options: ["1", "2", "3", "4"], answer: 2, explanation: "'banana' has 3 a's. Counter counts every character." },
          { q: "deque(maxlen=5) with 6 appends?", options: ["Error", "Oldest dropped", "Newest rejected", "Nothing"], answer: 1, explanation: "maxlen auto-drops the oldest item. FIFO behavior!" },
          { q: "heapq implements a:", options: ["Max-heap", "Min-heap", "Binary tree", "Hash table"], answer: 1, explanation: "Python's heapq is a min-heap. Smallest element at index 0." }
        ],
        resources: [
          { label: "Python Docs — Collections", url: "https://docs.python.org/3/library/collections.html" },
          { label: "Real Python — Collections Module", url: "https://realpython.com/python-collections-module/" }
        ]
      }
    }
  ]
}
