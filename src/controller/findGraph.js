const { base } = require('../data/graphData');


function findGraph(ID, S, D) {

    const graphId = base.find(graphId => graphId.id === Number(ID))

    if (!graphId) {
        return false
    }
    const town1 = graphId.data.find(graphS => graphS.source === S)

    if (!town1) {
        return false
    }

    const town2 = graphId.data.find(graphT => graphT.target === D)

    if (!town2) {
        return false
    }

    const routes = {
        routes: []
    }

    const ss = []

    /*function convert number to letter and letter to number*/

    function numberToLetter(number) {
        let char_A = Number(number);

        return String.fromCharCode(char_A + 65)

    }

    function letterTonumber(letter) {
        const num_1 = letter;
        return num_1.charCodeAt(0) - 65;
    }

    /*end of function*/

    const dataAdj = [];

    for (let x of graphId.data) {
        dataAdj.push(x.source)
        dataAdj.push(x.target)
    }

    dataAdj.sort(function(a, b) {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    })

    const zeroRep = [...new Set(dataAdj)]

    const graph = new Map();

    let vGuard = []

    //=======================================//

    let matriz = [];

    for (let i = 0; i < zeroRep.length; i++) {
        matriz[i] = [];
        for (let j = 0; j < zeroRep.length; j++) {
            matriz[i][j] = 0;
        }
    }

    const m = zeroRep.length;
    const n = zeroRep.length;

    //=======================================//

    for (let va of graphId.data) {
        if (letterTonumber(va.source) > 0) {
            matriz[letterTonumber(va.source)][letterTonumber(va.target)] = va.distance
        }

        if (letterTonumber(va.target) > 0) {
            matriz[letterTonumber(va.source)][letterTonumber(va.target)] = va.distance
        }
    }

    //=======================================//

    let v;

    let adjList;

    let distance;

    function Graph(vertices) {
        v = vertices;
        initAdjList();
    }

    //=======================================//

    function initAdjList() {
        adjList = new Array(v);
        distance = new Array(v)
        for (let i = 0; i < v; i++) {
            adjList[i] = [];
            distance[i] = []
        }
    }

    //=======================================//

    function addEdge(u, v, di) {
        adjList[letterTonumber(u)].push(letterTonumber(v));
        distance[letterTonumber(u)].push(di);
    }

    //=======================================//

    function printAllPaths(s, d) {
        let isVisited = new Array(v);
        for (let i = 0; i < v; i++)
            isVisited[i] = false;
        let pathList = [];

        pathList.push(s);

        printAllPathsUtil(s, d, isVisited, pathList);

    }

    //=======================================//

    let rr = []

    function printAllPathsUtil(u, d, isVisited, localPathList) {

        if (u == (d)) {
            const entries = Object.values(localPathList)
            rr.push(entries)

        }

        isVisited[u] = true;

        for (let i = 0; i < adjList[u].length; i++) {
            if (!isVisited[adjList[u][i]]) {
                localPathList.push(adjList[u][i]);
                printAllPathsUtil(adjList[u][i], d,
                    isVisited, localPathList);
                localPathList.splice(localPathList.indexOf(adjList[u][i]), 1);
            }
        }
        isVisited[u] = false;

    }

    //=======================================//

    Graph(zeroRep.length);
    for (let x of graphId.data) {
        addEdge(x.source, x.target, x.distance);
    }

    let s = letterTonumber(S);

    let d = letterTonumber(D);

    printAllPaths(s, d);

    //=======================================//

    function editado(value) {
        return rr.join(' ')
    }

    for (let x of rr) {
        let rs = ""

        for (let i = 0; i < x.length; i++) {
            rs += numberToLetter(x[i])
        }

        let y = {
            'router': rs,
            'stops': rs.length - 1
        }
        routes.routes.push(y)
    }

    let soma = []

    let sa = 0;

    for (let xA of routes.routes) {
        for (let xB = 0; xB < xA.router.length; xB++) {
            for (let xC of graphId.data) {
                for (let xD of xC.source) {
                    for (let xE of xC.target) {
                        if (xA.router[xB] === xD) {
                            if (xA.router[xB + 1] === xE) {
                                sa += Number(xC.distance)
                            }
                        }
                    }
                }
            }
        }
        soma.push(sa)
        sa = 0
    }

    var min = soma.map(Number).reduce(function(a, b) {
        return Math.min(a, b);
    });

    const ind = soma.indexOf(min)


    let letras = []

    for (let x of routes.routes) {

        for (let a of x.router) {
            letras.push(a)
        }
    }

    const graphMin = {
        "distance": min,
        "path": letras
    }

    return routes



}


module.exports = findGraph;