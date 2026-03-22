export const s03 = {
  id: "s03",
  num: "03",
  title: "Object-Oriented Programming",
  badge: "must",
  topics: [
    {
      id: "t09",
      name: "Classes & Objects",
      imp: "must",
      subtopics: ["__init__/__repr__/__str__", "instance vs class vars", "self keyword", "object creation lifecycle"],
      content: {
        locked: false,
        vibe: "Classes 🏗️ — every Airflow operator, every Pydantic model, every dbt class is OOP. You're already using it.",
        explanation: [
          "A class is a blueprint, an object is a thing built from that blueprint. Class = cookie cutter, object = cookie. <code>class Order:</code> defines the template, <code>my_order = Order()</code> creates an actual order. Every time you use <code>pd.DataFrame()</code>, you're creating an object from the DataFrame class.",
          "<code>__init__</code> is the constructor — it runs when you create a new object. <code>self</code> is just \"this object right here\" — it's how the object refers to itself. <code>self.name = name</code> stores data ON this specific object.",
          "<strong>Instance variables</strong> belong to ONE object (<code>self.name</code>). <strong>Class variables</strong> are shared across ALL objects. Think: instance var = \"MY name\", class var = \"OUR species\". Mixing these up causes bugs where modifying one object affects all of them.",
          "<code>__repr__</code> is for developers (debugger), <code>__str__</code> is for users (print). Always define <code>__repr__</code> — a good one should let you recreate the object: <code>Order(id='Z001', amount=450)</code>."
        ],
        ascii: `  # Class (Blueprint) → Object (Instance)

  ┌──────────────────────────────┐
  │  class PipelineTask:         │  ← Blueprint (class)
  │    type = "etl"              │  ← Class variable (shared)
  │                              │
  │    def __init__(self, name): │
  │      self.name = name        │  ← Instance variable (per obj)
  │      self.status = "pending" │
  └──────────────────────────────┘
           │              │
     ┌─────┘              └─────┐
     ▼                          ▼
  ┌──────────────┐   ┌──────────────┐
  │ Object #1    │   │ Object #2    │
  │ name="extract│   │ name="load"  │
  │ status="done"│   │ status="run" │
  │ type="etl"   │   │ type="etl"   │ ← same for all
  └──────────────┘   └──────────────┘`,
        code: [
          {
            label: "🏗️ Building a real pipeline task class",
            language: "python",
            code: `from datetime import datetime

class PipelineTask:
    """A single task in a data pipeline — OOP done right 🎯"""
    total_tasks = 0  # Class variable — shared

    def __init__(self, name, source, destination):
        self.name = name
        self.source = source
        self.destination = destination
        self.status = "pending"
        self.created_at = datetime.now()
        self.rows_processed = 0
        PipelineTask.total_tasks += 1

    def run(self, data):
        self.status = "running"
        self.rows_processed = len(data)
        self.status = "completed"
        return data

    def __repr__(self):
        return f"PipelineTask(name='{self.name}', status='{self.status}')"

    def __str__(self):
        return f"[{self.status.upper()}] {self.name}: {self.source} → {self.destination}"

extract = PipelineTask("extract_orders", "Zomato API", "staging_db")
transform = PipelineTask("clean_data", "staging_db", "warehouse")
print(extract)       # [PENDING] extract_orders: Zomato API → staging_db
print(repr(transform))  # PipelineTask(name='clean_data', status='pending')
print(f"Total: {PipelineTask.total_tasks}")  # 2`
          },
          {
            label: "⚠️ Class vs Instance variable trap",
            language: "python",
            code: `# THE TRAP: mutable class variable
class BadTracker:
    events = []  # SHARED by ALL instances!
    def add_event(self, event):
        self.events.append(event)

a = BadTracker()
b = BadTracker()
a.add_event("click")
print(b.events)  # ['click'] — b got a's event! 🐛

# THE FIX: use instance variables for mutable data
class GoodTracker:
    def __init__(self):
        self.events = []  # unique per object ✅
    def add_event(self, event):
        self.events.append(event)

a = GoodTracker()
b = GoodTracker()
a.add_event("click")
print(b.events)  # [] — correctly isolated! 🎯`
          }
        ],
        gotchas: [
          { title: "Mutable class variables are shared", body: "class Foo: items = [] means ALL instances share the same list. Use __init__ for mutable data." },
          { title: "Forgetting self", body: "def get_name(): inside a class won't work. You need def get_name(self):. Python doesn't do implicit this." },
          { title: "__repr__ vs __str__", body: "If you only implement one, do __repr__. It's used by debuggers, logging, and as fallback for str()." }
        ],
        de_relevance: "Everything in the DE stack is OOP. <strong>Airflow</strong>: <code>class MyDAG(DAG)</code>. <strong>Pydantic</strong>: <code>class UserModel(BaseModel)</code>. <strong>SQLAlchemy</strong>: <code>class User(Base)</code>. <strong>FastAPI</strong>: routers are class instances. When you write a custom Airflow operator, you're writing a class with <code>__init__</code> and <code>execute()</code>.",
        quiz: [
          { q: "What does self refer to?", options: ["The class itself", "The current instance", "The parent class", "The module"], answer: 1, explanation: "self is the specific object calling the method — 'this instance right here.'" },
          { q: "When does __init__ run?", options: ["Class defined", "Object created", "Method called", "Module imported"], answer: 1, explanation: "__init__ runs when you do MyClass() — it initializes the new object." },
          { q: "Class variables are:", options: ["Unique per instance", "Shared across all", "Private by default", "Immutable"], answer: 1, explanation: "Class variables belong to the class, not instances. All objects share them." }
        ],
        resources: [
          { label: "Python Docs — Classes", url: "https://docs.python.org/3/tutorial/classes.html" },
          { label: "Real Python — OOP in Python", url: "https://realpython.com/python3-object-oriented-programming/" }
        ]
      }
    },
    {
      id: "t10",
      name: "Inheritance & Polymorphism",
      imp: "must",
      subtopics: ["single & multiple inheritance", "super()", "method overriding", "MRO (Method Resolution Order)"],
      content: {
        locked: false,
        vibe: "Inheritance 🧬 — Airflow's BaseOperator → your custom operators. This pattern is literally everywhere.",
        explanation: [
          "<strong>Inheritance</strong> is \"I want everything my parent has, plus my own stuff.\" When you write <code>class MyOperator(BaseOperator):</code>, your operator gets scheduling, retries, and logging for free. You just override what's specific to your task.",
          "<code>super()</code> calls the parent class's method. Crucial in <code>__init__</code> — if you forget <code>super().__init__()</code>, the parent's initialization doesn't run and things break silently. Always call super().__init__() first.",
          "<strong>Method overriding</strong> is polymorphism — the child replaces a parent's method with its own version. Same method name, different behavior. This is why <code>.execute()</code> on any Airflow operator does the right thing.",
          "<strong>MRO</strong> matters with multiple inheritance. Python uses C3 linearization. Check with <code>MyClass.__mro__</code>. In practice, avoid complex multiple inheritance — use it for mixins (small, focused behavior additions)."
        ],
        ascii: `  # Inheritance — Real-World Pattern

  BaseOperator (Airflow's base)
       │
       │  has: execute(), retry_logic, logging
       │
       ├──── PythonOperator
       │     └── execute() → runs python_callable
       │
       ├──── BashOperator
       │     └── execute() → runs bash command
       │
       └──── MyCustomOperator  ← your code!
             └── execute() → your logic here

  # MRO — Method Resolution Order
  class D(B, C):   ← multiple inheritance
  MRO: D → B → C → A → object
  First match wins! 🎯`,
        code: [
          {
            label: "🏗️ Custom Airflow-style operator — inheritance in action",
            language: "python",
            code: `class BaseOperator:
    def __init__(self, task_id, retries=3):
        self.task_id = task_id
        self.retries = retries
        self.status = "pending"

    def execute(self, context):
        raise NotImplementedError("Subclasses must implement execute()")

    def run(self, context=None):
        for attempt in range(self.retries):
            try:
                self.status = "running"
                result = self.execute(context or {})
                self.status = "success"
                print(f"✅ {self.task_id}: completed")
                return result
            except Exception as e:
                print(f"⚠️ {self.task_id}: attempt {attempt+1} failed — {e}")
        self.status = "failed"

class APIExtractOperator(BaseOperator):
    def __init__(self, task_id, endpoint, **kwargs):
        super().__init__(task_id, **kwargs)  # 🎯 always call super!
        self.endpoint = endpoint

    def execute(self, context):
        print(f"  📡 Fetching from {self.endpoint}...")
        return {"data": [1, 2, 3], "count": 3}

class RedshiftLoadOperator(BaseOperator):
    def __init__(self, task_id, schema, table, **kwargs):
        super().__init__(task_id, **kwargs)
        self.schema = schema
        self.table = table

    def execute(self, context):
        print(f"  📥 Loading into {self.schema}.{self.table}...")
        return {"rows_inserted": 1500}

# Polymorphism — same .run(), different behavior
for task in [APIExtractOperator("extract", "/api/orders"),
             RedshiftLoadOperator("load", "analytics", "orders")]:
    task.run()`
          },
          {
            label: "🎨 Mixins — multiple inheritance done right",
            language: "python",
            code: `class LoggingMixin:
    def log(self, message, level="INFO"):
        print(f"[{level}] {self.__class__.__name__}: {message}")

class MetricsMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._metrics = {}

    def track(self, metric_name, value):
        self._metrics[metric_name] = value

class SmartOperator(LoggingMixin, MetricsMixin, BaseOperator):
    def __init__(self, task_id, **kwargs):
        super().__init__(task_id, **kwargs)

    def execute(self, context):
        self.log("Starting execution")       # from LoggingMixin
        self.track("start_time", "2024-01")  # from MetricsMixin
        return {"processed": 42}

op = SmartOperator("smart_task")
op.run()
print(SmartOperator.__mro__)  # check resolution order`
          }
        ],
        gotchas: [
          { title: "Forgetting super().__init__()", body: "Parent class doesn't initialize, stuff breaks silently. Always call super().__init__()." },
          { title: "Diamond problem", body: "With multiple inheritance, if two parents have the same method, MRO decides which runs. Use Class.__mro__ to check." },
          { title: "Deep inheritance hierarchies", body: "More than 3 levels deep usually means your design needs rethinking. Favor composition over inheritance." }
        ],
        de_relevance: "Inheritance is the foundation of every framework. <strong>Airflow</strong>: <code>BaseOperator → MyOperator</code>. <strong>Pydantic</strong>: <code>BaseModel → UserModel</code>. <strong>FastAPI</strong>: <code>BaseSettings → Settings</code>. <strong>SQLAlchemy</strong>: <code>Base → User</code>. Understanding inheritance means you can read framework source code and write custom operators properly.",
        quiz: [
          { q: "What does super() do?", options: ["Creates a class", "Calls parent method", "Makes static", "Deletes parent"], answer: 1, explanation: "super() gives access to the parent class — most commonly for calling parent's __init__." },
          { q: "MRO stands for:", options: ["Method Return Object", "Multiple Reference Order", "Method Resolution Order", "Module Run Order"], answer: 2, explanation: "Method Resolution Order — Python's algorithm for deciding which method to call." },
          { q: "Polymorphism means:", options: ["Multiple inheritance", "Same interface, different behavior", "Private methods", "Static typing"], answer: 1, explanation: "Same method name but each class does it differently. That's polymorphism!" }
        ],
        resources: [
          { label: "Python Docs — Inheritance", url: "https://docs.python.org/3/tutorial/classes.html#inheritance" },
          { label: "Real Python — Inheritance & Composition", url: "https://realpython.com/inheritance-composition-python/" }
        ]
      }
    },
    {
      id: "t11",
      name: "Dunder Methods",
      imp: "high",
      subtopics: ["__eq__/__lt__/__hash__", "__len__/__getitem__", "__enter__/__exit__", "__call__"],
      content: { locked: true }
    },
    {
      id: "t12",
      name: "Dataclasses & NamedTuples",
      imp: "high",
      subtopics: ["@dataclass decorator", "field() options", "frozen dataclasses", "dataclass vs namedtuple"],
      content: { locked: true }
    }
  ]
}
