// Import express from 'express'
const express = require('express');

// Cors
const cors = require('cors');

// Import db
const actionDB = require('./data/helpers/actionModel.js');
const projectDB = require('./data/helpers/projectModel.js');

// Create server
const server = express();

server.use(cors()); // Use cors to connect from react
server.use(express.json()); // middleware

/* const id = req.params.id;
const projectName = req.body.name;
const projectDesc = req.body.description;
const projectComp = req.body.completed;
const newProject = { projectName, projectDesc, projectComp };
const updateProject = { projectName, projectDesc, projectComp }; */

// Request / route handler
server.get('/', (req, res) => {
	res.send('<h1>Say Something!!</h1>');
});
// Start server
const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.log(`\n=== API running on port ${port} ===\n`);
});

// Projects
server.get('/api/projects', (req, res) => {
	projectDB
		.get()
		.then((projects) => {
			return res.status(200).json(projects);
		})
		.catch(() => {
			return res.status(500).json({ Error: 'No project listing.' });
		});
});

server.post('/api/projects', (req, res) => {
	const newProject = req.body;
	if (!newProject.name || !newProject.description) {
		return res
			.status(400)
			.send({ Error: 'Missing project name or project description.' });
	}

	projectDB
		.insert(newProject)
		.then((project) => {
			return res.status(201).json(project);
		})
		.catch(() => {
			return res.status(500).json({ Error: 'Error while saving project.' });
		});
});

server.delete('/api/projects/:id', (req, res) => {
	const id = req.params.id;

	if (!id) {
		return res
			.status(404)
			.json({ Error: `Cannot find a project with this id ${id}` });
	}

	projectDB
		.remove(id)
		.then((deleteProject) => {
			return res.status(200).json(deleteProject);
		})
		.catch(() => {
			return res.status(500).json({ Error: 'Cannot delete this project!' });
		});
});

server.put('/api/projects/:id', (req, res) => {
	const id = req.params.id;
	const updateProject = req.body;

	if (!id) {
		return response
			.status(404)
			.send({ Error: `Project with this ID ${id} is not found` });
	} else if (!updateProject.name || !updateProject.description) {
		return res.status(400).send({
			Error: 'Project name or description is missing please correct.',
		});
	}

	projectDB
		.update(id, updateProject)
		.then((project) => {
			return res.status(200).json(project);
		})
		.catch(() => {
			return res.status(500).json({ Error: 'Unable to update the project.' });
		});
});

// Action

server.get('/api/actions', (req, res) => {
	actionDB
		.get()
		.then((actions) => {
			return res.status(200).json(actions);
		})
		.catch(() => {
			return res.status(500).json({ Error: 'List of actions not found.' });
		});
});

server.get('/api/actions/:id', (req, res) => {
	const id = req.params.id;

	actionDB
		.get(id)
		.then((action) => {
			if (!action) {
				return res.status(404).json({ Error: 'Could not find action.' });
			} else return res.status(200).json(action);
		})
		.catch(() => {
			return res
				.status(500)
				.json({ Error: 'Unable to get action information.' });
		});
});

server.get('/api/projects/:id/actions', (req, res) => {
	const id = req.params.id;

	projectDB
		.getProjectActions(id)
		.then((action) => {
			if (!action) {
				return res
					.status(404)
					.json({ Error: 'Could not find action for this project.' });
			} else return res.status(200).json(action);
		})
		.catch(() => {
			return res
				.status(500)
				.json({ Error: 'Unable to get action information.' });
		});
});

server.post('/api/actions/', (req, res) => {
	/* const projectId = req.params.projectId; */
	const newAction = {
		project_id: req.body.project_id,
		description: req.body.description,
		notes: req.body.notes,
	};

	actionDB
		.insert(newAction)
		.then((action) => {
			return res.status(201).json(action);
		})
		.catch(() => {
			return res.status(500).json({ Error: 'Error while saving action.' });
		});
});

server.put('/api/actions/:id', (req, res) => {
	const id = req.params.id;
	const updateAction = req.body;
	actionDB
		.update(id, updateAction)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch(() => {
			res.status(500).json({ Error: 'Unable to update project.' });
		});
});

server.delete('/api/actions/:id', (req, res) => {
	const id = req.params.id;

	if (!id) {
		return res.status(404).json({ Error: 'This ID does not exist.' });
	}

	actionDB.remove(id).then((removeAction) => {
		return action.status(200).json({ Error: 'Cannot remove this action' });
	});
});
