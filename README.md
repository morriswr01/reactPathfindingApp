# React Pathfinding Visualisation Tool
Pathfinding visualisation web app built in React and Javascript for the purpose of learning the basics of the Context API and TypeScript. Features include:
* Animated display of both A* and Dijkstras pathfinding algorithms to find a path from Red to Green.
* Click and drag start or finish nodes to move them.
* Hold down, or click on nodes to turn them into walls. Walls cannot be passed through by the pathfinding algorithms and must find a way round.
* Play, pause and reset buttons to allow incremental progression through the pathfinding process.
* Can adjust the animation speed before running algorithm.
* Reset walls button so that the path find can be reset without the walls being reset(eg if you want to run Dijkstras and then A* on the same config of walls).

<img width="500" alt="a" src="https://user-images.githubusercontent.com/19209657/90011204-15149980-dc99-11ea-9e3a-86635e77e2c0.PNG">

## How it works
Context API holds a global state containing: the selected algorithm; timeInterval to determine the animation speed, position of start and end node and the grid itself. The grid contains a 21 * 21 grid of nodes which contain all the information needed to conduct pathfinding. This information is the coordinate of the node given by colID and rowID, distance - the current distance from the start node, previousNode which is the previous node taken to get to this node, and various boolean values to determine if the node has been visited, whether it is a wall, or if it is on the current optimal path.

This state can be mutated by methods also in the Provider which can be called from the React components. For example if a mouseDown event occurs on one of the non start/finish nodes then updateItem() will be called to set node at (colID, rowID) in the grid to have a isWall value of true. React will then update this node as its props have now been changed and the node will appear black to indicate that it is a wall. This process is the same for many other interactions within the application.

When the user selects the play button the selected algorithm is run in its entirety. The AStar or Dijkstra classes then return two arrays of nodes, visitedNodes and shortestPath. The visitedNodes are in the order in which they are visited when the algorithm is run so they are displayed one at a time to show the algorithms progression along with the current distance they are away from start node. The same is then done with the shortest path array and the Context API grid state is then updated to show the algorithms selected path to the finish node. It is done this way because if nodes were to be updated as the algorithm was running in real time, the application would be extremely choppy and unresponsive due to the frequency of react updates that are being done. This is still an issue as the user increased the animation speed you will notice the animation is still choppy however I have not yet worked out a way to incrementally show the animation without separating the CSS styling update from the React update. Of course the DOM CSS styling can be updated almost instantly but the React update to update the grid state takes about 30ms each. Separating these two I feared would make the code far less neat as there are multiple effects for each increment of the algorithm. One option for this would be to update the CSS of the DOM grid to show the visited and path nodes and then update the Context API grid at the end(this will be on my to-do list).

The animation portion of the application is done by scheduling updates to the grid to happen at some time in the future. This is done using the setTimeout() function in Javascript. Once the animation speed has been set using the slider this is a time interval that can be used to schedule each node in the visitedNodes to be animated. E.g the first node will be delayed by 1*50ms, the second by 2*50ms etc. This gives the incremental progression animation we are looking for. For each node to be animated, its setTimeout() ID is saved so that if the user chooses to pause or reset the animation, the application can call clearTimeout() on the ID.

The lag issue discovered when running the animation quickly was also an issue when the user holds down and hovers over with their mouse too many walls at once. This again makes the application feel unresponsive and sometimes even missed some of the nodes that should be set to walls. To get around this the CSS animation and Context API state update are separated from eachother in a similiar way to how is described above. Every node moused over is instantly set to black and its coordinates are saved in a local array. Then once the user mouses up, this array of nodes have their isWall variable set to true in the Context API grid state in a single update rather than one for every mouse event. The resulting mouseing over nodes has a much smoother transition to walls and none of the nodes that the user hits are missed.

### Algorithms Used

#### Dijkstras
The idea of Dijkstras is to start at the start node and progressively work outwards in all directions until the finish node is reached or no more nodes are accessible. In the beginning all nodes have a distance of infinity from the start node except the start node itself which has a distance of 0. Its neighbours are then discovered and visited as the next closest nodes to the start node. This cycle repeats with these nodes and their neighbours are considered and so on. If the algorithm hits a wall it is ignored and if a shorter path is found to a node that has already been discovered its distance is updated. For each node discovered, the node it came from is stored in previousNode. That way, at the end of the algorithm the finishNodes previousNodes now trace back to the start using the shortest path. This is how the shortestPath array passed back to React is traced.

#### A*
A* uses a similiar process however instead of using smallest distance from the start node as a metric of node priority it uses this distance summed up with a heuristic to give the node a score. This heuristic is some data about the node that gives a prediction about how close we are to the finish node. In this case Manhattan Distance is used as we are using a grid. The algorithm knows the position of the finish node so the manhattan distance of the node can be calculated and added to the start node distance used in Dijkstras to give a score. E.g if the start node is on the left of the finish node and they are in the same column, if two nodes left and right of the start node are equidistant from it then the right node will be chosen as its manhattan distance to the finish node is smaller and thus its total score is lower. In this way A* is a less naive method of finding the finish node as it needs to consider less nodes to find the finish node but in doing this it may not always find the most optimal path like Dijkstras might. This is because the manhattan distance ignores things like walls.

## Screenshots of Certain Features
A* With Walls(Discovers much less of the grid): <br>
<img width="961" alt="a" src="https://user-images.githubusercontent.com/19209657/90011204-15149980-dc99-11ea-9e3a-86635e77e2c0.PNG"><br>
Dijkstras With Walls(Discovers much more of the grid): <br>
<img width="958" alt="Dijkstras" src="https://user-images.githubusercontent.com/19209657/90011121-f2828080-dc98-11ea-9f71-b533cf8f7f88.PNG"><br>
A*:<br>
<img width="716" alt="aStarbasic" src="https://user-images.githubusercontent.com/19209657/90010940-a20b2300-dc98-11ea-9ec6-83194fc192f5.PNG"><br>
Dijkstras:<br>
<img width="737" alt="dijkstrasBasic" src="https://user-images.githubusercontent.com/19209657/90010948-a3d4e680-dc98-11ea-8eb2-f8c2cbd1ff62.PNG"><br>

## Lessons Learnt
* Reacts Context API had a familiar architecture as I have used Redux numerous times before and the idea of wrapping components in a wrapper to provide global state and variables to them was familiar. However Context API for the purposes of this project was a much more lightweight tool as it allowed a single file to contain the state itself as well as the methods to mutate this state. I'm sure this is possible in Redux too but my experience in larger projects tells me that for simple projects the concept of types, actions, reducers and stores was just too convoluted. Thus Context API was the perfect alternative.

## Future Developments
* Fix the spam of React state updates done when displaying the algorithm animation. See discussion of this in "How it was done".
* Research and apply automated unit testing.
* Deploy to a production server.

## Technologies Used:
* Node.JS(Lots of Experience)
* React.JS(Context API, Hooks) (Had plenty of experience with React but had not explored Context API before)
* Typescript(Completely new to me before project)

## Resources Used:
* Inspiration:
** https://baeharam.github.io/Pathfinding-Visualizer/
** https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial
** https://clementmihailescu.github.io/Pathfinding-Visualizer/
** Devon Crawford on Youtube https://www.youtube.com/watch?v=1-YPj5Vt0oQ

* Misc
** https://medium.com/@mr.anmolsehgal/heap-vs-priority-queues-vs-queues-b03398312c87
** https://daveceddia.com/context-api-vs-redux/


In the project directory, you can run:

### `npm start`
Starts localhost server.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
