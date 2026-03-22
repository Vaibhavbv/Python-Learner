const L = { locked: true }

export const s04 = {
  id:"s04",num:"04",title:"Functional Programming",badge:"high",
  topics:[
    {id:"t13",name:"Iterators & Generators",imp:"must",subtopics:["__iter__/__next__","yield keyword","generator expressions","itertools"],content:L},
    {id:"t14",name:"Decorators",imp:"must",subtopics:["function decorators","@wraps","decorator with args","class decorators"],content:L},
    {id:"t15",name:"Lambda, map, filter, reduce",imp:"high",subtopics:["lambda syntax","map() & filter()","functools.reduce()","when to use vs comprehensions"],content:L},
    {id:"t16",name:"Closures",imp:"high",subtopics:["free variables","nonlocal keyword","closure use cases","closures vs classes"],content:L},
  ]
}

export const s05 = {
  id:"s05",num:"05",title:"Error Handling & Logging",badge:"must",
  topics:[
    {id:"t17",name:"Exceptions",imp:"must",subtopics:["try/except/finally","custom exceptions","exception chaining","exception hierarchy"],content:L},
    {id:"t18",name:"Context Managers",imp:"high",subtopics:["with statement","__enter__/__exit__","contextlib","resource management"],content:L},
    {id:"t19",name:"Logging Module",imp:"must",subtopics:["logging levels","handlers & formatters","structured logging","log rotation"],content:L},
    {id:"t20",name:"Assertions & Debugging",imp:"high",subtopics:["assert statement","pdb debugger","breakpoint()","debugging strategies"],content:L},
  ]
}

export const s06 = {
  id:"s06",num:"06",title:"File I/O & Serialization",badge:"must",
  topics:[
    {id:"t21",name:"File Operations",imp:"must",subtopics:["open/read/write","pathlib","binary files","file encodings"],content:L},
    {id:"t22",name:"JSON & CSV",imp:"must",subtopics:["json.loads/dumps","csv.reader/DictReader","json schema validation","streaming large files"],content:L},
    {id:"t23",name:"Pickle & Shelve",imp:"med",subtopics:["serialization basics","pickle protocol","shelve for persistent dicts","security warnings"],content:L},
    {id:"t24",name:"YAML & TOML",imp:"med",subtopics:["PyYAML","tomllib (3.11+)","config file patterns","YAML vs TOML vs JSON"],content:L},
  ]
}

export const s07 = {
  id:"s07",num:"07",title:"Modules, Packages & Environments",badge:"must",
  topics:[
    {id:"t25",name:"Module System",imp:"must",subtopics:["import mechanics","__name__ == '__main__'","relative imports","circular imports"],content:L},
    {id:"t26",name:"Package Management",imp:"must",subtopics:["pip","requirements.txt","pyproject.toml","dependency resolution"],content:L},
    {id:"t27",name:"venv & Poetry",imp:"must",subtopics:["virtual environments","poetry basics","lock files","dependency groups"],content:L},
    {id:"t28",name:"Standard Library Essentials",imp:"high",subtopics:["os/sys/pathlib","datetime/time","copy/deepcopy","dataclasses"],content:L},
  ]
}

export const s08 = {
  id:"s08",num:"08",title:"Concurrency & Parallelism",badge:"high",
  topics:[
    {id:"t29",name:"Threading",imp:"high",subtopics:["Thread class","GIL explained","thread safety","locks & semaphores"],content:L},
    {id:"t30",name:"Multiprocessing",imp:"high",subtopics:["Process class","Pool & map","shared memory","IPC patterns"],content:L},
    {id:"t31",name:"AsyncIO",imp:"must",subtopics:["async/await syntax","event loop","aiohttp","async generators"],content:L},
    {id:"t32",name:"Task Queues",imp:"med",subtopics:["Celery basics","Redis as broker","task chaining","monitoring"],content:L},
  ]
}

export const s09 = {
  id:"s09",num:"09",title:"Testing",badge:"must",
  topics:[
    {id:"t33",name:"pytest",imp:"must",subtopics:["test discovery","fixtures","parametrize","conftest.py"],content:L},
    {id:"t34",name:"Mocking",imp:"must",subtopics:["unittest.mock","patch decorator","MagicMock","side_effect"],content:L},
    {id:"t35",name:"Test Design",imp:"high",subtopics:["test pyramid","integration tests","test coverage","TDD workflow"],content:L},
    {id:"t36",name:"Property-Based Testing",imp:"low",subtopics:["Hypothesis library","strategies","stateful testing","shrinking"],content:L},
  ]
}

export const s10 = {
  id:"s10",num:"10",title:"Data Engineering Libraries",badge:"must",
  topics:[
    {id:"t37",name:"Pandas",imp:"must",subtopics:["DataFrame basics","groupby/merge/pivot","performance tips","method chaining"],content:L},
    {id:"t38",name:"NumPy",imp:"high",subtopics:["ndarray basics","vectorization","broadcasting","memory layout"],content:L},
    {id:"t39",name:"SQLAlchemy",imp:"high",subtopics:["Core vs ORM","engine & sessions","query building","migrations"],content:L},
    {id:"t40",name:"Pydantic",imp:"must",subtopics:["BaseModel","validators","serialization","settings management"],content:L},
  ]
}

export const s11 = {
  id:"s11",num:"11",title:"APIs & Networking",badge:"high",
  topics:[
    {id:"t41",name:"HTTP with requests/httpx",imp:"must",subtopics:["GET/POST/PUT","sessions","async requests","retry patterns"],content:L},
    {id:"t42",name:"FastAPI / Flask",imp:"high",subtopics:["routing","dependency injection","middleware","OpenAPI docs"],content:L},
    {id:"t43",name:"Web Scraping",imp:"med",subtopics:["BeautifulSoup","Scrapy","rate limiting","legal considerations"],content:L},
    {id:"t44",name:"gRPC & WebSockets",imp:"med",subtopics:["protobuf","gRPC services","WebSocket protocol","real-time data"],content:L},
  ]
}

export const s12 = {
  id:"s12",num:"12",title:"Performance & Optimization",badge:"high",
  topics:[
    {id:"t45",name:"Profiling",imp:"high",subtopics:["cProfile","line_profiler","memory_profiler","py-spy"],content:L},
    {id:"t46",name:"Algorithm Complexity",imp:"must",subtopics:["Big-O notation","time vs space","common patterns","amortized analysis"],content:L},
    {id:"t47",name:"Caching",imp:"high",subtopics:["functools.lru_cache","Redis caching","cache invalidation","TTL strategies"],content:L},
    {id:"t48",name:"Cython & Extensions",imp:"low",subtopics:["Cython basics","C extensions","ctypes/cffi","performance gains"],content:L},
  ]
}

export const s13 = {
  id:"s13",num:"13",title:"Type System & Code Quality",badge:"high",
  topics:[
    {id:"t49",name:"Type Hints",imp:"must",subtopics:["basic annotations","generics","Optional/Union","Protocol"],content:L},
    {id:"t50",name:"mypy / pyright",imp:"high",subtopics:["static analysis","config options","strict mode","gradual typing"],content:L},
    {id:"t51",name:"Code Formatting",imp:"must",subtopics:["black/ruff","isort","pre-commit hooks","EditorConfig"],content:L},
    {id:"t52",name:"Design Patterns",imp:"high",subtopics:["factory/singleton","strategy/observer","repository pattern","dependency injection"],content:L},
  ]
}

export const s14 = {
  id:"s14",num:"14",title:"CLI & Scripting",badge:"med",
  topics:[
    {id:"t53",name:"argparse / click / typer",imp:"high",subtopics:["argument parsing","click groups","typer autocomplete","help generation"],content:L},
    {id:"t54",name:"subprocess & os",imp:"high",subtopics:["subprocess.run","shell commands","environment vars","os.path vs pathlib"],content:L},
    {id:"t55",name:"Task Automation",imp:"med",subtopics:["invoke/fabric","Makefile","cron jobs","watchdog"],content:L},
    {id:"t56",name:"Packaging & Distribution",imp:"med",subtopics:["setup.py/pyproject.toml","wheel/sdist","publishing to PyPI","entry_points"],content:L},
  ]
}

export const s15 = {
  id:"s15",num:"15",title:"Advanced Python Internals",badge:"low",
  topics:[
    {id:"t57",name:"Metaclasses",imp:"low",subtopics:["type() as metaclass","__new__ vs __init__","metaclass use cases","ABC module"],content:L},
    {id:"t58",name:"Descriptors",imp:"low",subtopics:["__get__/__set__/__delete__","property as descriptor","data vs non-data","descriptor protocol"],content:L},
    {id:"t59",name:"Memory Model",imp:"med",subtopics:["reference counting","garbage collection","weak references","memory leaks"],content:L},
    {id:"t60",name:"CPython Internals",imp:"low",subtopics:["bytecode & dis","PyObject struct","GIL deep dive","PEP process"],content:L},
  ]
}
