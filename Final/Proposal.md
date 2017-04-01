# H1 **Simple Modeling environment**
I want to make a simple modeling environment for users to create complex 3D objects
from inital 2D shapes, extrution, rotation, translating, scaleing, concatinating, and
maybe as an ambitious goal subtracting the intersection of one object from another.

# H3 Weeks
1. Initial Layout

	a. Three lines representing X, Y, Z axes inside canvas
	
		i. Should be really easy
	
	b. HTML buttons for changing the operation
	
		i. Also easy, but will likely change throughout development
		
2. Draw simple polygons, extrude, and translate

	a. Two clicks for each of these

3. Selecting, rotating, and scaling whole or part of objects

	a. At least three clicks for latter two
	
	b. selecting
	
		i. single click for 1 surface/line/vertex
		ii. double click for object
		iii. drag - select all vertices inside resulting rect.
		
4. Concatenating objects

5. Copy Paste objects

# H3 Learn mouse events
1. Dragging
	
	a. Translation
	
	b. Rotation

2. Clicking

	a. Initial shape click to final shape click

	b. Buttons may be done with HTML5
	
	c. selecting elements in the environment 
		
		i. single to get vertex/line/polygon
		
		ii. double to get whole object

# H3 Ability
1. Draw polygons
2. Extrude polygons into objects
3. Rotate line/polygon/object
4. Scale
5. Translate each vertex/line/polygon/object
	
	a. Key press to align to a specific axis
6. concatenating objects
7. subtract intersecting objects
8. copy and past objects

# H3 Implementation
Probably web-based with Three.js.
