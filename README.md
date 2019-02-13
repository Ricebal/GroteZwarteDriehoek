# GroteZwarteDriehoek
A small AI simulation, Grote zwarte driehoek is Dutch for big black triangle, which is the main protagonist (or antagonist depending on how you look at it) of the simulation.

## Part 1: Steering
- An application with a GUI that displays the AI world.
- A world-class that updates itself and can be rendered on the screen. The view is in 2d (3d is allowed) from above.
- Abstract classes BaseGameEntity and MovingEntity based on the C++-code from Buckland.
- Create one concrete subclass of MovingEntity. You may choose your own character (superhero, dragon,
   frog, car, wizard, student, etc..) that fits your theme.
- Implement the necessary steering-classes and Vector2D needed to implement at least two simple
  steering behaviour of choice from: 
  - Seek
  - Flee
  - Arrive
  - Wander
- Implement another more advanced steering behaviour of choice from:
  - Leader following
  - Flocking
  - Obstacle avoidance
  - Hide

## Part 2: Graphs
Extend your simulation with the following graph structure:
- A graph, Node and Edge class.
- A new class deriving from BaseGameEntity for a static object, like a build, tree, lake etc.
- Place a number of these objects in your simulation.
- Create a method in you World class that generates an underlying graph for you game world, considering the
  obstacles.
- The underlying graph can be made visible or invisible through a keypress or button.
- Implement the A* algorithm with a suitable heuristic.
- If you click somewhere in the world your character should be able to move there.
- (Extra) Implement smooth pathfinding.

## Part 3: Behavour
Extend your simulation with behaviour and decision making.
- Create and implement the abstract class Goal and it's subclass CompositeGoal.
- Implement one atomic goal using a simple steering behaviour like seek or wander.
- Let one of your MovingEntity-classes have this goal-driven behaviour.
- Design the behaviour for one of your game agents. Think of at least three different strategy-level goals.
- At think-level one of these goals is chosen randomly or through an algorithm.
- The goals of your agent can be shown and hidden on the screen by pushing a particular key or button.
