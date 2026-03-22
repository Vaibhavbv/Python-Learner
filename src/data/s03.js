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
      subtopics: ["__init__/__repr__/__str__", "instance vs class vars", "self keyword", "object lifecycles"],
      content: {
        locked: false,
        vibe: "Classes 🏗️ — every game character, user account, and YouTube video is an object. OOP models the world.",
        explanation: [
          "A **Class** is a blueprint. An **Object** is a specific thing built from that blueprint. A cookie-cutter is the class, the cookie is the object. <code>class Player:</code> defines what a player can do, <code>p1 = Player()</code> spawns a specific player.",
          "<code>__init__</code> runs automatically when the object is spawned (it 'initializes' it).",
          "<code>self</code> just means 'this specific object right here'. If you have 10 players, <code>self.health</code> checks the health of whichever player is currently being looked at.",
          "<strong>Instance variables</strong> (<code>self.name</code>) belong to ONE object. <strong>Class variables</strong> belong to ALL objects created from that class. Mixing them up leads to players sharing inventories."
        ],
        ascii: `  # Class (Blueprint) → Object (Instance)

  ┌─────────────────────────────┐
  │  class Player:              │ ← Blueprint
  │    total_players = 0        │ ← Class Variable (Shared)
  │                             │
  │    def __init__(self, name):│
  │      self.name = name       │ ← Instance Var (Unique)
  │      self.hp = 100          │
  └─────────────────────────────┘
          │             │
      ┌───┘             └───┐
      ▼                     ▼
  ┌────────────┐      ┌────────────┐
  │ Object #1  │      │ Object #2  │
  │ name="Ash" │      │ name="Gary"│
  │ hp=100     │      │ hp=100     │
  └────────────┘      └────────────┘`,
        code: [
          {
            label: "👾 Pokemon Battle System — OOP in action",
            language: "python",
            code: `class Pokemon:
    # __init__ sets up the pokemon when it's caught/spawned
    def __init__(self, name, type, hp, attack_power):
        self.name = name               # Instance variable
        self.type = type
        self.hp = hp
        self.attack_power = attack_power

    # A method (a function that belongs to this class)
    def attack(self, target):
        print(f"⚡ {self.name} attacks {target.name} for {self.attack_power} damage!")
        target.hp -= self.attack_power
        if target.hp <= 0:
            print(f"💀 {target.name} fainted!")

    # __str__ controls how the object looks when you print() it
    def __str__(self):
        return f"[{self.name} | HP: {self.hp} | {self.type}]"

# Spawning objects (instantiation)
pikachu = Pokemon("Pikachu", "Electric", hp=100, attack_power=25)
charizard = Pokemon("Charizard", "Fire", hp=150, attack_power=40)

print(pikachu)       # [Pikachu | HP: 100 | Electric]

# Using methods
pikachu.attack(charizard)  # ⚡ Pikachu attacks Charizard for 25 damage!
charizard.attack(pikachu)  # ⚡ Charizard attacks Pikachu for 40 damage!
charizard.attack(pikachu)  # ⚡ Charizard attacks Pikachu for 40 damage!`
          }
        ],
        gotchas: [
          { title: "Forgetting the 'self' argument", body: "Every method inside a class MUST have `self` as the first parameter. `def attack(target):` will crash. It must be `def attack(self, target):`" },
          { title: "Mutable class variables", body: "If you define `inventory = []` directly under the class (not inside __init__), EVERY object shares the exact same inventory list." }
        ],
        real_world: "When developers build Spotify, a Song isn't just a bunch of random variables floating around. They build a `class Song:` that bundles the `title`, `duration`, `file_url`, and `album_art` together. Then they add methods like `song.play()` or `song.pause()`. OOP groups data and the actions you can perform on that data into one neat package.",
        quiz: [
          { q: "What does `self` refer to?", options: ["The class itself", "The current instance object", "The parent class", "Nothing"], answer: 1, explanation: "self refers to the specific instance currently being used." }
        ],
        resources: []
      }
    },
    {
      id: "t10",
      name: "Inheritance & Polymorphism",
      imp: "must",
      subtopics: ["single & multiple inheritance", "super()", "method overriding", "MRO"],
      content: {
        locked: false,
        vibe: "Inheritance 🧬 — every game engine UI uses it. A Button is a Widget. A Dog is an Animal. It just clicks.",
        explanation: [
          "<strong>Inheritance</strong> is saying: 'I want this new class to have everything that other class has, plus a few extra things.' It stops you from rewriting the same code.",
          "<code>super()</code> is how the child talks to the parent. Commonly used in <code>__init__</code>: 'Hey parent, do your setup stuff first, then I will do my specific setup stuff.'",
          "<strong>Polymorphism</strong> (method overriding) means you can have a parent class with an <code>.attack()</code> method, but the child class can completely write its own custom <code>.attack()</code> method that overrides the parent's.",
          "MRO (Method Resolution Order) only matters if you inherit from MULTIPLE parents. It's the order Python checks parents to find a method."
        ],
        ascii: `  # Inheritance Tree

           [ Animal ]
           (has: sleep(), eat())
              │
      ┌───────┴───────┐
      │               │
  [ Dog ]         [ Cat ]
  bark()          meow()
  eat() <-- override!`,
        code: [
          {
            label: "🎮 Game Enemies — inheriting base behaviors",
            language: "python",
            code: `class Enemy:
    def __init__(self, hp):
        self.hp = hp
        self.is_alive = True

    def take_damage(self, amount):
        self.hp -= amount
        if self.hp <= 0:
            self.die()

    def die(self):
        self.is_alive = False
        print("Enemy died with a standard death sound.")

# Zombie inherits from Enemy! Gets take_damage() for free.
class Zombie(Enemy):
    def __init__(self):
        super().__init__(hp=50) # Call parent setup!

    # Method Overriding (Polymorphism)
    def die(self):
        self.is_alive = False
        print("Zombie groans and drops Rotten Flesh! 🧟")

# Boss inherits from Enemy!
class Boss(Enemy):
    def __init__(self):
        super().__init__(hp=1000)
    
    # Boss has a second phase instead of dying immediately
    def die(self):
        print("FOOLS! This isn't even my final form! 🐉")
        self.hp = 1000

mob1 = Zombie()
mob1.take_damage(60) # Zombie groans and drops Rotten Flesh! 🧟

boss = Boss()
boss.take_damage(1000) # FOOLS! This isn't even my final form! 🐉`
          }
        ],
        gotchas: [
          { title: "Forgetting super().__init__()", body: "If you don't call super() in the child's __init__, the parent's __init__ never runs, and the child won't have the parent's instance variables." }
        ],
        real_world: "In web development frameworks like Django or React, nobody writes a Web Page from scratch. Codebases provide a base `class View:` or `class Component:`. You create your specific page by inheriting from it (`class HomePage(Component):`). You get rendering, routing, and lifecycle events absolutely free, and you just fill in what text should show up on screen.",
        quiz: [
          { q: "What does super() do?", options: ["Creates a super class", "Calls parent method", "Deletes parent obj", "Makes it fast"], answer: 1, explanation: "super() accesses the parent class — usually so you can run the parent's setup method." }
        ],
        resources: []
      }
    },
    {
      id: "t11",
      name: "Dunder Methods",
      imp: "high",
      subtopics: ["__eq__/__lt__", "__len__/__getitem__", "__enter__/__exit__", "__call__"],
      content: { locked: true }
    },
    {
      id: "t12",
      name: "Dataclasses",
      imp: "high",
      subtopics: ["@dataclass", "field()", "frozen", "vs namedtuple"],
      content: { locked: true }
    }
  ]
}
