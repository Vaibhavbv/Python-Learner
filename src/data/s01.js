export const s01 = {
  id: "s01",
  num: "01",
  title: "Core Python Fundamentals",
  badge: "must",
  topics: [
    {
      id: "t01",
      name: "Data Types & Variables",
      imp: "must",
      subtopics: ["int/float/str/bool", "type()/casting", "None type", "mutable vs immutable"],
      content: {
        locked: false,
        vibe: "Data Types 🧱 — the atoms of Python. Get these wrong and your pipeline blows up at 3am.",
        explanation: [
          "Every single piece of data your Python code touches has a type. Every. Single. One. When you pull a row from Redshift, parse a JSON response, or read a CSV — Python is quietly assigning types to everything. And if you assume <code>order_id</code> is an <strong>int</strong> when it's actually a <strong>str</strong>, congrats — your INSERT fails and your Slack is blowing up at 3am 😬",
          "The basic types are dead simple: <strong>int</strong> (whole numbers), <strong>float</strong> (decimals), <strong>str</strong> (text), and <strong>bool</strong> (True/False). But the real game is understanding <strong>mutable vs immutable</strong>. Lists, dicts, sets — these are mutable, meaning you can change them in place. Strings, ints, tuples — immutable, meaning any \"change\" actually creates a brand new object. This distinction is the root cause of like 40% of Python bugs in production code.",
          "The <code>None</code> type is Python's way of saying \"there's nothing here\" — it's not 0, it's not an empty string, it's literally <em>nothing</em>. Think of it like a NULL in your database. And just like NULL, it'll mess you up if you don't handle it. Always use <code>is None</code> to check, never <code>== None</code>.",
          "<code>type()</code> tells you what something is, and casting functions like <code>int()</code>, <code>float()</code>, <code>str()</code> let you convert between types. This is bread-and-butter stuff when you're processing API responses where everything comes as strings but your DB schema expects integers and floats."
        ],
        ascii: `  # Mutable vs Immutable — The Core Difference

  x = [1, 2, 3]    →  id: 0x7f1a   ← same object, contents change
  x.append(4)      →  id: 0x7f1a   ✅ still same address!

  y = "hello"      →  id: 0x4b2c
  y = y + " world" →  id: 0x9d4e   ← NEW object created ❌

  # Memory layout of a list
  my_list = [10, "hi", True]
              ↓     ↓     ↓
            [ptr]  [ptr] [ptr]  ← list stores references
              ↓     ↓     ↓
             int   str   bool   ← actual objects on the heap`,
        code: [
          {
            label: "🏏 IPL player stats — type casting in the real world",
            language: "python",
            code: `# Parsing IPL stats from API response — everything arrives as strings
raw_stats = {
    "player": "Virat Kohli",
    "runs": "7263",        # str from API
    "average": "49.75",    # str from API
    "is_captain": "1",     # str from API (0/1)
    "man_of_match": None   # sometimes null in response
}

# Type casting — because Redshift doesn't want your strings
player = str(raw_stats["player"])
runs = int(raw_stats["runs"])           # "7263" → 7263
avg = float(raw_stats["average"])       # "49.75" → 49.75
is_captain = bool(int(raw_stats["is_captain"]))  # "1" → 1 → True

# None check — always do this before casting 🎯
mom_count = int(raw_stats["man_of_match"]) if raw_stats["man_of_match"] is not None else 0

print(f"{player}: {runs} runs at {avg}, Captain: {is_captain}")
# Virat Kohli: 7263 runs at 49.75, Captain: True`
          },
          {
            label: "😱 The mutable default argument trap — every Python dev falls for this",
            language: "python",
            code: `# THE BUG: mutable default argument
def add_order(order, orders=[]):    # ← this [] is shared across ALL calls!
    orders.append(order)
    return orders

print(add_order("Pizza"))     # ['Pizza']        ← looks fine
print(add_order("Burger"))    # ['Pizza', 'Burger'] ← WAIT WHAT 😱

# THE FIX: use None as default, create new list inside
def add_order_fixed(order, orders=None):
    if orders is None:
        orders = []             # fresh list every time 🎯
    orders.append(order)
    return orders

print(add_order_fixed("Pizza"))   # ['Pizza']
print(add_order_fixed("Burger"))  # ['Burger'] ← correct!`
          }
        ],
        gotchas: [
          { title: "Mutable default arguments", body: "Using [] or {} as a default param means it's shared across ALL function calls. Use None instead." },
          { title: "0.1 + 0.2 ≠ 0.3", body: "Floating point is literally lying to you. Use decimal.Decimal for money/finance calculations." },
          { title: "is vs ==", body: "is checks if two variables point to the SAME object in memory. == checks if values are equal. Use is only for None checks." }
        ],
        de_relevance: "In data engineering, type mismatches are the #1 silent killer. Your Redshift <code>COPY</code> command fails because a column expected <code>INTEGER</code> but got <code>\"123\"</code> as a string. Your <strong>Pydantic</strong> model throws a <code>ValidationError</code> because the API returned <code>null</code> instead of <code>0</code>. Understanding Python's type system is non-negotiable for building reliable pipelines with <strong>Airflow</strong>, <strong>FastAPI</strong>, and <strong>dbt</strong>.",
        quiz: [
          { q: "What does type([]) return?", options: ["<class 'array'>", "<class 'list'>", "<class 'object'>", "<class 'collection'>"], answer: 1, explanation: "[] is a list. Python keeps it real — no fancy names." },
          { q: "Which of these is immutable?", options: ["list", "dict", "tuple", "set"], answer: 2, explanation: "Tuples cannot be changed after creation — they're basically VIP-locked 🔒" },
          { q: "What is bool a subclass of?", options: ["object", "int", "str", "float"], answer: 1, explanation: "True == 1 and False == 0. Wild but true. Python's quirky like that 😅" }
        ],
        resources: [
          { label: "Python Docs — Built-in Types", url: "https://docs.python.org/3/library/stdtypes.html" },
          { label: "Real Python — Python Data Types", url: "https://realpython.com/python-data-types/" }
        ]
      }
    },
    {
      id: "t02",
      name: "Control Flow",
      imp: "must",
      subtopics: ["if/elif/else", "for & while loops", "break/continue/pass", "match-case (3.10+)"],
      content: {
        locked: false,
        vibe: "Control Flow 🔀 — every ETL pipeline is just control flow dressed up in fancy orchestration clothing.",
        explanation: [
          "Control flow is literally the skeleton of every program. <code>if/elif/else</code> is how your code makes decisions. <code>for</code> loops iterate over stuff. <code>while</code> loops keep going until a condition breaks. That's it. That's the tweet. But the difference between a junior and a senior is <em>how</em> they use these tools.",
          "Think about it — your Airflow DAG is just a giant if/else tree. \"If the data source is ready, extract. If extraction succeeds, transform. If any step fails, alert.\" Every pipeline decision can be traced back to basic control flow. The orchestration layer just makes it look fancy 💅",
          "<code>break</code> exits the loop entirely, <code>continue</code> skips to the next iteration, and <code>pass</code> is Python's \"I know I need something here but I'm not ready yet\" — it's the <code>TODO</code> of control flow. New in Python 3.10, <code>match-case</code> is structural pattern matching done right.",
          "One thing that trips people up: Python's <code>for</code> loop is fundamentally different from C/Java. It doesn't count — it <em>iterates</em>. <code>for item in collection</code> uses the iterator protocol under the hood. When you do <code>for i in range(10)</code>, you're iterating over a range object, not counting from 0 to 9."
        ],
        ascii: `  # Pipeline Decision Tree — it's just control flow!

  ┌──────────────────────┐
  │   Data Source Ready?  │
  └──────────┬───────────┘
             │
      ┌──────┴──────┐
      │ YES         │ NO
      ▼             ▼
  ┌────────┐   ┌──────────┐
  │Extract │   │Wait/Retry│
  └───┬────┘   └──────────┘
      │
      ▼
  ┌──────────────────┐
  │  Validation OK?  │
  └──────┬───────────┘
    YES  │      NO
      ┌──┴───┐  ┌───────────┐
      │Trans-│  │Log Error  │
      │form  │  │Send Alert │
      └──┬───┘  └───────────┘
         │
         ▼
  ┌──────────┐
  │  Load    │
  └──────────┘`,
        code: [
          {
            label: "🍕 Zomato order processing — real decision logic",
            language: "python",
            code: `# Processing Zomato orders — each status needs different handling
orders = [
    {"id": "Z001", "status": "delivered", "amount": 450},
    {"id": "Z002", "status": "pending", "amount": 230},
    {"id": "Z003", "status": "cancelled", "amount": 180},
    {"id": "Z004", "status": "preparing", "amount": 320},
]

total_revenue = 0
for order in orders:
    if order["status"] == "delivered":
        total_revenue += order["amount"]
        print(f"✅ {order['id']}: ₹{order['amount']} — counted")
    elif order["status"] == "cancelled":
        print(f"❌ {order['id']}: ₹{order['amount']} — skipped")
        continue    # skip to next order
    elif order["status"] == "pending":
        print(f"⏳ {order['id']}: ₹{order['amount']} — waiting")
    else:
        pass        # other statuses — handle later

print(f"\\nTotal revenue: ₹{total_revenue}")`
          },
          {
            label: "🆕 match-case (Python 3.10+) — pattern matching done right",
            language: "python",
            code: `# API response handling with match-case — clean af
def handle_api_response(response):
    match response:
        case {"status": 200, "data": data}:
            print(f"✅ Got {len(data)} records")
            return data
        case {"status": 404}:
            print("🔍 Resource not found")
            return None
        case {"status": 429, "retry_after": seconds}:
            print(f"⏳ Rate limited — retry after {seconds}s")
            return None
        case {"status": status} if status >= 500:
            print(f"🔥 Server error: {status}")
            raise Exception(f"Server error {status}")
        case _:
            print("🤷 Unknown response format")
            return None

handle_api_response({"status": 200, "data": [1, 2, 3]})`
          }
        ],
        gotchas: [
          { title: "Infinite while loops", body: "Forgetting break in while loops = your script hangs forever. Always have a clear exit condition." },
          { title: "Modifying list while iterating", body: "for item in my_list: my_list.remove(item) will skip elements. Iterate over a copy instead." },
          { title: "match-case needs 3.10+", body: "If your prod server runs Python 3.8, you can't use match-case. Check your runtime version first." }
        ],
        de_relevance: "Your Airflow DAGs are literally control flow graphs. Each <code>BranchPythonOperator</code> is an if/else. In <strong>dbt</strong>, Jinja templating uses control flow too — <code>{%- if target.name == 'prod' -%}</code> to switch between dev and prod behavior. Understanding control flow well means your pipelines handle edge cases gracefully instead of crashing at 2am.",
        quiz: [
          { q: "What does 'pass' do in Python?", options: ["Exits the loop", "Skips to next iteration", "Does absolutely nothing", "Raises an error"], answer: 2, explanation: "pass is literally a no-op. It's a placeholder that says 'I'll deal with this later' 😂" },
          { q: "Which keyword skips the current iteration?", options: ["break", "pass", "continue", "skip"], answer: 2, explanation: "continue says 'nah, skip this one' and jumps to the next iteration." },
          { q: "match-case was introduced in Python:", options: ["3.8", "3.9", "3.10", "3.11"], answer: 2, explanation: "Python 3.10 brought structural pattern matching. Make sure your runtime supports it!" }
        ],
        resources: [
          { label: "Python Docs — Control Flow", url: "https://docs.python.org/3/tutorial/controlflow.html" },
          { label: "Real Python — match-case", url: "https://realpython.com/python310-new-features/#structural-pattern-matching" }
        ]
      }
    },
    {
      id: "t03",
      name: "Functions",
      imp: "must",
      subtopics: ["*args/**kwargs", "default & keyword args", "return values", "LEGB scope rule"],
      content: {
        locked: false,
        vibe: "Functions 🔧 — a good function is like a good API endpoint: predictable input, predictable output, no surprises.",
        explanation: [
          "Functions are how you stop writing the same code 47 times. But more importantly, they're how you create <strong>abstractions</strong> — taking a complex operation and giving it a name. <code>def transform_order(raw_data)</code> is infinitely more readable than 30 lines of inline transformation logic.",
          "<code>*args</code> collects extra positional arguments into a tuple, <code>**kwargs</code> collects extra keyword arguments into a dict. Think of *args as \"I'll take whatever you throw at me\" and **kwargs as \"I'll take whatever labeled stuff you give me.\" They're everywhere — decorators, class inheritance, flexible API wrappers.",
          "The <strong>LEGB rule</strong> is Python's lookup order when it sees a variable name: <strong>L</strong>ocal (inside the function) → <strong>E</strong>nclosing (outer function, if nested) → <strong>G</strong>lobal (module level) → <strong>B</strong>uiltin (Python's built-in names). It's literally just \"where did this variable come from?\" answered in order of proximity.",
          "Python functions <em>always</em> return something. If you don't explicitly <code>return</code>, the function returns <code>None</code>. This bites people when they do <code>result = my_list.sort()</code> and wonder why result is <code>None</code> — because <code>.sort()</code> modifies in-place and returns None."
        ],
        ascii: `  # LEGB Scope Resolution — Python's Variable Lookup

  ┌───────────────────────────────────┐
  │  B — Builtins                     │  print, len, range, int...
  │  ┌─────────────────────────────┐  │
  │  │  G — Global (module)        │  │  MAX_RETRIES = 3
  │  │  ┌───────────────────────┐  │  │
  │  │  │  E — Enclosing        │  │  │  def outer():
  │  │  │  ┌─────────────────┐  │  │  │      x = 10
  │  │  │  │  L — Local      │  │  │  │      def inner():
  │  │  │  │  y = 20         │  │  │  │          y = 20  ← HERE
  │  │  │  └─────────────────┘  │  │  │
  │  │  └───────────────────────┘  │  │
  │  └─────────────────────────────┘  │
  └───────────────────────────────────┘

  Python checks: Local → Enclosing → Global → Builtin
  First match wins! 🎯`,
        code: [
          {
            label: "🔧 Flexible data processor with *args and **kwargs",
            language: "python",
            code: `# A real pattern you'll use in data pipelines
def process_records(*records, validate=True, source="api", **extra_meta):
    """Process one or more records with optional validation"""
    results = []
    for record in records:
        if validate and not record.get("id"):
            print(f"⚠️ Skipping invalid record from {source}")
            continue
        record["_source"] = source
        record["_meta"] = extra_meta    # any extra kwargs go here
        results.append(record)
    return results

# Flexible calling patterns — the power of *args/**kwargs
orders = process_records(
    {"id": 1, "item": "Paneer Tikka", "amt": 280},
    {"id": 2, "item": "Butter Naan", "amt": 60},
    validate=True,
    source="zomato_api",
    batch_id="B001",         # extra kwargs → _meta dict
    processed_at="2024-01-15"
)
print(f"Processed {len(orders)} orders")`
          },
          {
            label: "🎯 LEGB in action — scope can be tricky",
            language: "python",
            code: `# Watch how Python resolves variable names
MAX_RETRIES = 3    # Global scope

def create_pipeline(name):
    retry_count = 0    # Enclosing scope

    def execute():
        nonlocal retry_count    # access enclosing variable
        retry_count += 1
        print(f"Pipeline '{name}': attempt {retry_count}/{MAX_RETRIES}")
        # name → Enclosing, retry_count → Enclosing (nonlocal)
        # MAX_RETRIES → Global, print → Builtin
        return retry_count < MAX_RETRIES

    return execute

run_etl = create_pipeline("daily_orders")
run_etl()  # Pipeline 'daily_orders': attempt 1/3
run_etl()  # Pipeline 'daily_orders': attempt 2/3
# retry_count persists because of closure! 🧠`
          }
        ],
        gotchas: [
          { title: "result = list.sort()", body: "sort() returns None, it modifies in-place. Use sorted() if you need a new list." },
          { title: "Mutable default args (again!)", body: "def f(data=[]) is a classic trap. The list is shared across ALL calls. Always use None as default." },
          { title: "global keyword abuse", body: "If you're using global a lot, your architecture needs rethinking. Pass data through arguments instead." }
        ],
        de_relevance: "In <strong>Airflow</strong>, every task is essentially a function call — <code>PythonOperator(python_callable=my_function)</code>. Understanding default args, kwargs, and return values directly affects how you pass data between tasks via XCom. In <strong>FastAPI</strong>, your endpoint handlers are functions with typed parameters. And closures (LEGB rule) are the foundation of decorators.",
        quiz: [
          { q: "What does a function return if there's no return statement?", options: ["0", "''", "None", "False"], answer: 2, explanation: "Every function returns None implicitly if you don't specify a return value. Sneaky! 👀" },
          { q: "In LEGB, what does 'E' stand for?", options: ["External", "Enclosing", "Environment", "Exported"], answer: 1, explanation: "Enclosing — it's the scope of the outer function when you have nested functions." },
          { q: "What type does *args collect arguments into?", options: ["list", "dict", "tuple", "set"], answer: 2, explanation: "*args gives you a tuple. **kwargs gives you a dict. Remember: tuple for positional, dict for named." }
        ],
        resources: [
          { label: "Python Docs — Defining Functions", url: "https://docs.python.org/3/tutorial/controlflow.html#defining-functions" },
          { label: "Real Python — Python Scope & LEGB Rule", url: "https://realpython.com/python-scope-legb-rule/" }
        ]
      }
    },
    {
      id: "t04",
      name: "String Manipulation",
      imp: "must",
      subtopics: ["f-strings/format()", "slicing & indexing", "split/join/strip", "regex basics"],
      content: {
        locked: false,
        vibe: "Strings 🧵 — you will spend 40% of your DE career cleaning string data. This is not a joke.",
        explanation: [
          "Strings are everywhere. API responses are strings. CSV cells are strings. SQL queries are strings. Log messages are strings. If you're a data engineer, you are essentially a professional string wrangler with extra steps 😅",
          "<strong>f-strings</strong> (Python 3.6+) are the absolute goat for string formatting. <code>f\"Hello {name}, you have {count} orders\"</code> is cleaner than any other method. You can put expressions inside too: <code>f\"{price:.2f}\"</code> for 2 decimal places, <code>f\"{name!r}\"</code> for repr.",
          "<strong>Slicing</strong> is Python's superpower: <code>s[start:stop:step]</code> — start is inclusive, stop is exclusive. <code>s[::-1]</code> reverses a string. Once you internalize that strings are just arrays of characters, slicing becomes second nature.",
          "<strong>split/join/strip</strong> are your daily drivers. <code>\",\".join(items)</code> to create CSV lines, <code>line.split(\"\\t\")</code> to parse TSV data, <code>user_input.strip()</code> to clean whitespace. And <strong>regex</strong> (<code>re</code> module) is for when parsing gets hairy — extracting emails, phone numbers, or parsing messy log lines."
        ],
        ascii: `  # String as an Array — Index Positions

  s = "P y t h o n"
       0 1 2 3 4 5    ← positive index
      -6-5-4-3-2-1    ← negative index

  s[0]   → "P"        s[-1]  → "n"
  s[2:5] → "tho"      s[:3]  → "Pyt"
  s[::2] → "Pto"      s[::-1]→ "nohtyP"

  # Common String Operations Pipeline

  raw = "  Virat Kohli, 7263, 49.75  \\n"
         │
         ▼
  .strip()     → "Virat Kohli, 7263, 49.75"
         │
         ▼
  .split(", ") → ["Virat Kohli", "7263", "49.75"]
         │
         ▼
  Clean data ready for processing! 🎯`,
        code: [
          {
            label: "💰 UPI transaction log parser — real string cleaning",
            language: "python",
            code: `# Parsing UPI transaction logs — messy real-world data
raw_logs = [
    "  2024-01-15 | UPI/CR/402851/Rahul Sharma/SBI/₹2500  \\n",
    "2024-01-15 | UPI/DR/402852/Zomato/HDFC/₹450\\n",
    "  2024-01-16 | UPI/CR/402853/Salary/ICICI/₹75000  ",
]

transactions = []
for log in raw_logs:
    clean = log.strip()                    # remove whitespace + newlines
    parts = clean.split(" | ")             # split date from details
    date = parts[0]
    details = parts[1].split("/")          # parse UPI string

    txn = {
        "date": date,
        "type": "credit" if details[1] == "CR" else "debit",
        "ref": details[2],
        "party": details[3],
        "bank": details[4],
        "amount": float(details[5].replace("₹", "").replace(",", ""))
    }
    transactions.append(txn)
    print(f"{txn['date']} | {txn['type']:>6} | ₹{txn['amount']:>10,.2f} | {txn['party']}")`
          },
          {
            label: "🔍 Regex — for when .split() isn't enough",
            language: "python",
            code: `import re

# Extract structured data from messy log lines
log_line = '[2024-01-15 14:32:01] ERROR api.orders: Failed to process order #Z4521 for user_id=8842 (timeout after 30s)'

# Named groups make regex actually readable
pattern = r'\\[(?P<timestamp>[\\d-]+ [\\d:]+)\\] (?P<level>\\w+) (?P<module>[\\w.]+): (?P<message>.+)'
match = re.match(pattern, log_line)

if match:
    print(f"Time:    {match.group('timestamp')}")  # 2024-01-15 14:32:01
    print(f"Level:   {match.group('level')}")      # ERROR
    print(f"Module:  {match.group('module')}")      # api.orders

    # Extract order ID and user ID from message
    msg = match.group('message')
    order_id = re.search(r'#(\\w+)', msg).group(1)     # Z4521
    user_id = re.search(r'user_id=(\\d+)', msg).group(1) # 8842
    print(f"Order:   {order_id}, User: {user_id}")`
          }
        ],
        gotchas: [
          { title: "Strings are immutable", body: "Every concatenation creates a new string. In a loop, use ''.join(list) instead of s += x for performance." },
          { title: "Regex backtracking", body: "A badly written regex pattern can hang your program. Always test patterns on small inputs first." },
          { title: "Encoding issues", body: "UnicodeDecodeError will haunt you when reading files. Always specify encoding: open(f, encoding='utf-8')." }
        ],
        de_relevance: "String manipulation is literally 40% of data engineering. You're parsing S3 paths (<code>s3://bucket/year=2024/month=01/file.parquet</code>), building SQL queries with f-strings (carefully — use parameterized queries to avoid SQL injection!), cleaning CSV data, and parsing log files with regex. In <strong>dbt</strong>, you're writing Jinja templates that generate SQL strings. In <strong>Airflow</strong>, you're formatting DAG IDs, task names, and connection strings.",
        quiz: [
          { q: "What does 'hello world'.split() return?", options: ["['hello world']", "['hello', 'world']", "('hello', 'world')", "'hello world'"], answer: 1, explanation: "split() with no args splits on whitespace. Clean and simple." },
          { q: "What is s[::-1] for s = 'Python'?", options: ["'Python'", "'nohtyP'", "'Pytho'", "Error"], answer: 1, explanation: "[::-1] reverses the string. Classic Python string reversal trick." },
          { q: "f-strings were introduced in Python:", options: ["3.4", "3.5", "3.6", "3.7"], answer: 2, explanation: "Python 3.6 gave us f-strings. Best thing since sliced bread, honestly." }
        ],
        resources: [
          { label: "Python Docs — String Methods", url: "https://docs.python.org/3/library/stdtypes.html#string-methods" },
          { label: "Real Python — Python f-strings", url: "https://realpython.com/python-f-strings/" }
        ]
      }
    }
  ]
}
