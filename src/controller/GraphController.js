const { base } = require('../data/graphData');
const minimumGraph = require('../controller/minimumGraph')
const findGraph = require('../controller/findGraph')


let idGraph = 1;

const graphController = {

    saveGraph(req, res) {
        let { data } = req.body;
        const error = data.findIndex((out) => {
            return out.source === out.target
        })

        try {

            if (error >= 0) {
                return res.status(404).json();
            }

            let save = {
                id: idGraph,
                data: data
            };

            base.push(save);
            idGraph++;

            return res.status(201).json(base);

        } catch (error) {}
    },

    recoverGraph(req, res) {
        const graphId = base.find(graph => graph.id === Number(req.params.graphId));

        try {

            if (!graphId) {
                return res.status(404).json();
            }

            return res.status(200).json(graphId);

        } catch (error) {}
    },

    findRouter(req, res) {
        const graphId = req.params.graphId;
        const town1 = req.params.town1;
        const town2 = req.params.town2;

        try {

            if (!findGraph(graphId, town1, town2)) {
                return res.status(404).json();
            }

            return res.status(200).json(findGraph(graphId, town1, town2));

        } catch (error) {}
    },

    minimumDistanceGraph(req, res) {
        const graphId = req.params.graphId;
        const town1 = req.params.town1;
        const town2 = req.params.town2;

        try {

            if (!minimumGraph(graphId, town1, town2)) {
                return res.status(404).json();
            }

            return res.status(200).json(minimumGraph(graphId, town1, town2));

        } catch (error) {}
    },
}

module.exports = graphController;