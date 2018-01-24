var faceStatus = {}

vertexToFaceReference = (geometry) => {
	var vertexToFace = [];
	for (var fx = 0; fx < geometry.vertices.length; fx++) {
		vertexToFace[fx] = new Array();
	}
	for (var fx = 0; fx < geometry.faces.length; fx++) {
		var f = geometry.faces[fx];
		vertexToFace[f.a].push(fx);
		vertexToFace[f.b].push(fx);
		vertexToFace[f.c].push(fx);
	}
	return vertexToFace
}

neighboursFromFace = (face) => {
	return vertexToFace[face.a].concat(vertexToFace[face.b]).concat(vertexToFace[face.c])
}

findAllNeighborsForFace = (face) => {
	const cluster = [face]
	var i = 0
	do {
		const neighbours = neighboursFromFace(cluster[i])
		for (n in neighbours) {
			if (faceStatus[neighbours[n]] && faceStatus[neighbours[n]] === 1 && !cluster.includes(geometry.faces[neighbours[n]])) {
				cluster.push(geometry.faces[neighbours[n]])
			}
		}
		i++
	} while (i < cluster.length)
	return cluster
}

// ----- draw -----

drawNeighbours = (geometry, face, color) => {
  const neighbours = neighboursFromFace(face)
  for (var i = 0; i < neighbours.length; i++) {
    geometry.faces[neighbours[i]].color.setHex(color);
    faceStatus[neighbours[i]] = 1
  }
}

drawApplicationClusters = (geometry, color) => {
  for (var key in faceStatus) {
    if (faceStatus.hasOwnProperty(key)) {
      geometry.faces[key].color.setHex(color);
    }
  }
	geometry.colorsNeedUpdate = true
}
