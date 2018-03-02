export default function all() {
DataModel.prototype = {};
DataModel.prototype.constructor = DataModel;
function DataModel() {
		Object.apply(this);
		this.id = "";
		this.type = "DataModel"
}
DataModel.prototype.destroy = function () {
		delete this.type;
		delete this.id
};
DataModel.prototype.setType = function (a) {
		this.type = a
};
DataModel.prototype.getType = function () {
		return this.type
};
DataModel.prototype.toString = function () {};
DataModel.prototype.getName = function () {
		return this.id
};
List.prototype = new DataModel;
List.prototype.constructor = List;
function List() {
		DataModel.apply(this);
		var a = [],
				b;
		for (b = 0; b < arguments.length; b++)
				a.push(arguments[b]);
		return a = List.fromArray(a)
}
List.fromArray = function (a) {
		a.type = "List";
		a.id = a.id || "";
		a.getImproved = List.prototype.getImproved;
		a.getTypeOfElements = List.prototype.getTypeOfElements;
		a.setType = List.prototype.setType;
		a.getType = List.prototype.getType;
		a.setArray = List.prototype.setArray;
		a.pushIfUnique = List.prototype.pushIfUnique;
		a.getWithoutRepetitions = List.prototype.getWithoutRepetitions;
		a.getElementsRepetitionCount = List.prototype.getElementsRepetitionCount;
		a.getMin = List.prototype.getMin;
		a.getMax = List.prototype.getMax;
		a.add = List.prototype.add;
		a.multiply = List.prototype.multiply;
		a.getSubList = List.prototype.getSubList;
		a.getSubListByIndexes = List.prototype.getSubListByIndexes;
		a.getElementNumberOfOccurrences = List.prototype.getElementNumberOfOccurrences;
		a.sortIndexed = List.prototype.sortIndexed;
		a.sortNumericIndexed = List.prototype.sortNumericIndexed;
		a.sortNumeric = List.prototype.sortNumeric;
		a.sortNumericIndexedDescending = List.prototype.sortNumericIndexedDescending;
		a.sortNumericDescending = List.prototype.sortNumericDescending;
		a.sortOnIndexes = List.prototype.sortOnIndexes;
		a.reverse = List.prototype.reverse;
		a.toNumberList = List.prototype.toNumberList;
		a.toStringList = List.prototype.toStringList;
		a._splice = Array.prototype.splice;
		a.splice = List.prototype.splice;
		a.clone = List.prototype.clone;
		a.toString = List.prototype.toString;
		a.getNames = List.prototype.getNames;
		a._constructor = List;
		a.removeElement = List.prototype.removeElement;
		a.removeElements = List.prototype.removeElements;
		a.removeElementsByIndexes = List.prototype.removeElementsByIndexes;
		return a
};
List.prototype.getImproved = function () {
		if (this.length == 0)
				return this;
		var a = this.getTypeOfElements();
		if (a == "" || a == "undefined")
				return this;
		switch (a) {
				case "number":
						var b = NumberList.fromArray(this);
						break;
				case "string":
						b = StringList.fromArray(this);
						break;
				case "Rectangle":
						return this;
				case "Date":
						b = DateList.fromArray(this);
						break;
				case "List":
				case "Table":
						b = Table.fromArray(this);
						break;
				case "NumberList":
						b = NumberTable.fromArray(this)
		}
		return b != null
				? (b.id = this.id, b)
				: this
};
List.prototype.getTypeOfElements = function () {
		var a = typeOf(this[0]),
				b;
		for (b = 1; this[b] != null; b++)
				if (typeOf(this[b]) != a)
						return "";
return a
};
List.prototype.toString = function () {
		var a,
				b = "[";
		for (a = 0; a < this.length - 1; a++)
				b += this[a] + ", ";
		b += this[this.length - 1] + "]";
		return b
};
List.prototype.getNames = function () {
		var a = new StringList;
		for (i = 0; this[i] != null; i++)
				a[i] = this[i].id;
		return a
};
List.prototype.splice = function () {
		var a = this
				._splice
				.apply(this, arguments);
		try {
				return eval(this.type).fromArray(a)
		} catch (b) {
				return a
		}
};
List.prototype.reverse = function () {
		for (var a = instantiateWithSameType(this), b = 0; this[b] != null; b++)
				a.unshift(this[b]);
		return a
};
List.prototype.getSubList = function (a) {
		var a = new Interval(Math.max(Math.min(Math.floor(a.x), this.length), 0), Math.max(Math.min(Math.floor(a.y), this.length), 0)),
				b = this.type == "List" || this.type == "Table"
						? new List
						: instantiate(typeOf(this)),
				d;
		for (d = a.x; d <= a.y; d++)
				b.push(this[d]);
		b.id = this.id;
		return this.type == "List" || this.type == "Table"
				? b.getImproved()
				: b
};
List.prototype.getSubListByIndexes = function (a) {
		if (this.length < 1)
				return this;
		var b = this.type == "List"
				? new List
				: instantiate(typeOf(this));
		if (a.length == 0)
				return b;
		b.id = this.id;
		var d = this.length,
				e = a.length,
				f;
		for (f = 0; f < e; f++)
				a[f] < d && b.push(this[a[f]]);
		return this.type == "List"
				? b.getImproved()
				: b
};
List.prototype.getElementNumberOfOccurrences = function (a) {
		var b = 0,
				d;
		for (d = this.indexOf(a, 0); d > -1;)
				b++,
				d += 1,
				d = this.indexOf(a, d);
		return b
};
List.prototype.clone = function () {
		var a,
				b = instantiateWithSameType(this);
		b.id = this.id;
		for (a = 0; this[a] != null; a++)
				b.push(this[a]);
		return b
};
List.prototype.pushIfUnique = function (a) {
		this.indexOf(a) == -1 && this.push(a)
};
List.prototype.removeElement = function (a) {
		a = this.indexOf(a);
		a > -1 && this.splice(a, 1)
};
List.prototype.removeElementsByIndexes = function (a) {
		var b = this.type == "List"
				? new List
				: instantiate(typeOf(this));
		for (i = 0; i < this.length; i++)
				a.indexOf(i) == -1 && b.push(this[i]);
		return this.type == "List"
				? b.getImproved()
				: b
};
List.prototype.removeElements = function () {
		var a;
		for (a = 0; a < this.length; a++) {
				var b = this.indexOf(this[a]);
				b > -1 && (this.splice(b, 1), a--)
		}
};
List.prototype.getWithoutRepetitions = function () {
		newList = instantiateWithSameType(this);
		newList.id = this.id;
		for (i = 0; this[i] != null; i++)
				newList.indexOf(this[i]) == -1 && newList.push(this[i]);
		return newList
};
List.prototype.getIndexesOfElement = function () {};
List.prototype.getElementsRepetitionCount = function (a) {
		var b,
				d = new List,
				e = new NumberList,
				f = this.length,
				g;
		for (i = 0; i < f; i++)
				b = this[i],
				g = d.indexOf(b),
				g != -1
						? e[g] ++: (d.push(b), e.push(1));
		b = new Table;
		b.push(d);
		b.push(e);
		d = e.sortNumericIndexed();
		if (a != void 0
				? a
				: 1)
				for (a = 0; a < b.length; a++)
						b[a] = b[a].clone().sortOnIndexArray(d);
return b
};
List.prototype.getMin = function () {
		if (this.length == 0)
				return null;
		var a = this[0],
				b;
		for (b = 1; b < this.length; b++)
				a = Math.min(a, this[b]);
		return a
};
List.prototype.getMax = function () {
		if (this.length == 0)
				return null;
		var a = this[0],
				b;
		for (b = 1; b < this.length; b++)
				a = Math.max(a, this[b]);
		return a
};
List.prototype.add = function (a) {
		if (a.constructor == Number) {
				var b,
						d = instantiateWithSameType(this);
				for (b = 0; b < this.length; b++)
						d.push(this[b] + a);
				return d
		}
};
List.prototype.multiply = function (a) {
		if (a.constructor == Number) {
				var b,
						d = [];
				for (b = 0; b < this.length; b++)
						d.push(this[b] + a);
				return d
		}
};
List.prototype.sortIndexed = function () {
		var a = [],
				b;
		for (b = 0; b < this.length; b++)
				a.push({index: b, value: this[b]});
		var a = a.sort(function (a, b) {
						var d = a.value,
								h = b.value;
						return d < h
								? -1
								: d > h
										? 1
										: 0
				}),
				d = new NumberList;
		for (b = 0; b < a.length; b++)
				d.push(a[b].index);
		return d
};
List.prototype.sortNumericIndexed = function () {
		var a = [],
				b;
		for (b = 0; b < this.length; b++)
				a.push({index: b, value: this[b]});
		var a = a.sort(function (a, b) {
						return a.value - b.value
				}),
				d = new NumberList;
		for (b = 0; b < a.length; b++)
				d.push(a[b].index);
		return d
};
List.prototype.sortNumeric = function () {
		return this.sort(function (a, b) {
				return a - b
		})
};
List.prototype.sortOnIndexes = function (a) {
		var b = instantiateWithSameType(this);
		b.id = this.id;
		var d;
		for (d = 0; this[d] != null; d++)
				a[d] != -1 && b.push(this[a[d]]);
		return b
};
List.prototype.sortNumericIndexedDescending = function () {
		var a = [],
				b;
		for (b = 0; b < this.length; b++)
				a.push({index: b, value: this[b]});
		var a = a.sort(function (a, b) {
						return b.value - a.value
				}),
				d = new NumberList;
		for (b = 0; b < a.length; b++)
				d.push(a[b].index);
		return d
};
List.prototype.sortNumericDescending = function () {
		return this.sort(function (a, b) {
				return b - a
		})
};
List.prototype.sortOnNumberList = function (a) {
		return new List(this.data.sortOnNumberList(a.getData))
};
List.prototype.toNumberList = function () {
		var a = new NumberList;
		a.id = this.id;
		var b;
		for (b = 0; this[b] != null; b++)
				a[b] = Number(this[b]);
		return a
};
List.prototype.toStringList = function () {
		var a = new StringList;
		a.id = this.id;
		var b;
		for (b = 0; this[b] != null; b++)
				a[b] = typeof this[b] == "number"
						? String(this[b])
						: this[b].toString();
		return a
};
List.prototype.pushIfUnique = function (a) {
		this.indexOf(a) == -1 && this.push(a)
};
List.prototype.removeElement = function (a) {
		for (var b = 0; this[b] != null; b++)
				this[b] == a && (this.splice(b, 1), b--)
};
List.prototype.removeElements = function (a) {
		var b;
		for (b = 0; b < this.length; b++)
				a.indexOf(this[b]) > -1 && (this.splice(b, 1), b--)
};
NumberList.prototype = new List;
NumberList.prototype.constructor = NumberList;
function NumberList() {
		var a;
		for (a = 0; a < arguments.length; a++)
				arguments[a] = Number(arguments[a]);
		a = List.apply(this, arguments);
		return a = NumberList.fromArray(a)
}
NumberList.fromArray = function (a) {
		var a = List.fromArray(a),
				b;
		for (b = 0; b < a.length; b++)
				a[b] = Number(a[b]);
		a.type = "NumberList";
		a.unit = NumberList.prototype.unit;
		a.tenPower = NumberList.prototype.tenPower;
		a.getMin = NumberList.prototype.getMin;
		a.getMax = NumberList.prototype.getMax;
		a.getMinMaxInterval = NumberList.prototype.getMinMaxInterval;
		a.getSum = NumberList.prototype.getSum;
		a.getRangeInterval = NumberList.prototype.getRangeInterval;
		a.getNormalized = NumberList.prototype.getNormalized;
		a.getNormalizedToMax = NumberList.prototype.getNormalizedToMax;
		a.getNormalizedToSum = NumberList.prototype.getNormalizedToSum;
		a.getAverage = NumberList.prototype.getAverage;
		a.getNorm = NumberList.prototype.getNorm;
		a.getStandardDeviation = NumberList.prototype.getStandardDeviation;
		a.getSortIndexes = NumberList.prototype.getSortIndexes;
		a.factor = NumberList.prototype.factor;
		a.dotProduct = NumberList.prototype.dotProduct;
		a.sqrt = NumberList.prototype.sqrt;
		a.isEquivalent = NumberList.prototype.isEquivalent;
		return a
};
NumberList.prototype.unit = "";
NumberList.prototype.tenPower = 0;
NumberList.prototype.getMin = function () {
		if (this.length == 0)
				return null;
		var a,
				b = this[0];
		for (a = 1; a < this.length; a++)
				b = Math.min(b, this[a]);
		return b
};
NumberList.prototype.getMax = function () {
		if (this.length == 0)
				return null;
		var a,
				b = this[0];
		for (a = 1; a < this.length; a++)
				b = Math.max(b, this[a]);
		return b
};
NumberList.prototype.getMinMaxInterval = function () {
		return new Interval(this.getMin(), this.getMax())
};
NumberList.prototype.getSum = function () {
		if (this.length == 0)
				return null;
		var a,
				b = this[0];
		for (a = 1; a < this.length; a++)
				b += this[a];
		return b
};
NumberList.prototype.getNormalizedToSum = function () {
		if (this.length == 0)
				return null;
		var a,
				b = this.getSum(),
				d = new NumberList;
		for (a = 0; a < this.length; a++)
				d.push(this[a] / b);
		return d
};
NumberList.prototype.getNormalized = function (a) {
		if (this.length == 0)
				return null;
		var a = a == null
						? 1
						: a,
				b,
				d = this.getMinMaxInterval(),
				e = d.getAmplitude(),
				f = new NumberList;
		for (b = 0; b < this.length; b++)
				f.push(a * ((this[b] - d.x) / e));
		return f
};
NumberList.prototype.getNormalizedToMax = function (a) {
		if (this.length == 0)
				return null;
		var a = a == null
						? 1
						: a,
				b,
				d = this.getMax();
		if (d == 0 && (d = this.getMin(), d == 0))
				return ListGenerators.createListWithSameElement(this.length, 0);
		var e = new NumberList;
		for (b = 0; b < this.length; b++)
				e.push(a * (this[b] / d));
		e.id = this.id;
		return e
};
NumberList.prototype.getRangeInterval = function () {
		if (this.length == 0)
				return null;
		var a,
				b = this[0],
				d = this[0];
		for (a = 1; a < this.length; a++)
				b = Math.max(b, this[a]),
				d = Math.min(d, this[a]);
		return new Interval(d, b)
};
NumberList.prototype.getAverage = function () {
		return this.getSum() / this.length
};
NumberList.prototype.getNorm = function () {
		var a,
				b = 0;
		for (a = 0; this[a] != null; a++)
				b += Math.pow(this[a], 2);
		return Math.sqrt(b)
};
NumberList.prototype.getStandardDeviation = function () {
		for (var a = 0, b = this.getAverage(), d = 0, d = 0; this[d] != null; d++)
				a += Math.pow(this[d] - b, 2);
		return a / this.length
};
NumberList.prototype.getSortIndexes = function (a) {
		a == null && (a = !0);
		var b = [],
				d = new NumberList;
		if (this.length == 0)
				return d;
		var e;
		for (e = 0; this[e] != null; e++)
				b.push([e, this[e]]);
		a
				? b.sort(function (a, b) {
						return a[1] < b[1]
								? 1
								: -1
				})
				: b.sort(function (a, b) {
						return a[1] < b[1]
								? -1
								: 1
				});
		for (e = 0; b[e] != null; e++)
				d.push(b[e][0]);
		d.id = this.id;
		return d
};
NumberList.prototype.factor = function (a) {
		var b,
				d = new NumberList;
		for (b = 0; b < this.length; b++)
				d.push(this[b] * a);
		d.id = this.id;
		return d
};
NumberList.prototype.sqrt = function () {
		var a,
				b = new NumberList;
		for (a = 0; a < this.length; a++)
				b.push(Math.sqrt(this[a]));
		b.id = this.id;
		return b
};
NumberList.prototype.dotProduct = function (a) {
		var b = 0,
				d = Math.min(this.length, a.length);
		for (i = 0; i < d; i++)
				b += this[i] * a[i];
		return b
};
NumberList.prototype.isEquivalent = function (a) {
		for (i = 0; this[i] != null; i++)
				if (this[i] != a[i])
						return !1;
return !0
};
Node.prototype = new DataModel;
Node.prototype.constructor = Node;
function Node(a, b) {
		this.id = a != null
				? a
				: "";
		this.id = b != null
				? b
				: "";
		this.type = "Node";
		this.z = this.y = this.x = 0;
		this.nodeList = new NodeList;
		this.relationList = new RelationList;
		this.toNodeList = new NodeList;
		this.toRelationList = new RelationList;
		this.fromNodeList = new NodeList;
		this.fromRelationList = new RelationList;
		this.descentWeight = this.weight = 1;
		this.level = 0;
		this.parent = null;
		this.az = this.ay = this.ax = this.vz = this.vy = this.vx = 0
}
Node.prototype.cleanRelations = function () {
		this.nodeList = new NodeList;
		this.relationList = new RelationList;
		this.toNodeList = new NodeList;
		this.toRelationList = new RelationList;
		this.fromNodeList = new NodeList;
		this.fromRelationList = new RelationList
};
Node.prototype.destroy = function () {
		DataModel
				.prototype
				.destroy
				.call(this);
		delete this.id;
		delete this.id;
		delete this.nodeType;
		delete this.x;
		delete this.y;
		delete this.z;
		delete this.nodeList;
		delete this.relationList;
		delete this.toNodeList;
		delete this.toNodeList;
		delete this.fromNodeList;
		delete this.fromRelationList;
		delete this.parent;
		delete this.weight;
		delete this.descentWeight;
		delete this.level;
		delete this.vx;
		delete this.vy;
		delete this.vz;
		delete this.ax;
		delete this.ay;
		delete this.az
};
Node.prototype.getParent = function () {
		return this.parent
};
Node.prototype.toString = function () {
		return this.id + ", " + this.id
};
Node.prototype.clone = function () {
		var a = new Node(this.id, this.id);
		a.x = this.x;
		a.y = this.y;
		a.z = this.z;
		a.nodeType = this.nodeType;
		a.weight = this.weight;
		a.descentWeight = this.descentWeight;
		return a
};
NodeList.prototype = new List;
NodeList.prototype.constructor = NodeList;
function NodeList() {
		var a = List.apply(this, arguments);
		return a = NodeList.fromArray(a)
}
NodeList.fromArray = function (a) {
		a = List.fromArray(a);
		a.type = "NodeList";
		a.ids = [];
		a.deleteNodes = NodeList.prototype.deleteNodes;
		a.addNode = NodeList.prototype.addNode;
		a.removeNode = NodeList.prototype.removeNode;
		a.getNodeByName = NodeList.prototype.getNodeByName;
		a.getNodeById = NodeList.prototype.getNodeById;
		a.normalizeWeights = NodeList.prototype.normalizeWeights;
		a.getWeights = NodeList.prototype.getWeights;
		return a
};
NodeList.prototype.removeNodes = function () {
		for (var a = 0; a < this.length; a++)
				this.ids[this[a].id] = null,
				this.removeElement(this[a])
};
NodeList.prototype.addNode = function (a) {
		this.ids[a.id] = a;
		this.push(a)
};
NodeList.prototype.removeNode = function (a) {
		this.ids[a.id] = null;
		this.removeElement(a)
};
NodeList.prototype.normalizeWeights = function () {
		var a,
				b = -9999999;
		for (a = 0; this[a] != null; a++)
				b = Math.max(this[a].weight, b);
		for (a = 0; this[a] != null; a++)
				this[a].weight /= b
};
NodeList.prototype.getNodeByName = function (a) {
		var b;
		for (b = 0; b < this.length; b++)
				if (this[b].id == a)
						return this[b];
return null
};
NodeList.prototype.getNodeById = function (a) {
		return this.ids[a]
};
NodeList.prototype.getWeights = function () {
		var a,
				b = new NumberList;
		for (a = 0; this[a] != null; a++)
				b[a] = this[a].weight;
		return b
};
RelationList.prototype = new NodeList;
RelationList.prototype.constructor = RelationList;
function RelationList() {
		var a = NodeList.apply(this, arguments);
		a.id = "";
		return a = RelationList.fromArray(a)
}
RelationList.fromArray = function (a) {
		a = NodeList.fromArray(a);
		a.type = "RelationList";
		a.addRelation = RelationList.prototype.addRelation;
		a.addRelationIfNew = RelationList.prototype.addRelationIfNew;
		a.removeRelation = RelationList.prototype.removeRelation;
		a.getRelationsWithNode = RelationList.prototype.getRelationsWithNode;
		a.getFirstRelationBetweenNodes = RelationList.prototype.getFirstRelationBetweenNodes;
		a.getFirstRelationBetweenNodesByIds = RelationList.prototype.getFirstRelationBetweenNodesByIds;
		a.getAllRelationsBetweenNodes = RelationList.prototype.getAllRelationsBetweenNodes;
		a.getRelatedNodesToNode = RelationList.prototype.getRelatedNodesToNode;
		a.nodesAreConnected = RelationList.prototype.nodesAreConnected;
		return a
};
RelationList.prototype.addRelation = function (a) {
		this.addNode(a)
};
RelationList.prototype.removeRelation = function (a) {
		this.removeNode(a)
};
RelationList.prototype.getRelationsWithNode = function (a) {
		var b,
				d = [];
		for (b = 0; this[b] != null; b++) {
				var e = this[b];
				(e.node0 == a || e.node1 == a) && d.push(e)
		}
		return d
};
RelationList.prototype.getRelatedNodesToNode = function (a) {
		var b,
				d = new NodeList;
		for (b = 0; b < this.length; b++) {
				var e = this[b];
				e.node0.id == a.id && d.push(e.node1);
				e.node1.id == a.id && d.push(e.node0)
		}
		return d
};
RelationList.prototype.getAllRelationsBetweenNodes = function (a, b, d) {
		var e,
				d = d == null
						? !1
						: d,
				f = [];
		for (e = 0; this[e] != null; e++) {
				var g = this[e];
				(g.node0 == a && g.node1 == b || !d && g.node0 == b && g.node1 == a) && f.push(g)
		}
		return f
};
RelationList.prototype.getFirstRelationBetweenNodes = function (a, b, d) {
		var e,
				d = d == null
						? !1
						: d;
		for (e = 0; this[e] != null; e++)
				if (this[e].node0.id == a.id && this[e].node1.id == b.id || !d && this[e].node1.id == a.id && this[e].node0.id == b.id)
						return this[e];
return null
};
RelationList.prototype.getFirstRelationBetweenNodesByIds = function (a, b, d) {
		var e,
				f;
		for (e = 0; this[e] != null; e++)
				if (f = this[e], f.node0.id == a && f.node1.id == b)
						return f;
if (d)
				return null;
		for (e = 0; this[e] != null; e++)
				if (f = this[e], f.node0.id == b && f.node1.id == a)
						return f;
return null
};
RelationList.prototype.nodesAreConnected = function (a, b, d) {
		return a
				.toNodeList
				.getNodeById(b.id) != null
				? !0
				: !d && a
						.fromNodeList
						.getNodeById(b.id) != null
						? !0
						: !1
};
DateAxis.prototype = new DataModel;
DateAxis.prototype.constructor = DateAxis;
function DateAxis(a, b) {
		b = b == null
				? new Interval(0, 1)
				: b;
		DataModel.apply(this, arguments);
		this.departureDateInterval = a;
		this.arrivalInterval = b;
		this.setDepartureDateInterval(a);
		this.setArrivalInterval(b);
		this.type = "DateAxis"
}
DateAxis.prototype.setDepartureDateInterval = function (a) {
		this.departureDateInterval = a;
		this.time0 = this
				.departureDateInterval
				.date0
				.getTime();
		this.time1 = this
				.departureDateInterval
				.date1
				.getTime();
		this.dTime = this.time1 - this.time0
};
DateAxis.prototype.setArrivalInterval = function (a) {
		this.arrivalInterval = a;
		this.arrivalAmplitude = a.getAmplitude()
};
DateAxis.prototype.project = function (a) {
		return this.arrivalInterval.x + this.arrivalAmplitude * (a.getTime() - this.time0) / this.dTime
};
DateAxis.prototype.update = function () {
		this.time0 = this
				.departureDateInterval
				.date0
				.getTime();
		this.time1 = this
				.departureDateInterval
				.date1
				.getTime();
		this.dTime = this.time1 - this.time0;
		this.arrivalAmplitude = this
				.arrivalInterval
				.getAmplitude()
};
DateAxis.prototype.toString = function () {
		return "DateAxis[" + this
				.departureDateInterval
				.toString() + ", " + this
				.arrivalInterval
				.toString() + "]"
};
DateInterval.prototype = new DataModel;
DateInterval.prototype.constructor = DateInterval;
function DateInterval(a, b) {
		DataModel.apply(this, arguments);
		this.date0 = a;
		this.date1 = b;
		this.type = "DateInterval"
}
DateInterval.prototype.toString = function () {
		return "DateInterval[" + this.date0 + ", " + this.date1 + "]"
};
DateInterval.prototype.getMax = function () {
		return this.date1 > this.date0
				? this.date1
				: this.date0
};
DateInterval.prototype.getMin = function () {
		return this.date0 < this.date1
				? this.date0
				: this.date1
};
DateList.prototype = new List;
DateList.prototype.constructor = DateList;
function DateList() {
		var a;
		for (a = 0; a < arguments.length; a++)
				arguments[a] = Number(arguments[a]);
		a = List.apply(this, arguments);
		return a = DateList.fromArray(a)
}
DateList.fromArray = function (a) {
		var a = List.fromArray(a),
				b;
		for (b = 0; b < a.length; b++)
				a[b] = Date(a[b]);
		a.type = "DateList";
		a.getTimes = DateList.prototype.getTimes;
		return a
};
DateList.prototype.getTimes = function () {
		var a = new NumberList,
				b;
		for (b = 0; this[b] != null; b++)
				a.push(this[b].getTime());
		return a
};
Country.prototype = new Node;
Country.prototype.constructor = Country;
function Country(a, b) {
		Node.apply(this, [a, b]);
		this.type = "Country";
		this.id = a;
		this.id = b;
		this.recognized = !1
}
Country.prototype.generatesSimplifiedNames = function () {
		this._simplifiedNames = CountryOperators.getSimplifiedNames(this.alternativeNames);
		this._simplifiedId = CountryOperators.getSimplifiedName(this.id);
		this._simplifiedName = CountryOperators.getSimplifiedName(this.id)
};
Country.prototype.nameMatches = function (a) {
		this._simplifiedId == null && this.generatesSimplifiedNames();
		a = CountryOperators.getSimplifiedName(a);
		return a == this._simplifiedId || a == this._simplifiedName
				? !0
				: this
						._simplifiedNames
						.indexOf(a) != -1
};
CountryList.prototype = new NodeList;
CountryList.prototype.constructor = CountryList;
function CountryList() {
		var a = NodeList.apply(this, arguments);
		a.id = "";
		return a = CountryList.fromArray(a)
}
CountryList.fromArray = function (a) {
		a = NodeList.fromArray(a);
		a.type = "CountryList";
		a.getCountryFromName = CountryList.prototype.getCountryFromName;
		a.removeAntarctica = CountryList.prototype.removeAntarctica;
		a.simplifyAntarctica = CountryList.prototype.simplifyAntarctica;
		return a
};
CountryList.prototype.getCountryFromName = function (a) {
		for (var b = 0; this[b] != null; b++)
				if (this[b].nameMatches(a))
						return this[b];
return null
};
CountryList.prototype.removeAntarctica = function () {
		this.removeNode(this.getNodeById("AQ"))
};
CountryList.prototype.simplifyAntarctica = function () {
		var a = this
				.getNodeById("AQ")
				.simplePolygonList;
		a != null && (a[0].splice(10, 1), a[0].splice(10, 1));
		this.getNodeById("AQ")
};
Point.prototype = new DataModel;
Point.prototype.constructor = Point;
function Point(a, b) {
		DataModel.apply(this, arguments);
		this.id = "";
		this.type = "Point";
		this.x = Number(a) || 0;
		this.y = Number(b) || 0
}
Point.prototype.getNorm = function () {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
};
Point.prototype.getAngle = function () {
		return Math.atan2(this.y, this.x)
};
Point.prototype.factor = function (a) {
		return new Point(this.x * a, this.y * a)
};
Point.prototype.normalize = function () {
		var a = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		return new Point(this.x / a, this.y / a)
};
Point.prototype.normalizeToValue = function (a) {
		a /= Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
		return new Point(this.x * a, this.y * a)
};
Point.prototype.subtract = function (a) {
		return new Point(this.x - a.x, this.y - a.y)
};
Point.prototype.add = function (a) {
		return new Point(a.x + this.x, a.y + this.y)
};
Point.prototype.distanceToPoint = function (a) {
		return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2))
};
Point.prototype.distanceToPointSquared = function (a) {
		return Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2)
};
Point.prototype.angleToPoint = function (a) {
		return Math.atan2(a.y - this.y, a.x - this.x)
};
Point.prototype.expandFromPoint = function (a, b) {
		return new Point(a.x + b * (this.x - a.x), a.y + b * (this.y - a.y))
};
Point.prototype.interpolateToPoint = function (a, b) {
		return new Point((1 - b) * this.x + b * a.x, (1 - b) * this.y + b * a.y)
};
Point.prototype.cross = function (a) {
		return this.x * a.y - this.y * a.x
};
Point.prototype.dot = function (a) {
		return this.x * a.x + this.y * a.y
};
Point.prototype.clone = function () {
		return new Point(this.x, this.y)
};
Point.prototype.toString = function () {
		return "(x=" + this.x + ", y=" + this.y + ")"
};
Point3D.prototype = new Point;
Point3D.prototype.constructor = Point3D;
function Point3D(a, b, d) {
		Point.apply(this, arguments);
		this.id = "";
		this.type = "Point3D";
		this.z = d
}
Point3D.prototype.distanceToPoint3D = function (a) {
		return Math.sqrt(Math.pow(Math.abs(this.x - a.x), 2) + Math.pow(Math.abs(this.y - a.y), 2) + Math.pow(Math.abs(this.z - a.z), 2))
};
Point3D.prototype.distanceToPointSquared = function (a) {
		return Math.pow(Math.abs(this.x - a.x), 2) + Math.pow(Math.abs(this.y - a.y), 2) + Math.pow(Math.abs(this.z - a.z), 2)
};
Point3D.prototype.getNorm = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
};
Point3D.prototype.normalizeToValue = function (a) {
		a /= Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
		return new Point3D(this.x * a, this.y * a, this.z * a)
};
Point3D.prototype.cross = function (a) {
		return new Point3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x)
};
Point3D.prototype.dot = function (a) {
		return this.x * a.x + this.y * a.y + this.z * a.z
};
Point3D.prototype.add = function (a) {
		return new Point3D(a.x + this.x, a.y + this.y, a.z + this.z)
};
Point3D.prototype.subtract = function (a) {
		return new Point3D(this.x - a.x, this.y - a.y, this.z - a.z)
};
Point3D.prototype.factor = function (a) {
		return new Point3D(this.x * a, this.y * a, this.z * a)
};
Point3D.prototype.interpolateToPoint = function (a, b) {
		return new Point3D((1 - b) * this.x + b * a.x, (1 - b) * this.y + b * a.y, (1 - b) * this.z + b * a.z)
};
Point3D.prototype.getAngles = function () {
		var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z),
				b = 0.5 * Math.PI - Math.atan2(this.z / a, this.y / a),
				a = -Math.asin(this.x / a);
		b < -Math.PI && (b += 2 * Math.PI);
		b > Math.PI && (b -= 2 * Math.PI);
		a < -Math.PI && (a += 2 * Math.PI);
		a > Math.PI && (a -= 2 * Math.PI);
		return new Point3D(b, a, 0)
};
Point3D.prototype.getInverseAngles = function () {
		var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z),
				b = -0.5 * Math.PI + Math.atan2(-this.z / a, -this.y / a),
				a = Math.asin(-this.x / a);
		b < -Math.PI && (b += 2 * Math.PI);
		b > Math.PI && (b -= 2 * Math.PI);
		a < -Math.PI && (a += 2 * Math.PI);
		a > Math.PI && (a -= 2 * Math.PI);
		return new Point3D(b, a, 0)
};
Point3D.prototype.clone = function () {
		return new Point3D(this.x, this.y, this.z)
};
Point3D.prototype.toString = function () {
		return "(x=" + this.x + ", y=" + this.y + ", z=" + this.z + ")"
};
Polygon.prototype = new List;
Polygon.prototype.constructor = Polygon;
function Polygon() {
		var a = List.apply(this, arguments);
		return a = Polygon.fromArray(a)
}
Polygon.fromArray = function (a) {
		a = List.fromArray(a);
		a.type = "Polygon";
		a.getFrame = Polygon.prototype.getFrame;
		a.getBarycenter = Polygon.prototype.getBarycenter;
		return a
};
Polygon.prototype.getFrame = function () {
		var a = new Rectangle,
				b;
		for (b = 0; b < this.length; b++)
				a.x = Math.min(a.x, this[b].x),
				a.y = Math.min(a.y, this[b].y),
				a.width = Math.max(a.width, this[b].x),
				a.height = Math.max(a.height, this[b].y);
		return a
};
Polygon.prototype.getBarycenter = function () {
		if (this.length == 0)
				return null;
		var a = new Point(this[0].x, this[0].y);
		for (i = 1; this[i] != null; i++)
				a.x += this[i].x,
				a.y += this[i].y;
		a.x /= this.length;
		a.y /= this.length;
		return a
};
Polygon3D.prototype = new List;
Polygon3D.prototype.constructor = Polygon3D;
function Polygon3D() {
		var a = List.apply(this, arguments);
		return a = Polygon3D.fromArray(a)
}
Polygon3D.fromArray = function (a) {
		a = List.fromArray(a);
		a.type = "Polygon3D";
		return a
};
Polygon3DList.prototype = new List;
Polygon3DList.prototype.constructor = Polygon3DList;
function Polygon3DList() {
		var a = List.apply(this, arguments);
		return a = Polygon3DList.fromArray(a)
}
Polygon3DList.fromArray = function (a) {
		a = List.fromArray(a);
		a.type = "Polygon3DList";
		return a
};
PolygonList.prototype = new List;
PolygonList.prototype.constructor = PolygonList;
function PolygonList() {
		var a = List.apply(this, arguments);
		return a = PolygonList.fromArray(a)
}
PolygonList.fromArray = function (a) {
		a = List.fromArray(a);
		a.type = "PolygonList";
		a.getFrame = PolygonList.prototype.getFrame;
		return a
};
PolygonList.prototype.getFrame = function () {
		var a;
		if (this.length == 0)
				return null;
		var b = this[0].getFrame();
		for (a = 0; this[a] != null; a++)
				b.x = Math.min(b.x, this[a].getFrame().x),
				b.y = Math.min(b.y, this[a].getFrame().y),
				b.width = Math.max(b.width, this[a].getFrame().width),
				b.height = Math.max(b.height, this[a].getFrame().height);
		return b
};
Rectangle.prototype = new DataModel;
Rectangle.prototype.constructor = Rectangle;
function Rectangle(a, b, d, e) {
		DataModel.apply(this);
		this.id = "";
		this.type = "Rectangle";
		this.x = Number(a) || 0;
		this.y = Number(b) || 0;
		this.width = Number(d) || 0;
		this.height = Number(e) || 0
}
Rectangle.prototype.getRight = function () {
		return this.x + this.width
};
Rectangle.prototype.getBottom = function () {
		return this.y + this.height
};
Rectangle.prototype.setRight = function (a) {
		this.width = a - this.x
};
Rectangle.prototype.setBottom = function (a) {
		this.height = a - this.y
};
Rectangle.prototype.getTopLeft = function () {
		return new Point(this.x, this.y)
};
Rectangle.prototype.getTopRight = function () {
		return new Point(this.x + this.width, this.y)
};
Rectangle.prototype.getBottomRight = function () {
		return new Point(this.x + this.width, this.y + this.height)
};
Rectangle.prototype.getBottomLeft = function () {
		return new Point(this.x, this.y + this.height)
};
Rectangle.prototype.getCenter = function () {
		return new Point(this.x + 0.5 * this.width, this.y + 0.5 * this.height)
};
Rectangle.prototype.clone = function () {
		return new Rectangle(this.x, this.y, this.width, this.height)
};
Rectangle.prototype.getRatio = function () {
		return Math.max(this.width, this.height) / Math.min(this.width, this.height)
};
Rectangle.prototype.pointIsInside = function (a) {
		return this.x <= a.x && this.x + this.width >= a.x && this.y <= a.y && this.y + this.height >= a.y
};
Rectangle.prototype.intersectsRectangle = function (a) {
		return this.pointIsInside(a.getTopLeft()) || this.pointIsInside(a.getTopRight()) || this.pointIsInside(a.getBottomLeft()) || this.pointIsInside(a.getBottomRight()) || a.pointIsInside(this.getTopLeft()) || a.pointIsInside(this.getTopRight()) || a.pointIsInside(this.getBottomLeft()) || a.pointIsInside(this.getBottomRight())
};
Rectangle.expandRectangle = function (a, b, d) {
		d = d || new Point(a.x + 0.5 * a.width, a.y + 0.5 * a.height);
		return new Rectangle((a.x - d.x) * b + d.x, (a.y - d.y) * b + d.y, a.width * b, a.height * b)
};
Rectangle.prototype.toString = function () {
		return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")"
};
ColorList.prototype = new NumberList;
ColorList.prototype.constructor = ColorList;
function ColorList() {
		var a;
		for (a = 0; a < arguments.length; a++)
				arguments[a] = Number(arguments[a]);
		a = NumberList.apply(this, arguments);
		return a = ColorList.fromArray(a)
}
ColorList.fromArray = function (a) {
		a = List.fromArray(a);
		a.type = "ColorList";
		return a
};
ColorScale.prototype = new DataModel;
ColorScale.prototype.constructor = ColorScale;
function ColorScale(a) {
		DataModel.apply(this, arguments);
		this.id = "";
		this.type = "ColorScale";
		this.colorScaleFunction = a
				? a
				: ColorOperators.blackScale
}
ColorScale.prototype.getColor = function (a) {
		return this.colorScaleFunction(a)
};
ColorScale.prototype.getColorList = function (a) {
		var b = new ColorList,
				d;
		for (d = 0; d < a; d++)
				b.push(this.getColor(d / (a - 1)));
		return b
};
Table.prototype = new List;
Table.prototype.constructor = Table;
function Table() {
		var a = [],
				b;
		for (b = 0; b < arguments.length; b++)
				a[b] = new List(arguments[b]);
		a = List.apply(this, a);
		return a = Table.fromArray(a)
}
Table.fromArray = function (a) {
		a = List.fromArray(a);
		a.type = "Table";
		a.getRow = Table.prototype.getRow;
		a.sliceRows = Table.prototype.sliceRows;
		a.getTransposed = Table.prototype.getTransposed;
		a.sortListsByList = Table.prototype.sortListsByList;
		a.clone = Table.prototype.clone;
		return a
};
Table.prototype.getRow = function (a) {
		var b = new List,
				d;
		for (d = 0; d < this.length; d++)
				b[d] = this[d][a];
		return b.getImproved()
};
Table.prototype.sliceRows = function (a, b) {
		var d = new Table;
		d.id = this.id;
		var e;
		for (e = 0; this[e] != null; e++) {
				var f = List
						.fromArray(this[e].slice(a, b))
						.getImproved();
				d.push(f)
		}
		return d.getImproved()
};
Table.prototype.getTransposed = function () {
		var a = instantiate(typeOf(this));
		if (this.length == 0)
				return a;
		var b,
				d,
				e;
		for (b = 0; this[b] != null; b++) {
				e = this[b];
				for (d = 0; e[d] != null; d++)
						b == 0 && (a[d] = new List),
						a[d][b] = this[b][d]
		}
		for (d = 0; this[0][d] != null; d++)
				a[d] = a[d].getImproved();
		return a
};
Table.prototype.sortListsByList = function (a) {
		switch (a.type) {
				case "NumberList":
						return TableOperators.sortListsByNumberList(this, a)
		}
		return null
};
Table.prototype.clone = function () {
		var a = 0,
				b = instantiateWithSameType(this);
		b.id = this.id;
		for (a = 0; this[a] != null; a++)
				b.push(this[a].clone());
		return b
};
Axis.prototype = new DataModel;
Axis.prototype.constructor = Axis;
function Axis(a, b) {
		b = b == null
				? new Interval(0, 1)
				: b;
		DataModel.apply(this, arguments);
		this.departureInterval = a;
		this.arrivalInterval = b;
		this.setDepartureInterval(a);
		this.setArrivalInterval(b);
		this.type = "Axis"
}
Axis.prototype.setDepartureInterval = function (a) {
		this.departureInterval = a;
		this.departureAmplitude = a.getSignedAmplitude()
};
Axis.prototype.setArrivalInterval = function (a) {
		this.arrivalInterval = a;
		this.arrivalAmplitude = a.getSignedAmplitude()
};
Axis.prototype.project = function (a) {
		return this.arrivalInterval.x + this.arrivalAmplitude * (a - this.departureInterval.x) / this.departureAmplitude
};
Axis.prototype.update = function () {
		this.departureAmplitude = this
				.departureInterval
				.getSignedAmplitude();
		this.arrivalAmplitude = this
				.arrivalInterval
				.getSignedAmplitude()
};
Axis.prototype.toString = function () {
		return "Axis[" + this
				.departureInterval
				.toString() + ", " + this
				.arrivalInterval
				.toString() + "]"
};
Axis2D.prototype = new DataModel;
Axis2D.prototype.constructor = Axis2D;
function Axis2D(a, b) {
		b = b == null
				? new Rectangle(0, 0, 1, 1)
				: b;
		DataModel.apply(this, arguments);
		this.departureFrame = a;
		this.arrivalFrame = b;
		this.setFrames(a, b);
		this.type = "Axis2D"
}
Axis2D.prototype.setFrames = function (a, b) {
		this.departureFrame = a;
		this.arrivalFrame = b;
		this.update()
};
Axis2D.prototype.setDepartureFrame = function (a) {
		this.departureFrame = a;
		this.update()
};
Axis2D.prototype.setArrivalFrame = function (a) {
		this.arrivalFrame = a;
		this.update()
};
Axis2D.prototype.project = function (a) {
		return new Point((a.x - this.departureFrame.x) * this.pW + this.arrivalFrame.x, (a.y - this.departureFrame.y) * this.pH + this.arrivalFrame.y)
};
Axis2D.prototype.update = function () {
		this.pW = this.arrivalFrame.width / this.departureFrame.width;
		this.pH = this.arrivalFrame.height / this.departureFrame.height
};
Axis2D.prototype.toString = function () {
		return "Axis2D[" + this
				.departureFrame
				.toString() + ", " + this
				.arrivalFrame
				.toString() + "]"
};
Interval.prototype = new Point;
Interval.prototype.constructor = Interval;
function Interval(a, b) {
		DataModel.apply(this, arguments);
		this.x = Number(a);
		this.y = Number(b);
		this.type = "Interval"
}
Interval.prototype.getMin = function () {
		return Math.min(x, y)
};
Interval.prototype.getMax = function () {
		return Math.max(x, y)
};
Interval.prototype.getAmplitude = function () {
		return Math.abs(this.x - this.y)
};
Interval.prototype.getSignedAmplitude = function () {
		return this.x - this.y
};
Interval.prototype.getMiddle = function () {
		return (this.x + this.y) * 0.5
};
Interval.prototype.getSign = function () {
		return this.x == this.y
				? 0
				: this.getAmplitude() / this.getSignedAmplitude()
};
Interval.prototype.getScaled = function (a) {
		var b = 0.5 * (this.y - this.x),
				d = (this.x + this.y) * 0.5;
		return new Interval(d - b * a, d + b * a)
};
Interval.prototype.invert = function () {
		var a = this.x;
		this.x = this.y;
		this.y = a
};
Interval.prototype.getInterpolatedValue = function (a) {
		return a * Number(this.getSignedAmplitude()) + this.x
};
Interval.prototype.getInverseInterpolatedValue = function (a) {
		return (a - this.x) / this.getSignedAmplitude()
};
Interval.prototype.getInterpolatedValues = function (a) {
		for (var b = [], d = a.length, e = 0; e < d; e++)
				b.push(this.getInterpolatedValue(a[e]));
		return b
};
Interval.prototype.getInverseInterpolatedValues = function (a) {
		for (var b = [], d = a.length, e = 0; e < d; e++)
				b.push(this.getInverseInterpolatedValue(a[e]));
		return b
};
Interval.prototype.clone = function () {
		var a = new Interval(this.x, this.y);
		a.id = name;
		return a
};
Interval.prototype.contains = function (a) {
		return this.y > this.x
				? a >= this.x && a <= this.y
				: a >= this.y && a <= this.y
};
Interval.prototype.toString = function () {
		return "Interval[x:" + this.x + "| y:" + this.y + "| amplitude:" + this.getAmplitude() + "]"
};
Matrix.prototype = new DataModel;
Matrix.prototype.constructor = Matrix;
function Matrix(a, b, d, e, f, g) {
		DataModel.apply(this, arguments);
		this.id = "";
		this.type = "Matrix";
		this.a = a == null
				? 1
				: a;
		this.b = b == null
				? 0
				: b;
		this.c = d == null
				? 0
				: d;
		this.d = e == null
				? 1
				: e;
		this.tx = f == null
				? 0
				: f;
		this.ty = g == null
				? 0
				: g
}
Matrix.prototype.transformPoint = function (a) {
		return new Point(this.a * a.x + this.c * a.y + this.tx, this.b * a.x + this.d * a.y + this.ty)
};
Matrix.prototype.concat = function (a) {
		return Matrix(this.a * a.a + this.c * a.b, this.b * a.a + this.d * a.b, this.a * a.c + this.c * a.d, this.b * a.c + this.d * a.d, this.a * a.tx + this.c * a.ty + this.tx, this.b * a.tx + this.d * a.ty + this.ty)
};
Matrix.prototype.deltaTransformPoint = function (a) {
		return Point(this.a * a.x + this.c * a.y, this.b * a.x + this.d * a.y)
};
Matrix.prototype.getInverse = function () {
		var a = this.a * this.d - this.b * this.c;
		return new Matrix(this.d / a, -this.b / a, -this.c / a, this.a / a, (this.c * this.ty - this.d * this.tx) / a, (this.b * this.tx - this.a * this.ty) / a)
};
Matrix.prototype.rotate = function (a, b) {
		return this.concat(Matrix.rotation(a, b))
};
Matrix.prototype.scale = function (a, b, d) {
		return this.concat(Matrix.scale(a, b, d))
};
Matrix.prototype.translate = function (a, b) {
		return this.concat(Matrix.translation(a, b))
};
NumberTable.prototype = new Table;
NumberTable.prototype.constructor = NumberTable;
function NumberTable() {
		for (var a = 0; arguments[a] != null; a++)
				arguments[a] = NumberList.fromArray(arguments[a]);
		a = Table.apply(this, arguments);
		return a = NumberTable.fromArray(a)
}
NumberTable.fromArray = function (a) {
		a = Table.fromArray(a);
		a.type = "NumberTable";
		a.getRangeInterval = NumberTable.prototype.getRangeInterval;
		a.getNumberListsNormalized = NumberTable.prototype.getNumberListsNormalized;
		a.getNumberListsNormalizedToMax = NumberTable.prototype.getNumberListsNormalizedToMax;
		a.getSums = NumberTable.prototype.getSums;
		a.getRowsSums = NumberTable.prototype.getRowsSums;
		a.getAverages = NumberTable.prototype.getAverages;
		a.getRowsAverages = NumberTable.prototype.getRowsAverages;
		a.factor = NumberTable.prototype.factor;
		a.getMinMaxInterval = NumberTable.prototype.getMinMaxInterval;
		return a
};
NumberTable.prototype.getNumberListsNormalized = function (a) {
		var b = new NumberTable,
				d;
		for (d = 0; this[d] != null; d++)
				numberList = this[d],
				b[d] = numberList.getNormalized(a);
		b.id = this.id;
		return b
};
NumberTable.prototype.getNumberListsNormalizedToMax = function (a) {
		var b = new NumberTable,
				d;
		for (d = 0; this[d] != null; d++)
				numberList = this[d],
				b[d] = numberList.getNormalizedToMax(a);
		b.id = this.id;
		return b
};
NumberTable.prototype.getMinMaxInterval = function () {
		if (this.length == 0)
				return null;
		for (var a = this[0].getMinMaxInterval(), b = 1; this[b] != null; b++) {
				var d = this[b].getMinMaxInterval();
				a.x = Math.min(a.x, d.x);
				a.y = Math.max(a.y, d.y)
		}
		return a
};
NumberTable.prototype.getSums = function () {
		for (var a = new NumberList, b = 0; this[b] != null; b++)
				a[b] = this[b].getSum();
		return a
};
NumberTable.prototype.getRowsSums = function () {
		for (var a = this[0].clone(), b, d = 1; this[d] != null; d++) {
				b = this[d];
				for (var e = 0; b[e] != null; e++)
						a[e] += b[e]
		}
		return a
};
NumberTable.prototype.getAverages = function () {
		for (var a = new NumberList, b = 0; this[b] != null; b++)
				a[b] = this[b].getAverage();
		return a
};
NumberTable.prototype.getRowsAverages = function () {
		var a = this.length,
				b = this[0]
						.clone()
						.factor(1 / a),
				d,
				e,
				f;
		for (e = 1; this[e] != null; e++) {
				d = this[e];
				for (f = 0; d[f] != null; f++)
						b[f] += d[f] / a
		}
		return b
};
NumberTable.prototype.factor = function (a) {
		var b = new NumberTable,
				d;
		for (d = 0; this[d] != null; d++)
				numberList = this[d],
				b[d] = numberList.factor(a);
		b.id = this.id;
		return b
};
StringList.prototype = new List;
StringList.prototype.constructor = StringList;
function StringList() {
		var a;
		for (a = 0; a < arguments.length; a++)
				arguments[a] = String(arguments[a]);
		a = List.apply(this, arguments);
		return a = StringList.fromArray(a)
}
StringList.fromArray = function (a) {
		var a = List.fromArray(a),
				b;
		for (b = 0; b < a.length; b++)
				a[b] = String(a[b]);
		a.type = "StringList";
		a.toLowerCase = StringList.prototype.toLowerCase;
		a.toUpperCase = StringList.prototype.toUpperCase;
		a.append = StringList.prototype.append;
		a.getConcatenated = StringList.prototype.getConcatenated;
		return a
};
StringList.prototype.append = function (a, b) {
		var b = b == null
						? !0
						: b,
				d = new StringList;
		d.id = this.id;
		var e;
		if (b)
				for (e = 0; this[e] != null; e++)
						d[e] = this[e] + a;
else
				for (e = 0; this[e] != null; e++)
						d[e] = a + this[e];
return d
};
StringList.prototype.getConcatenated = function (a) {
		var b,
				d = "";
		for (b = 0; this[b] != null; b++)
				d += this[b],
				b < this.length - 1 && (d += a);
		return d
};
StringList.prototype.toLowerCase = function () {
		var a = new StringList;
		a.id = this.id;
		var b;
		for (b = 0; this[b] != null; b++)
				a[b] = this[b].toLowerCase();
		return a
};
StringList.prototype.toUpperCase = function () {
		var a = new StringList;
		a.id = this.id;
		var b;
		for (b = 0; this[b] != null; b++)
				a[b] = this[b].toUpperCase();
		return a
};
Relation.prototype = new Node;
Relation.prototype.constructor = Relation;
function Relation(a, b, d, e, f) {
		Node.apply(this, [a, b]);
		this.node0 = d;
		this.node1 = e;
		this.weight = f
}
Relation.prototype.destroy = function () {
		Node
				.prototype
				.destroy
				.call(this);
		delete this.node0;
		delete this.node1
};
Relation.prototype.clone = function () {
		var a = new Relation(this.id, this.id, this.node0, this.node1);
		a.x = this.x;
		a.y = this.y;
		a.z = this.z;
		a.nodeType = this.nodeType;
		a.weight = this.weight;
		a.descentWeight = this.descentWeight;
		return a
};
function Network() {
		this.type = "Network";
		this._newRelationID = this._newNodeID = 0;
		this.nodeList = new NodeList;
		this.relationList = new RelationList
}
Network.prototype.destroy = function () {
		delete this.type;
		delete this._newNodeID;
		delete this._newRelationID;
		delete this.nodeList;
		delete this.relationList
};
Network.prototype.addNode = function (a) {
		this
				.nodeList
				.addNode(a)
};
Network.prototype.getNodeWithName = function (a) {
		return this
				.nodeList
				.getNodeWithName(a)
};
Network.prototype.getNodeWithId = function (a) {
		return this
				.nodeList
				.getNodeWithId(a)
};
Network.prototype.addRelation = function (a) {
		this
				.relationList
				.addNode(a);
		a
				.node0
				.nodeList
				.addNode(a.node1);
		a
				.node0
				.relationList
				.addNode(a);
		a
				.node0
				.toNodeList
				.addNode(a.node1);
		a
				.node0
				.toRelationList
				.addNode(a);
		a
				.node1
				.nodeList
				.addNode(a.node0);
		a
				.node1
				.relationList
				.addNode(a);
		a
				.node1
				.fromNodeList
				.addNode(a.node0);
		a
				.node1
				.fromRelationList
				.addNode(a)
};
Network.prototype.createRelation = function (a, b, d, e) {
		d = d || a.id + "_" + b.id;
		a = new Relation(d, d, a, b, e || 1);
		this.addRelation(a);
		return a
};
Network.prototype.removeNode = function (a) {
		for (var b = 0; a.relationList[b] != null; b++)
				this.removeRelation(a.relationList[b]),
				b--;
		this
				.nodeList
				.removeNode(a)
};
Network.prototype.removeNodes = function () {
		this
				.nodeList
				.deleteNodes();
		this
				.relationList
				.deleteNodes()
};
Network.prototype.removeRelation = function (a) {
		this
				.relationList
				.removeElement(a);
		a
				.node0
				.nodeList
				.removeNode(a.node1);
		a
				.node0
				.relationList
				.removeRelation(a);
		a
				.node0
				.toNodeList
				.removeNode(a.node1);
		a
				.node0
				.toRelationList
				.removeRelation(a);
		a
				.node1
				.nodeList
				.removeNode(a.node0);
		a
				.node1
				.relationList
				.removeRelation(a);
		a
				.node1
				.fromNodeList
				.removeNode(a.node0);
		a
				.node1
				.fromRelationList
				.removeRelation(a)
};
Network.prototype.getNewNodeID = function () {
		id = this._newNodeID;
		this._newNodeID++;
		return id
};
Network.prototype.getNewRelationID = function () {
		id = this._newRelationID;
		this._newRelationID++;
		return id
};
Network.prototype.getReport = function () {
		return "network contains " + this.nodeList.length + " nodes and " + this.relationList.length + " relations!"
};
Tree.prototype = new Network;
Tree.prototype.constructor = Tree;
function Tree() {
		Network.apply(this);
		this.type = "Tree";
		this.nLevels = 0
}
Tree.prototype.addNodeToTree = function (a, b) {
		this.addNode(a);
		b == null
				? (a.level = 0, a.parent = null)
				: (this.createRelation(b, a), a.level = b.level + 1, a.parent = b);
		this.nLevels = Math.max(this.nLevels, a.level + 1)
};
Tree.prototype.getNodesByLevel = function (a) {
		var b = new NodeList;
		for (i = 0; this.nodeList[i] != null; i++)
				this.nodeList[i].level == a && b.push(this.nodeList[i]);
		return b
};
Tree.prototype.assignDescentWeightsToNodes = function () {
		this._assignDescentWeightsToNode(this.nodeList[0])
};
Tree.prototype._assignDescentWeightsToNode = function (a) {
		var b;
		for (b = 0; a.toNodeList[b] != null; b++)
				a.descentWeight += this._assignDescentWeightsToNode(a.toNodeList[b]);
		return a.descentWeight
};
Tree.prototype.getReport = function () {
		return "Tree contains " + this.nodeList.length + " nodes and " + this.relationList.length + " relations"
};
DateOperators.millisecondsToYears = 3.169E-11;
function DateOperators() {}
DateOperators.twoDatesToDateInterval = function (a, b) {
		return new DateInterval(a, b)
};
DateOperators.stringToDate = function (a, b, d) {
		a = a.split(d == null
				? "-"
				: d);
		switch (b) {
				case 0:
						return new Date(Number(a[2]), Number(a[0]) - 1, Number(a[1]));
				case 1:
						return new Date(Number(a[0]), Number(a[1]) - 1, Number(a[2]))
		}
};
DateOperators.stringListToDateList = function (a, b, d) {
		var e = new DateList,
				f;
		for (f = 0; a[f] != null; f++)
				e.push(this.stringToDate(a[f], b, d));
		return e
};
DateOperators.parseDate = function (a) {
		return new Date(a)
};
DateOperators.parseDates = function (a) {
		var b = new DateList,
				d;
		for (d = 0; a[d] != null; d++)
				b.push(this.parseDate(a[d]));
		return b
};
DateOperators.yearsBetweenDates = function (a, b) {
		return (b.getTime() - a.getTime()) * DateOperators.millisecondsToYears
};
function CountryListOperators() {}
CountryListOperators.getCountryByName = function (a, b) {
		for (var d = CountryOperators.getSimplifiedName(b), e = 0; a[e] != null; e++)
				if (a[e].simplifiedNames.indexOf(d) != -1)
						return a[e];
return null
};
function CountryOperators() {}
CountryOperators.getSimplifiedName = function (a) {
		return a
				.replace(/[\.\- ,\']/g, "")
				.toLowerCase()
};
CountryOperators.getSimplifiedNames = function (a) {
		for (var b = new StringList, d, e = 0; a[e] != null; e++)
				d = this.getSimplifiedName(a[e]),
				d != "" && b.pushIfUnique(d);
		return b
};
function GeometryConvertions() {}
GeometryConvertions.StringToPolygonList = function (a, b, d, e) {
		var b = b || ",",
				d = d || " ",
				e = e || "\n",
				f = new PolygonList,
				g;
		lines = StringOperators.splitString(a, e);
		for (var h, e = 0; lines[e] != null; e++) {
				var a = new Polygon,
						k = StringOperators.splitString(lines[e], d);
				for (h = 0; k[h] != null; h++)
						g = StringOperators.splitString(k[h], b),
						g = new Point(Number(g[0]), Number(g[1])),
						a.push(g);
				f.push(a)
		}
		return f
};
function GeometryOperators() {}
GeometryOperators.getSoftenControlPoints = function (a, b, d, e) {
		e = e || 10;
		d = PointOperators.angleFromTwoPoints(a, d);
		a = new Point(b.x - e * Math.cos(d), b.y - e * Math.sin(d));
		b = new Point(b.x + e * Math.cos(d), b.y + e * Math.sin(d));
		return Polygon.fromArray([a, b])
};
GeometryOperators.bezierCurvePoints = function (a, b, d, e, f, g, h, k, l) {
		var n = 1 - l,
				m = n * d + l * f,
				o = n * e + l * g;
		return new Point(l * (n * m + l * (n * f + l * h)) + n * (n * (n * a + l * d) + l * m), l * (n * o + l * (n * g + l * k)) + n * (n * (n * b + l * e) + l * o))
};
GeometryOperators.triangleContainsPoint = function (a, b, d, e) {
		var f = (a.x - e.x) * (b.y - e.y) - (b.x - e.x) * (a.y - e.y),
				b = (b.x - e.x) * (d.y - e.y) - (d.x - e.x) * (b.y - e.y),
				a = (d.x - e.x) * (a.y - e.y) - (a.x - e.x) * (d.y - e.y);
		return f > 0 && b > 0 && a > 0 || f >= 0 && b >= 0 && a >= 0
};
function PointOperators() {}
PointOperators.angleBetweenVectors = function (a, b) {
		return Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x)
};
PointOperators.angleFromTwoPoints = function (a, b) {
		return Math.atan2(b.y - a.y, b.x - a.x)
};
PointOperators.dot = function (a, b) {
		return a.x * b.x + a.y * b.y
};
PointOperators.twoPointsInterpolation = function (a, b, d) {
		return new Point((1 - d) * a.x + d * b.x, (1 - d) * a.y + d * b.y)
};
function PolygonGenerators() {}
PolygonGenerators.getPolygon = function (a, b, d) {
		var e = new Polygon;
		switch (b) {
				case 0:
						for (b = 0; b < a; b++)
								e.push(new Point(d.x + d.width * Math.random(), d.y + d.height * Math.random()))
				}
		return e
};
PolygonGenerators.getCirclesDisposedInSpiral = function (a) {
		var b,
				d = new Polygon,
				e,
				f = new NumberList,
				g = a.sortNumericIndexedDescending(),
				h = 0,
				k = a.length,
				l,
				n;
		if (k == 1)
				return d = new Table,
				f = new Polygon,
				l = new Point,
				f.push(l),
				d.push(f),
				f = new List,
				f.push(1),
				d.push(f),
				d;
		h = a.getMax();
		if (h == 0)
				return null;
		e = new NumberList(Math.sqrt(a[g[0]] / h), Math.sqrt(a[g[1]] / h));
		b = new Polygon(new Point(0, 0), new Point(e[0] + e[1] + 0.1, 0));
		d[g[0]] = b[0];
		f[g[0]] = e[0];
		d[g[1]] = b[1];
		f[g[1]] = e[1];
		var m,
				o,
				p = 0,
				t = new Point(0, 0),
				s = b[1].x + e[1];
		for (l = 2; l < k; l++) {
				o = Math.sqrt(a[g[l]] / h);
				m = e[0] + o + 0.1;
				p = l;
				for (n = 0; n < 1E5; n++)
						if (t.x = m * Math.cos(p), t.y = m * Math.sin(p), m += 0.01, p += m * 0.04, Polygon.testCircleAtPoint(t, o + 0.1, b, e) || n == 99999) {
								b.push(new Point(t.x, t.y));
								e.push(o);
								d[g[l]] = b[l];
								f[g[l]] = e[l];
								s = Math.max(s, Math.sqrt(Math.pow(t.x, 2) + Math.pow(t.y, 2)) + o);
								break
						}
				}
		a = 1 / s;
		for (l = 0; l < d.length; l++)
				d[l].x *= a,
				d[l].y *= a;
		for (l = 0; l < f.length; l++)
				f[l] *= a;
		return [d, f]
};
function PolygonOperators() {}
PolygonOperators.hull = function (a, b) {
		var b = b == null
						? !1
						: b,
				d,
				e,
				f = a;
		e = f.length;
		var g = 0,
				h = new Polygon;
		if (b)
				var k = new NumberList;
		f = this.sortOnXY(f);
		if (b) {
				for (d = 0; d < e; d++) {
						for (; g >= 2 && this.crossProduct3Points(h[g - 2], h[g - 1], f[d]) <= 0;)
								g--;
						h[g++] = f[d];
						k[g - 1] = d
				}
				d = e - 2;
				for (e = g + 1; d >= 0; d--) {
						for (; g >= e && this.crossProduct3Points(h[g - 2], h[g - 1], f[d]) <= 0;)
								g--;
						h[g++] = f[d];
						k[g - 1] = d
				}
				return NumberList.fromArray(k.getSubList(new Interval(0, g - 2)))
		}
		for (d = 0; d < e; d++) {
				for (; g >= 2 && this.crossProduct3Points(h[g - 2], h[g - 1], f[d]) <= 0;)
						g--;
				h[g++] = f[d]
		}
		d = e - 2;
		for (e = g + 1; d >= 0; d--) {
				for (; g >= e && this.crossProduct3Points(h[g - 2], h[g - 1], f[d]) <= 0;)
						g--;
				h[g++] = f[d]
		}
		return Polygon.fromArray(h.getSubList(new Interval(0, g - 2)))
};
PolygonOperators.sortOnXY = function (a) {
		return a.sort(function (a, d) {
				return a.x < d.x
						? -1
						: a.x == d.x && a.y < d.y
								? -1
								: 1
		})
};
PolygonOperators.crossProduct3Points = function (a, b, d) {
		return (b.x - a.x) * (d.y - a.y) - (b.y - a.y) * (d.x - a.x)
};
PolygonOperators.createPolygon = function (a, b, d) {
		var e = new Polygon;
		switch (a) {
				case 0:
						for (a = 0; a < b; a++)
								e.push(new Point(d.x + Math.random() * d.width, d.y + Math.random() * d.height))
				}
		return e
};
PolygonOperators.polygonContainsPoint = function (a, b) {
		var d,
				e,
				f,
				g = !1;
		d = -1;
		f = a.length;
		for (e = f - 1; ++d < f; e = d)
				(a[d].y <= b.y && b.y < a[e].y || a[e].y <= b.y && b.y < a[d].y) && b.x < (a[e].x - a[d].x) * (b.y - a[d].y) / (a[e].y - a[d].y) + a[d].x && (g = !g);
		return g
};
PolygonOperators.convexHull = function (a, b) {
		var d = this.hull(a, !0),
				e = NumberListGenerators.createSortedNumberList(a.length);
		e.removeElementsByIndexes(d);
		for (var f, g, h, k, l = new Point, n, m = b - 1, o, p, t, s = d.length; m < b;) {
				m = 999999999;
				for (f = 0; f < s; f++) {
						h = a[d[f]];
						k = a[d[(f + 1) % d.length]];
						l.x = (h.x + k.x) * 0.5;
						l.y = (h.y + k.y) * 0.5;
						t = Math.sqrt(Math.pow(k.x - h.x, 2) + Math.pow(k.y - h.y, 2));
						for (g = 0; e[g] != null; g++)
								n = a[e[g]],
								n = (Math.sqrt(Math.pow(n.x - h.x, 2) + Math.pow(n.y - h.y, 2)) + Math.sqrt(Math.pow(n.x - k.x, 2) + Math.pow(n.y - k.y, 2))) / Math.pow(t, 2),
								n < m && (m = n, o = f, p = g)
				}
				for (f = s - 1; f > o; f--)
						d[f + 1] = d[f];
				d[o + 1] = e[p];
				e.splice(p, 1);
				if (e.length == 0)
						break;
				s++
		}
		return d
};
function RectangleOperators() {}
RectangleOperators.packingRectangles = function (a, b, d, e) {
		d == null && (d = new Rectangle(0, 0, 1, 1));
		switch (b
				? b
				: 0) {
				case 0:
						return this.quadrification(d, a);
				case 1:
						b = a.getMinMaxInterval();
						b.min < 0 && (a = a.add(-b.min), new Interval(0, b.max - b.min));
						for (var e = a.getSum(), b = new List, f = d.y, g, h = d.height / e, e = 0; a[e] != null; e++)
								g = h * a[e],
								b.push(new Rectangle(d.x, f, d.width, g)),
								f += g;
						return b;
				case 2:
						b = a.getMinMaxInterval();
						b.min < 0 && (a = a.add(-b.min), new Interval(0, b.max - b.min));
						e = a.getSum();
						b = new List;
						f = d.x;
						h = d.width / e;
						for (e = 0; a[e] != null; e++)
								g = h * a[e],
								b.push(new Rectangle(f, d.y, g, d.height)),
								f += g;
						return b;
				case 3:
						if (!(a.length < 6) && a.length == 6) {
								d = new Rectangle(0.44, 0.36, 0.16, 0.45);
								b = new Rectangle(0.6, 0.15, 0.3, 0.3);
								e = new Rectangle(0.72, 0.45, 0.28, 0.32);
								f = new Rectangle(0.38, 0.04, 0.22, 0.32);
								g = new Point(0.6, 0.36);
								d = expandRectangle(d, Math.sqrt(a[0]), g);
								b = expandRectangle(b, Math.sqrt(a[1]), g);
								f = expandRectangle(f, Math.sqrt(a[3]), g);
								e.x = b.x + b.width * 0.5;
								e.y = b.bottom;
								g = new Point(e.x + e.width * 0.3, b.bottom);
								e = expandRectangle(e, Math.sqrt(a[2]), g);
								e.y += e.height * 0.2;
								var k = new Point(0.26, 0.36 + Math.max(d.height * 0.3, f.height * 0.2));
								g = new Rectangle(0.1, k.y - 0.4, 0.2, 0.4);
								h = new Rectangle(0.22, k.y, 0.16, 0.5);
								g = expandRectangle(g, Math.sqrt(a[4]), k);
								h = expandRectangle(h, Math.sqrt(a[5]), k);
								a = Math.min(f.x, d.x) - Math.max(g.right, h.right) - Math.max(f.width, d.width, h.right - k.x, g.right - k.x) * 0.2;
								h.x += a;
								g.x += a;
								return new List(d, b, e, f, g, h)
						}
				case 4:
						return europeQuadrigram(a);
				case 5:
						e = e || 0;
						f = e == 0
								? Math.round(Math.sqrt(a.length))
								: Math.round(a.length / e);
						b = Math.ceil(a.length / f);
						e = f * b - a.length;
						g = a.getAverage();
						a = ListOperators.concat(a, ListGenerators.createListWithSameElement(e, g));
						a = ListOperators.slidingWindowOnList(a, b, b, 0);
						d = this.packingRectangles(a.getSums(), 2, d);
						b = List();
						for (e = 0; e < f; e++)
								b = ListOperators.concat(b, this.packingRectangles(a[e], 1, d[e]));
						return b
		}
		return null
};
RectangleOperators.quadrification = function (a, b, d, e) {
		if (b.length == 0)
				return new List;
		if (b.length == 1)
				return new List(a);
		var e = e
						? e
						: !1,
				f = d && d
						? b
						: b.getNormalizedToSum();
		if (!e)
				var g = f.getSortIndexes(),
						f = ListOperators.sortListByNumberList(f, f);
		var h = a.width * a.height,
				d = new List,
				k = a.clone(),
				l,
				n = new List,
				m,
				o,
				p = 0,
				t = new Rectangle,
				b = b.length;
		if (b > 2)
				for (var s, a = p; a < b; a++)
						if (o = Number.MAX_VALUE, f[a] == 0)
								d.push(new Rectangle(t.x, t.y, 0, 0));
						else {
								for (s = 1; s < b; s++)
										if (l = NumberList.fromArray(f.slice(a, a + s)), m = n.clone(), n = l.getSum() * h, t.x = k.x, t.y = k.y, k.width > k.height
												? (t.width = n / k.height, t.height = k.height, column = !0)
												: (t.width = k.width, t.height = n / k.width, column = !1), l = l.getNormalizedToSum(), n = this.partitionRectangle(t, l), l = this.getHighestRatio(n), o <= l)
												break;
										else
												o = l;
						if (m.length == 0) {
										d.push(k.clone());
										if (d.length == b) {
												if (!e) {
														e = new List;
														for (a = 0; d[a] != null; a++)
																e[g[a]] = d[a];
														return e
												}
												return d
										}
										p++
								} else {
										d = List.fromArray(d.concat(m));
										if (d.length == b) {
												if (!e) {
														e = new List;
														for (a = 0; d[a] != null; a++)
																e[g[a]] = d[a];
														return e
												}
												return d
										}
										p += m.length;
										a = m[m.length - 1];
										k.width > k.height
												? (k.x = a.width + a.x, k.width -= a.width)
												: (k.y = a.height + a.y, k.height -= a.height)
								}
								a = p - 1
						}
				else
				b == 2
						? (l = f.clone(), t = a.clone(), d = this.partitionRectangle(t, l))
						: d[0] = a.clone();
		if (!e) {
				e = new List;
				for (a = 0; d[a] != null; a++)
						e[g[a]] = d[a];
				return e
		}
		return d
};
RectangleOperators.partitionRectangle = function (a, b) {
		var d = a.width * a.height,
				e = new List,
				f = a.clone(),
				g,
				h;
		for (h = 0; h < b.length; h++)
				g = b[h] * d,
				a.width > a.height
						? (e.push(new Rectangle(f.x, f.y, g / f.height, f.height)), f.x += g / f.height)
						: (e.push(new Rectangle(f.x, f.y, f.width, g / f.width)), f.y += g / f.width);
		return e
};
RectangleOperators.getHighestRatio = function (a) {
		var b = 1,
				d,
				e;
		for (e = 0; e < a.length; e++)
				d = a[e],
				b = Math.max(b, d.getRatio());
		return b
};
function UniversalGeometryOperators() {}
UniversalGeometryOperators.getFrame = function (a) {
		a = a.getFrame();
		return a != void 0
				? a
				: null
};
function ColorOperators() {}
ColorOperators.point3DToColor = function (a) {
		return ColorUtils.RGBtouint(a.x, a.y, a.z)
};
ColorOperators.colorToPoint3D = function (a) {
		return Point3D.fromArray(ColorUtils.uinttoRGB(a))
};
function ColorGenerators() {}
ColorGenerators.randomColor = function (a) {
		return "rgba(" + Math.floor(256 * Math.random()) + "," + Math.floor(256 * Math.random()) + "," + Math.floor(256 * Math.random()) + "," + (a == null
				? 1
				: a) + ")"
};
function ColorListGenerators() {}
ColorListGenerators.createColorListWithSingleColor = function (a, b) {
		for (var d = new ColorList, e = 0; e < a; e++)
				d.push(b);
		return d
};
ColorListGenerators.createCategoricalColors = function (a, b, d) {
		var e = new ColorList;
		switch (a) {
				case 5:
						var a = NumberListGenerators.createRandomNumberList(1001, null, 0),
								f = NumberListGenerators.createSortedNumberList(b),
								g = NumberListGenerators.createRandomNumberList(b, null, 0),
								f = ListOperators.sortListByNumberList(f, g),
								g = Math.floor(b * 2) + 100,
								h = Math.floor(b * 0.6) + 5,
								k = ColorListGenerators.evaluationFunction(f),
								l,
								n = f,
								m,
								o,
								p = 0,
								t;
						for (m = 0; m < g; m++) {
								for (o = 0; o < h; o++)
										l = ColorListGenerators.sortingVariation(f, a[p], a[p + 1]),
										p = (p + 2) % 1001,
										t = ColorListGenerators.evaluationFunction(l),
										t > k && (n = l, k = t);
								f = n
						}
						for (m = 0; m < b; m++)
								e.push(d(1 / b + f[m] / (b + 1)))
				}
		return e
};
ColorListGenerators.sortingVariation = function (a, b, d) {
		var a = a.clone(),
				b = Math.floor(b * a.length),
				d = Math.floor(d * a.length),
				e = a[d];
		a[d] = a[b];
		a[b] = e;
		return a
};
ColorListGenerators.evaluationFunction = function (a) {
		var b = 0,
				d;
		for (d = 0; a[d + 1] != null; d++)
				b += Math.sqrt(Math.abs(a[d + 1] - a[d]));
		return b
};
function ColorListOperators() {}
ColorListOperators.colorListFromColorScale = function (a, b) {
		return a
				.getColorList
				.apply(a, [b])
};
ColorListOperators.colorListFromColorScaleFunction = function (a, b) {
		var d = new ColorList,
				e;
		for (e = 0; e < b; e++)
				d[e] = a(e / (b - 1));
		return d
};
ColorListOperators.colorListFromColorScaleFunctionAndNumberList = function (a, b, d) {
		(d == null || d) && (b = b.getNormalized());
		var d = new ColorList,
				e;
		for (e = 0; b[e] != null; e++)
				d[e] = a(b[e]);
		return d
};
ColorListOperators.polygon3DToColorList = function (a) {
		var b = a.length,
				d = new ColorList,
				e;
		for (e = 0; e < b; e++)
				d.push(ColorOperators.point3DToColor(a[e]));
		return d
};
ColorListOperators.colorListToPolygon3D = function (a) {
		var b = a.length,
				d = new Polygon3D,
				e;
		for (e = 0; e < b; e++)
				d.push(ColorOperators.colorToPoint3D(a[e]));
		return d
};
function ColorOperators() {}
ColorOperators.RGBtoHEX = function (a, b, d) {
		return "#" + ColorOperators.toHex(a
				? a
				: 0) + ColorOperators.toHex(b) + ColorOperators.toHex(d)
};
ColorOperators.HEXtoRGB = function (a) {
		return [
				parseInt(a.substr(1, 2), 16),
				parseInt(a.substr(3, 2), 16),
				parseInt(a.substr(5, 2), 16)
		]
};
ColorOperators.numberToHex = function (a) {
		for (a = a.toString(16); a.length < 2;)
				a = "0" + a;
		return a
};
ColorOperators.uinttoRGB = function (a) {
		return [
				a >> 16,
				(a >> 8) - (a >> 16 << 8),
				a - (a >> 8 << 8)
		]
};
ColorOperators.uinttoHEX = function (a) {
		a = ColorOperators.uinttoRGB(a);
		return ColorOperators.RGBToHEX(a[0], a[1], a[2])
};
ColorOperators.RGBtouint = function (a, b, d) {
		return Number(a) << 16 | Number(b) << 8 | Number(d)
};
ColorOperators.HEXtouint = function (a) {
		a = ColorOperators.HEXtoRGB(a);
		return ColorOperators.RGBtouint(a[0], a[1], a[2])
};
ColorOperators.grayByLevel = function (a) {
		a = Math.floor(a * 255);
		return "rgb(" + a + "," + a + "," + a + ")"
};
ColorOperators.HEXtoHSV = function (a) {
		ColorOperators.HEXtoRGB(a);
		return ColorOperators.RGBtoHSV(rgb[0], rgb[1], rgb[2])
};
ColorOperators.HSVtoHEX = function (a, b, d) {
		a = ColorOperators.HSVtoRGB(a, b, d);
		return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.HSLtoHEX = function (a, b, d) {
		a = ColorOperators.HSLtoRGB(a, b, d);
		return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.RGBtoHSV = function (a, b, d) {
		var e;
		e = Math.max(Math.max(a, b), d);
		var f = e - Math.min(Math.min(a, b), d);
		if (f == 0)
				return [0, 0, a];
		if (e == 0)
				return [-1, 0, e];
		a = a == e
				? (b - d) / f
				: b == e
						? 2 + (d - a) / f
						: 4 + (a - b) / f;
		a *= 60;
		a < 0 && (a += 360);
		return [
				a, f / e,
				e
		]
};
ColorOperators.HSVtoRGB = function (a, b, d) {
		var a = a
						? a
						: 0,
				b = b
						? b
						: 0,
				d = d
						? d
						: 0,
				e,
				f,
				g;
		if (b == 0)
				return e = b = d,
				[
						Math.floor(e * 255),
						Math.floor(b * 255),
						Math.floor(d * 255)
				];
		a /= 60;
		e = Math.floor(a);
		f = a - e;
		a = d * (1 - b);
		g = d * (1 - b * f);
		f = d * (1 - b * (1 - f));
		switch (e) {
				case 0:
						e = d;
						b = f;
						d = a;
						break;
				case 1:
						e = g;
						b = d;
						d = a;
						break;
				case 2:
						e = a;
						b = d;
						d = f;
						break;
				case 3:
						e = a;
						b = g;
						break;
				case 4:
						e = f;
						b = a;
						break;
				default:
						e = d,
						b = a,
						d = g
		}
		return [
				Math.floor(e * 255),
				Math.floor(b * 255),
				Math.floor(d * 255)
		]
};
ColorOperators.HSLtoRGB = function (a, b, d) {
		if (b == 0)
				d = b = a = d;
		else
				var e = function (a, b, d) {
						d < 0 && (d += 1);
						d > 1 && (d -= 1);
						return d < 1 / 6
								? a + (b - a) * 6 * d
								: d < 0.5
										? b
										: d < 2 / 3
												? a + (b - a) * (2 / 3 - d) * 6
												: a
				}
		,
		f = d < 0.5
				? d * (1 + b)
				: d + b - d * b,
		g = 2 * d - f,
		d = e(g, f, a / 360 + 1 / 3),
		b = e(g, f, a / 360),
		a = e(g, f, a / 360 - 1 / 3);
return [
		Math.floor(d * 255),
		Math.floor(b * 255),
		Math.floor(a * 255)
]
};
ColorOperators.interpolateColors = function (a, b, d) {
a = ColorOperators.interpolateColorsRGB(ColorOperators.colorStringToRGB(a), ColorOperators.colorStringToRGB(b), d);
return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.interpolateColorsRGB = function (a, b, d) {
var e = 1 - d;
return [
		Math.floor(e * a[0] + d * b[0]),
		Math.floor(e * a[1] + d * b[1]),
		Math.floor(e * a[2] + d * b[2])
]
};
ColorOperators.invertColorRGB = function (a, b, d) {
return [
		255 - a,
		255 - b,
		255 - d
]
};
ColorOperators.addAlpha = function (a, b) {
var d = ColorOperators.HEXtoRGB(a);
return "rgba(" + d[0] + "," + d[1] + "," + d[2] + "," + b + ")"
};
ColorOperators.invertColor = function (a) {
a = ColorOperators.HEXtoRGB(a);
a = ColorOperators.invertColorRGB(a[0], a[1], a[2]);
return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.toHex = function (a) {
for (a = a.toString(16); a.length < 2;)
		a = "0" + a;
return a
};
ColorOperators.blackScale = function () {
return "black"
};
ColorOperators.grayscale = function (a) {
a = ColorOperators.interpolateColorsRGB([
		0, 0, 0
], [
		255, 255, 255
], a);
return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.antiGrayscale = function (a) {
a = ColorOperators.interpolateColorsRGB([
		255, 255, 255
], [
		0, 0, 0
], a);
return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.temperature = function (a) {
return a < 0.2
		? ColorOperators.interpolateColors("#000000", ColorOperators.HSVtoHEX(234, 1, 1), a * 5)
		: a > 0.85
				? ColorOperators.interpolateColors(ColorOperators.HSVtoHEX(0, 1, 1), "#FFFFFF", (a - 0.85) / 0.15)
				: ColorOperators.HSVtoHEX(Math.round((0.65 - (a - 0.2)) * 360), 1, 1)
};
ColorOperators.sqrtTemperature = function (a) {
return ColorOperators.temperature(Math.sqrt(a))
};
ColorOperators.sqrt4Temperature = function (a) {
return ColorOperators.temperature(Math.pow(a, 0.25))
};
ColorOperators.quadraticTemperature = function (a) {
return ColorOperators.temperature(Math.pow(a, 2))
};
ColorOperators.cubicTemperatureScale = function (a) {
return ColorOperators.temperature(Math.pow(a, 3))
};
ColorOperators.greenToRed = function (a) {
a = ColorOperators.interpolateColorsRGB([
		50, 255, 50
], [
		255, 50, 50
], a);
return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.grayToOrange = function (a) {
a = ColorOperators.interpolateColorsRGB([
		100, 100, 100
], [
		255, 110, 0
], a);
return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.greenWhiteRed = function (a) {
a = a < 0.5
		? ColorOperators.interpolateColorsRGB([
				50, 255, 50
		], [
				255, 255, 255
		], a * 2)
		: ColorOperators.interpolateColorsRGB([
				255, 255, 255
		], [
				255, 50, 50
		], (a - 0.5) * 2);
return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.solar = function (a) {
a = ColorOperators.interpolateColorsRGB([
		0, 0, 0
], ColorOperators.interpolateColorsRGB([
		255, 0, 0
], [
		255, 255, 0
], a), Math.pow(a * 0.99 + 0.01, 0.2));
return ColorOperators.RGBtoHEX(a[0], a[1], a[2])
};
ColorOperators.antiSolar = function (a) {
return ColorOperators.invertColor(ColorOperators.solar(a))
};
ColorOperators.colorStringToRGB = function (a) {
a.charAt(0) == "#" && (a = a.substr(1, 6));
var a = a.replace(/ /g, ""),
		a = a.toLowerCase(),
		b = {
				aliceblue: "f0f8ff",
				antiquewhite: "faebd7",
				aqua: "00ffff",
				aquamarine: "7fffd4",
				azure: "f0ffff",
				beige: "f5f5dc",
				bisque: "ffe4c4",
				black: "000000",
				blanchedalmond: "ffebcd",
				blue: "0000ff",
				blueviolet: "8a2be2",
				brown: "a52a2a",
				burlywood: "deb887",
				cadetblue: "5f9ea0",
				chartreuse: "7fff00",
				chocolate: "d2691e",
				coral: "ff7f50",
				cornflowerblue: "6495ed",
				cornsilk: "fff8dc",
				crimson: "dc143c",
				cyan: "00ffff",
				darkblue: "00008b",
				darkcyan: "008b8b",
				darkgoldenrod: "b8860b",
				darkgray: "a9a9a9",
				darkgreen: "006400",
				darkkhaki: "bdb76b",
				darkmagenta: "8b008b",
				darkolivegreen: "556b2f",
				darkorange: "ff8c00",
				darkorchid: "9932cc",
				darkred: "8b0000",
				darksalmon: "e9967a",
				darkseagreen: "8fbc8f",
				darkslateblue: "483d8b",
				darkslategray: "2f4f4f",
				darkturquoise: "00ced1",
				darkviolet: "9400d3",
				deeppink: "ff1493",
				deepskyblue: "00bfff",
				dimgray: "696969",
				dodgerblue: "1e90ff",
				feldspar: "d19275",
				firebrick: "b22222",
				floralwhite: "fffaf0",
				forestgreen: "228b22",
				fuchsia: "ff00ff",
				gainsboro: "dcdcdc",
				ghostwhite: "f8f8ff",
				gold: "ffd700",
				goldenrod: "daa520",
				gray: "808080",
				green: "008000",
				greenyellow: "adff2f",
				honeydew: "f0fff0",
				hotpink: "ff69b4",
				indianred: "cd5c5c",
				indigo: "4b0082",
				ivory: "fffff0",
				khaki: "f0e68c",
				lavender: "e6e6fa",
				lavenderblush: "fff0f5",
				lawngreen: "7cfc00",
				lemonchiffon: "fffacd",
				lightblue: "add8e6",
				lightcoral: "f08080",
				lightcyan: "e0ffff",
				lightgoldenrodyellow: "fafad2",
				lightgrey: "d3d3d3",
				lightgreen: "90ee90",
				lightpink: "ffb6c1",
				lightsalmon: "ffa07a",
				lightseagreen: "20b2aa",
				lightskyblue: "87cefa",
				lightslateblue: "8470ff",
				lightslategray: "778899",
				lightsteelblue: "b0c4de",
				lightyellow: "ffffe0",
				lime: "00ff00",
				limegreen: "32cd32",
				linen: "faf0e6",
				magenta: "ff00ff",
				maroon: "800000",
				mediumaquamarine: "66cdaa",
				mediumblue: "0000cd",
				mediumorchid: "ba55d3",
				mediumpurple: "9370d8",
				mediumseagreen: "3cb371",
				mediumslateblue: "7b68ee",
				mediumspringgreen: "00fa9a",
				mediumturquoise: "48d1cc",
				mediumvioletred: "c71585",
				midnightblue: "191970",
				mintcream: "f5fffa",
				mistyrose: "ffe4e1",
				moccasin: "ffe4b5",
				navajowhite: "ffdead",
				navy: "000080",
				oldlace: "fdf5e6",
				olive: "808000",
				olivedrab: "6b8e23",
				orange: "ffa500",
				orangered: "ff4500",
				orchid: "da70d6",
				palegoldenrod: "eee8aa",
				palegreen: "98fb98",
				paleturquoise: "afeeee",
				palevioletred: "d87093",
				papayawhip: "ffefd5",
				peachpuff: "ffdab9",
				peru: "cd853f",
				pink: "ffc0cb",
				plum: "dda0dd",
				powderblue: "b0e0e6",
				purple: "800080",
				red: "ff0000",
				rosybrown: "bc8f8f",
				royalblue: "4169e1",
				saddlebrown: "8b4513",
				salmon: "fa8072",
				sandybrown: "f4a460",
				seagreen: "2e8b57",
				seashell: "fff5ee",
				sienna: "a0522d",
				silver: "c0c0c0",
				skyblue: "87ceeb",
				slateblue: "6a5acd",
				slategray: "708090",
				snow: "fffafa",
				springgreen: "00ff7f",
				steelblue: "4682b4",
				tan: "d2b48c",
				teal: "008080",
				thistle: "d8bfd8",
				tomato: "ff6347",
				turquoise: "40e0d0",
				violet: "ee82ee",
				violetred: "d02090",
				wheat: "f5deb3",
				white: "ffffff",
				whitesmoke: "f5f5f5",
				yellow: "ffff00",
				yellowgreen: "9acd32"
		};
b[a] != null && (a = b[a]);
for (var b = [
		{
				re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
				example: [
						"rgb(123, 234, 45)", "rgb(255,234,245)"
				],
				process: function (a) {
						return [
								parseInt(a[1]),
								parseInt(a[2]),
								parseInt(a[3])
						]
				}
		}, {
				re: /^(\w{2})(\w{2})(\w{2})$/,
				example: [
						"#00ff00", "336699"
				],
				process: function (a) {
						return [
								parseInt(a[1], 16),
								parseInt(a[2], 16),
								parseInt(a[3], 16)
						]
				}
		}, {
				re: /^(\w{1})(\w{1})(\w{1})$/,
				example: [
						"#fb0", "f0f"
				],
				process: function (a) {
						return [
								parseInt(a[1] + a[1], 16),
								parseInt(a[2] + a[2], 16),
								parseInt(a[3] + a[3], 16)
						]
				}
		}
], d = 0; d < b.length; d++) {
		var e = b[d].process,
				f = b[d]
						.re
						.exec(a);
		if (f)
				return e(f)
}
};
function ListGenerators() {}
ListGenerators.createListWithSameElement = function (a, b) {
var d;
switch (typeOf(b)) {
		case "number":
				var e = new NumberList;
				break;
		case "List":
				e = new Table;
				break;
		case "NumberList":
				e = new NumberTable;
				break;
		case "Rectangle":
				e = new RectamgleList;
				break;
		case "string":
				e = new StringList;
				break;
		default:
				e = new List
}
for (d = 0; d < a; d++)
		e.push(b);
return e
};
function ListOperators() {}
ListOperators.getElementFromList = function (a, b) {
if (a == void 0)
		return null;
b == void 0 && (b = 0);
b < 0 && (b = a.length - -b % a.length);
return a[b % a.length]
};
ListOperators.getLengthFromList = function (a) {
return a.length
};
ListOperators.createListWithElement = function (a, b) {
var d = new List,
		e = b == null
				? 1
				: b,
		f;
for (f = 0; f < e; f++)
		d.push(a);
return d.getImproved()
};
ListOperators.listAssembler = function () {
if (Array.isArray(arguments[0]))
		var a = new Table,
				b;
else
		a = new List;
for (b = 0; b < arguments.length; b++)
		a.push(arguments[b]);
return a
};
ListOperators.createNumberListWithNumber = function (a, b) {
var a = Math.min(Math.max(0, a), 1E5),
		d = new NumberList,
		e;
for (e = 0; e < a; e++)
		d.push(b);
return d
};
ListOperators.countElementsRepetitionOnList = function (a, b, d) {
var b = b || !0,
		d = d || !1,
		e = instantiate(typeOf(a)),
		f = new NumberList,
		g = a.length,
		h,
		k;
if (d) {
		if (a.length == 0)
				return null;
		h = a[0];
		e.push(h);
		f.push(1);
		for (k = 1; k < g; k++)
				d = a[k],
				d == h
						? f[f.length - 1] += 1
						: (e.push(d), f.push(1), h = d)
		} else
		for (k = 0; k < g; k++)
				d = a[k],
				h = e.indexOf(d),
				h != -1
						? f[h] ++: (e.push(d), f.push(1));
a = e.type == "NumberList"
		? new NumberTable
		: new Table;
a[0] = e;
a[1] = f;
b && (a = TableOperators.sortListsByNumberList(a, f));
return a
};
ListOperators.indexesOfElement = function (a, b) {
var d = a.indexOf(b),
		e = new NumberList;
if (d == -1)
		return e;
e.push(d);
var f = a.length;
for (d += 1; d < f; d++)
		a[d] == b && e.push(d);
return e
};
ListOperators.indexesOfElements = function (a, b) {
var d = new NumberList,
		e;
for (e = 0; b[e] != null; e++)
		d[e] = a.indexOf(b[e]);
return d
};
ListOperators.countOccurrencesOnList = function (a) {
var b,
		d = new NumberList,
		e = a.length;
for (b = 0; b < e; b++)
		d.push(this.indexesOfElement(a, a[b]).length);
return d
};
ListOperators.sortListByNumberList = function (a, b, d) {
d == null && (d = !0);
if (b.length == 0)
		return a;
var e = [],
		f = instantiate(typeOf(a));
for (i = 0; a[i] != null; i++)
		e.push([a[i], b[i]]);
d
		? e.sort(function (a, b) {
				return a[1] < b[1]
						? 1
						: -1
		})
		: e.sort(function (a, b) {
				return a[1] < b[1]
						? -1
						: 1
		});
for (i = 0; e[i] != null; i++)
		f.push(e[i][0]);
f.id = a.id;
return f
};
ListOperators.sortListByIndexes = function (a, b) {
var d = instantiate(typeOf(a));
d.id = a.id;
var e = a.length,
		f;
for (f = 0; f < e; f++)
		d.push(a[b[f]]);
return d
};
ListOperators.concat = function () {
var a,
		b,
		d,
		e = arguments[0].clone(),
		f = !0;
for (a = 1; a < arguments.length; a++) {
		d = arguments[a];
		arguments[a].type != arguments[a - 1].type && (f = !1);
		for (b = 0; d[b] != null; b++)
				e.push(d[b])
}
return f
		? e
		: List.fromArray(e)
};
ListOperators.concatWithoutRepetitions = function () {
var a,
		b = arguments[0].clone();
for (a = 1; a < arguments.length; a++) {
		var d = arguments[a],
				e = d.length;
		for (a = 0; a < e; a++)
				b.indexOf(d[a]) == -1 && b.push(d[a])
}
return b.getImproved()
};
ListOperators.slidingWindowOnList = function (a, b, d, e) {
var e = e || 0,
		f = new Table,
		g = a.length,
		h,
		k,
		d = Math.max(1, d);
switch (e) {
		case 0:
				for (h = 0; h < g; h += d)
						if (h + b <= g) {
								e = new List;
								for (k = 0; k < b; k++)
										e.push(a[h + k]);
								f.push(e.getImproved())
						}
				break;
		case 1:
				for (h = 0; h < g; h += d) {
						e = new List;
						for (k = 0; k < Math.min(b, g - h); k++)
								e.push(a[h + k]);
						f.push(e.getImproved())
				}
				break;
		case 2:
				for (h = 0; h < g; h += d) {
						e = new List;
						for (k = 0; k < b; k++)
								e.push(a[(h + k) % g]);
						f.push(e.getImproved())
				}
}
return f.getImproved()
};
function TableEncodings() {}
TableEncodings.ENTER = String.fromCharCode(13);
TableEncodings.ENTER2 = String.fromCharCode(10);
TableEncodings.ENTER3 = String.fromCharCode(8232);
TableEncodings.SPACE = String.fromCharCode(32);
TableEncodings.SPACE2 = String.fromCharCode(160);
TableEncodings.TAB = "\t";
TableEncodings.TAB2 = String.fromCharCode(9);
TableEncodings.CSVtoTable = function (a, b, d) {
if (a) {
		var b = b == null
						? !0
						: b,
				a = a.replace(/ ,/g, ","),
				a = a.replace(/, /g, ","),
				a = a.replace(/ ;/g, ";"),
				a = a.replace(/; /g, ";"),
				e = TableEncodings.ENTER2,
				e = a.split(e);
		if (e.length == 1 && (e = TableEncodings.ENTER, e = a.split(e), e.length == 1))
				e = TableEncodings.ENTER3,
				e = a.split(e);
		var f = new Table,
				d = d != void 0
						? d
						: ",";
		if (a == null || a == "" || a == " " || e.length == 0)
				return null;
		a = 0;
		if (b)
				var a = 1,
						g = e[0].split(d);
		var h;
		for (i = a; i < e.length; i++) {
				a = NetworkEncodings
						.replaceChomasInLine(e[i])
						.split(d);
				for (j = 0; j < a.length; j++) {
						f[j] = f[j]
								? f[j]
								: new List;
						if (b && i == 1)
								f[j].id = this.removeQuotes(g[j]);
						var k = b
								? i - 1
								: i;
						h = a[j].replace(/\*CHOMA\*/g, ",");
						h = Number(h) || Number(h) == 0
								? Number(h)
								: h;
						typeof h == "string" && (h = this.removeQuotes(h));
						f[j][k] = h
				}
		}
		for (i = 0; f[i] != null; i++)
				f[i] = f[i].getImproved();
		return f.getImproved()
}
};
TableEncodings.removeQuotes = function (a) {
if ((a.charAt(0) == '"' || a.charAt(0) == "'") && (a.charAt(a.length - 1) == '"' || a.charAt(a.length - 1) == "'"))
		a = a.substr(1, a.length - 2);
return a
};
TableEncodings.TableToCSV = function (a, b, d) {
var b = b || ",",
		e,
		f,
		g,
		h,
		k = ListGenerators.createListWithSameElement(a[0].length, ""),
		l;
for (e = 0; a[e] != null; e++) {
		g = a[e];
		h = g.type;
		l = e != a.length - 1;
		for (f = 0; g[f] != null; f++) {
				switch (h) {
						case "StringList":
								k[f] += '"' + g[f] + '"';
								break;
						case "NumberList":
								k[f] += g[f];
								break;
						default:
								k[f] += String(g[f])
				}
				l && (k[f] += b)
		}
}
f = "";
if (d) {
		for (e = 0; a[e] != null; e++)
				g = a[e],
				f += '"' + g.id + '"',
				e != a.length - 1 && (f += b);
		f += "\n"
}
return f + k.getConcatenated("\n")
};
function TableGenerators() {}
TableGenerators.createTableWithSameElement = function (a, b, d) {
for (var e = new Table, f = 0; f < a; f++)
		e[f] = ListGenerators.createListWithSameElement(b, d);
return e.getImproved()
};
function TableOperators() {}
TableOperators.getElementFromTable = function (a, b, d) {
return a[b] == null
		? null
		: a[b][d]
};
TableOperators.getSubTable = function (a, b, d, e, f) {
var g = a.length;
if (g == 0)
		return null;
var h = new Table;
e <= 0 && (e = g - b + e);
b = Math.min(b, g - 1);
e = Math.min(e, g - b);
g = a[0].length;
if (g == 0)
		return null;
f <= 0 && (f = g - d + f);
var d = Math.min(d, g - 1),
		f = Math.min(f, g - d),
		k,
		l,
		n,
		m;
for (l = b; l < b + e; l++) {
		g = a[l];
		k = new List;
		k.id = a[l].id;
		for (n = d; n < d + f; n++)
				m = g[n],
				k.push(m);
		h.push(k.getImproved())
}
return h.getImproved()
};
TableOperators.getSubListsByIndexes = function (a, b) {
var d = new Table;
d.id = a.id;
var e,
		f,
		g;
for (e = 0; a[e] != null; e++) {
		f = a[e];
		g = instantiateWithSameType(f);
		for (j = 0; b[j] != null; j++)
				g[j] = f[b[j]];
		d[e] = g.getImproved()
}
return d
};
TableOperators.sortListsByNumberList = function (a, b, d) {
var d = d || !0,
		e = instantiate(typeOf(a));
e.id = a.id;
var f = a.length,
		g;
for (g = 0; g < f; g++)
		e[g] = ListOperators.sortListByNumberList(a[g], b, d);
return e
};
TableOperators.mergeDataTables = function (a, b) {
if (b[0].length == 0) {
		var d = a.clone();
		d.push(ListGenerators.createListWithSameElement(a[0].length, 0));
		return d
}
var d = new Table,
		e = ListOperators.concatWithoutRepetitions(a[0], b[0]),
		f = e.length,
		g = a.length - 1,
		h = b.length - 1,
		k = new NumberTable,
		l = new NumberTable,
		n,
		m,
		o;
for (m = 0; m < f; m++) {
		n = a[0].indexOf(e[m]);
		if (n > -1)
				for (o = 0; o < g; o++)
						m == 0 && (k[o] = new NumberList),
						k[o][m] = a[o + 1][n];
else
				for (o = 0; o < g; o++)
						m == 0 && (k[o] = new NumberList),
						k[o][m] = 0;
n = b[0].indexOf(e[m]);
		if (n > -1)
				for (o = 0; o < h; o++)
						m == 0 && (l[o] = new NumberList),
						l[o][m] = b[o + 1][n];
else
				for (o = 0; o < h; o++)
						m == 0 && (l[o] = new NumberList),
						l[o][m] = 0
}
d[0] = e;
for (m = 0; k[m] != null; m++)
		d.push(k[m]);
for (m = 0; l[m] != null; m++)
		d.push(l[m]);
return d
};
function IntervalListOperators() {}
IntervalListOperators.scaleIntervals = function (a, b) {
var d = new List;
d.id = a.id;
for (var e = 0; a[e] != null; e++)
		d[e] = a[e].getScaled(b);
return d
};
function IntervalTableOperators() {}
IntervalTableOperators.scaleIntervals = function (a, b) {
var d = new Table;
d.id = a.id;
for (var e = 0; a[e] != null; e++)
		d[e] = IntervalListOperators.scaleIntervals(a[e], b);
return d
};
function MatrixGenerators() {}
MatrixGenerators.createMatrixFromTrianglesMapping = function (a, b, d, e, f, g) {
if (b.y != a.y)
		var h = (d.y - a.y) / (b.y - a.y),
				k = (g.x - e.x - (f.x - e.x) * h) / (d.x - a.x - (b.x - a.x) * h),
				l = h * (f.x - e.x) / (d.y - a.y) - k * (b.x - a.x) / (b.y - a.y),
				n = (g.y - e.y - (f.y - e.y) * h) / (d.x - a.x - (b.x - a.x) * h),
				b = h * (f.y - e.y) / (d.y - a.y) - n * (b.x - a.x) / (b.y - a.y);
else
		k = (f.x - e.x) / (b.x - a.x),
		l = (g.x - e.x) / (d.y - a.y) - k * (d.x - a.x) / (d.y - a.y),
		n = (f.y - e.y) / (b.x - a.x),
		b = (g.y - e.y) / (d.y - a.y) - n * (d.x - a.x) / (d.y - a.y);
return new Matrix(k, n, l, b, e.x - k * a.x - l * a.y, e.y - n * a.x - b * a.y)
};
MatrixGenerators.applyTransformationOnCanvasFromPoints = function (a, b, d, e, f, g, h) {
if (d.y != b.y)
		var k = (e.y - b.y) / (d.y - b.y),
				l = (h.x - f.x - (g.x - f.x) * k) / (e.x - b.x - (d.x - b.x) * k),
				n = k * (g.x - f.x) / (e.y - b.y) - l * (d.x - b.x) / (d.y - b.y),
				m = (h.y - f.y - (g.y - f.y) * k) / (e.x - b.x - (d.x - b.x) * k),
				d = k * (g.y - f.y) / (e.y - b.y) - m * (d.x - b.x) / (d.y - b.y);
else
		l = (g.x - f.x) / (d.x - b.x),
		n = (h.x - f.x) / (e.y - b.y) - l * (e.x - b.x) / (e.y - b.y),
		m = (g.y - f.y) / (d.x - b.x),
		d = (h.y - f.y) / (e.y - b.y) - m * (e.x - b.x) / (e.y - b.y);
a.transform(l, m, n, d, f.x - l * b.x - n * b.y, f.y - m * b.x - d * b.y)
};
MatrixGenerators.createRotationMatrix = function (a, b) {
var d = Matrix(Math.cos(a), Math.sin(a), -Math.sin(a), Math.cos(a));
b && (d = Matrix.translation(b.x, b.y).concat(d).concat(Matrix.translation(-b.x, -b.y)));
return d
};
MatrixGenerators.createScaleMatrix = function (a, b, d) {
a = Matrix(a, 0, 0, b || a);
d && (a = Matrix.translation(d.x, d.y).concat(a).concat(Matrix.translation(-d.x, -d.y)));
return a
};
MatrixGenerators.createTranslationMatrix = function (a, b) {
return Matrix(1, 0, 0, 1, a, b)
};
function NumberListGenerators() {}
NumberListGenerators.createSortedNumberList = function (a, b, d) {
b = b || 0;
d = d || 1;
d == 0 && (d = 1);
var e,
		f = new NumberList;
for (e = 0; e < a; e++)
		f.push(b + e * d);
return f
};
NumberList.createNumberListFromInterval = function (a, b) {
b == null && (b = new Interval(0, 1));
var d = new NumberList,
		e = b.getAmplitude(),
		f;
for (f = 0; f < a; f++)
		d.push(Number(b.getMin()) + Number(Math.random() * e));
return d
};
NumberListGenerators.createRandomNumberList = function (a, b, d) {
d = d == null
		? -1
		: d;
b == null && (b = new Interval(0, 1));
var e,
		f = new NumberList,
		g = b.getAmplitude();
if (d >= 0)
		for (e = 0; e < a; e++)
				f.push(b.x + NumberListGenerators.getRandomWithSeed(e + d * 9999) * g);
else
		for (e = 0; e < a; e++)
				f.push(b.x + Math.random() * g);
return f
};
NumberListGenerators.getRandomWithSeed = function () {
return Math.random()
};
function NumberListOperators() {}
NumberListOperators.cosinus = function (a, b) {
return a.dotProduct(b) / (a.getNorm() * b.getNorm())
};
NumberListOperators.filterNumberListByNumber = function (a, b, d, e) {
var e = e || !1,
		f = new NumberList;
if (e)
		switch (d) {
				case "<":
						for (d = 0; a[d] != null; d++)
								a[d] < b && f.push(d);
						break;
				case "<=":
						for (d = 0; a[d] != null; d++)
								a[d] <= b && f.push(d);
						break;
				case ">":
						for (d = 0; a[d] != null; d++)
								a[d] > b && f.push(d);
						break;
				case ">=":
						for (d = 0; a[d] != null; d++)
								a[d] >= b && f.push(d);
						break;
				case "==":
						for (d = 0; a[d] != null; d++)
								a[d] == b && f.push(d);
						break;
				case "!=":
						for (d = 0; a[d] != null; d++)
								a[d] != b && f.push(d)
				} else
				switch (d) {
						case "<":
								for (d = 0; a[d] != null; d++)
										a[d] < b && f.push(a[d]);
								break;
						case "<=":
								for (d = 0; a[d] != null; d++)
										a[d] <= b && f.push(a[d]);
								break;
						case ">":
								for (d = 0; a[d] != null; d++)
										a[d] > b && f.push(a[d]);
								break;
						case ">=":
								for (d = 0; a[d] != null; d++)
										a[d] >= b && f.push(a[d]);
								break;
						case "==":
								for (d = 0; a[d] != null; d++)
										a[d] == b && f.push(a[d]);
								break;
						case "!=":
								for (d = 0; a[d] != null; d++)
										a[d] != b && f.push(a[d])
						}
		return f
};
function NumberOperators() {}
NumberOperators.getRandomWithSeed = function () {
return Math.random()
};
function NumberTableFlowOperators() {}
NumberTableFlowOperators.flowTable = function (a, b, d) {
var b = b || !1,
		e = a.length,
		f = a[0].length,
		g,
		h = new NumberList,
		k = new NumberList,
		l = new NumberList,
		n,
		m,
		o,
		p = 9999999,
		t = -9999999,
		s,
		q;
for (s = 0; s < f; s++) {
		n = 9999999;
		m = -9999999;
		for (q = o = 0; q < e; q++) {
				g = a[q];
				if (g.length != f)
						return;
				m = Math.max(m, g[s]);
				n = Math.min(n, g[s]);
				o += g[s]
		}
		h.push(n);
		k.push(m);
		l.push(o);
		p = Math.min(p, n);
		t = Math.max(t, o)
}
s = t - p;
var h = new NumberTable,
		u,
		w,
		k = d
				? 1
				: 0;
b || (u = p, w = s);
for (s = 0; s < e; s++)
		g = new NumberList,
		h.push(g);
d && h.push(new NumberList);
for (s = 0; s < f; s++) {
		g = a[0];
		b && (u = Math.max(p, 0), w = l[s] - u);
		d && (h[0][s] = 0);
		h[k][s] = (g[s] - u) / w;
		for (q = 1; q < e; q++)
				g = a[q],
				h[q + k][s] = (g[s] - u) / w + h[q - 1 + k][s]
}
return h
};
NumberTableFlowOperators.flowTableIntervals = function (a, b, d) {
var e = this.flowTable(a, b, !0),
		a = new Table,
		b = e.length,
		f = e[0].length,
		g;
for (i = 1; i < b; i++) {
		numberList = e[i];
		g = new List;
		a[i - 1] = g;
		for (j = 0; j < f; j++)
				g.push(new Interval(e[i - 1][j], e[i][j]))
}
if (d)
		for (j = 0; j < f; j++) {
				d = new NumberList;
				for (i = 0; i < b - 1; i++)
						d.push(a[i][j].getAmplitude());
				g = d.getSortIndexes();
				for (i = e = 0; i < b - 1; i++)
						d = a[g[i]][j],
						d.y = e + d.getAmplitude(),
						d.x = e,
						e = d.y
		}
return a
};
function NumberTableOperators() {}
NumberTableOperators.normalizeListsToMax = function (a) {
var b = new NumberTable;
b.id = a.id;
var d;
for (d = 0; a[d] != null; d++)
		b[d] = a[d].getNormalizedToMax();
return b
};
function UniversalNumericOperators() {}
UniversalNumericOperators.addition = function () {
var a,
		b;
if (arguments.length < 2)
		return b;
if (arguments.length == 2) {
		if (Array.isArray(arguments[0]) && Array.isArray(arguments[1]))
				return UniversalNumericOperators.applyBinaryOperatorOnLists(arguments[0], arguments[1], UniversalNumericOperators.addition);
		else if (Array.isArray(arguments[0]))
				return UniversalNumericOperators.applyBinaryOperatorOnListWithObject(arguments[0], arguments[1], UniversalNumericOperators.addition);
		else if (Array.isArray(arguments[1]))
				return UniversalNumericOperators.applyBinaryOperatorOnObjectWithList(arguments[0], arguments[1], UniversalNumericOperators.addition);
		b = new List(arguments[0], arguments[1]);
		a = new List(typeOf(arguments[0]), typeOf(arguments[1]));
		var d = a.sortIndexed();
		b = b.sortOnIndexes(d);
		a = a.sortOnIndexes(d);
		a = a.join("_");
		switch (a) {
				case "boolean_boolean":
						return (b[0] || b[1]) && (!b[0] || !b[1])
								? !0
								: !1;
				case "Point_Point":
						return new Point(b[0].x + b[1].x, b[0].y + b[1].y);
				case "Point3D_Point3D":
						return new Point3D(b[0].x + b[1].x, b[0].y + b[1].y, b[0].z + b[1].z);
				case "Point_number":
						return new Point(b[0].x + b[1], b[0].y + b[1]);
				case "Point3D_number":
						return new Point3D(b[0].x + b[1], b[0].y + b[1], b[0].z + b[1]);
				case "Interval_number":
						return new Interval(b[0].min + b[1], b[0].max + b[1]);
				case "Interval_Point":
						return new Point(b[0].min + b[1].x, b[0].max + b[1].y);
				case "Interval_Interval":
						return new Point(b[0].min + b[1].min, b[0].max + b[1].max);
				case "Point_Rectangle":
						return new Rectangle(b[0].x + b[1].x, b[0].y + b[1].y, b[1].width, b[1].height);
				case "Interval_Rectangle":
						return new Rectangle(b[0].min + b[1].x, b[0].max + b[1].y, b[1].width, b[1].height);
				case "Rectangle_Rectangle":
						return new Rectangle(b[0].x + b[1].x, b[0].y + b[1].y, b[0].width + b[1].width, b[0].height + b[1].height);
				case "Date_number":
						return new Date(b[0].getTime() + b[1] * 6E4);
				case "Date_Date":
						return new Date(Number(b[0].getTime() + b[1].getTime()));
				case "Date_DateInterval":
						return new DateInterval(UniversalNumericOperators.addition(b[0], b[1].date0), UniversalNumericOperators.addition(b[0], b[1].date1));
				case "DateInterval_number":
						return new DateInterval(UniversalNumericOperators.addition(b[0].date0, b[1]), UniversalNumericOperators.addition(b[0].date1, b[1]));
				case "DateInterval_Interval":
						return new DateInterval(UniversalNumericOperators.addition(b[0].date0, b[1].min), UniversalNumericOperators.addition(b[0].date1, b[1].max));
				case "DateInterval_DateInterval":
						return new DateInterval(UniversalNumericOperators.addition(b[0].date0, b[1].date0), UniversalNumericOperators.addition(b[0].date1, b[1].date1));
				case "number_number":
						return b[0] + b[1];
				case "boolean_number":
				case "Date_string":
				case "number_string":
				case "string_string":
						return b[0] + b[1];
				default:
						return trace("[!] addition didn't manage to resolve:", a),
						trace("[!] addition didn't manage to resolve:", a, "==", arguments[0] + arguments[1]),
						null
		}
}
b = arguments[0];
for (a = 1; a < arguments.length; a++)
		b = UniversalNumericOperators.addition(b, arguments[a]);
return b
};
UniversalNumericOperators.applyBinaryOperatorOnLists = function (a, b, d) {
var e = Math.min(a.length, b.length),
		f,
		g = new List;
for (f = 0; f < e; f++)
		g.push(UniversalNumericOperators.applyBinaryOperator(a[f], b[f], d));
return g.getImproved()
};
UniversalNumericOperators.applyBinaryOperatorOnListWithObject = function (a, b, d) {
var e,
		f = new List;
for (e = 0; e < a.length; e++)
		f.push(UniversalNumericOperators.applyBinaryOperator(a[e], b, d));
return f.getImproved()
};
UniversalNumericOperators.applyBinaryOperatorOnObjectWithList = function (a, b, d) {
var e,
		f = new List;
for (e = 0; e < b.length; e++)
		f.push(UniversalNumericOperators.applyBinaryOperator(a, b[e], d));
return f.getImproved()
};
UniversalNumericOperators.applyBinaryOperator = function (a, b, d) {
return d(a, b)
};
UniversalNumericOperators.multiplication = function () {
var a,
		b;
if (arguments.length < 2)
		return typeOf(arguments[0]),
		b;
if (arguments.length == 2) {
		if (Array.isArray(arguments[0]) && Array.isArray(arguments[1]))
				return UniversalNumericOperators.applyBinaryOperatorOnLists(arguments[0], arguments[1], UniversalNumericOperators.multiplication);
		else if (Array.isArray(arguments[0]))
				return UniversalNumericOperators.applyBinaryOperatorOnListWithObject(arguments[0], arguments[1], UniversalNumericOperators.multiplication);
		else if (Array.isArray(arguments[1]))
				return UniversalNumericOperators.applyBinaryOperatorOnObjectWithList(arguments[0], arguments[1], UniversalNumericOperators.multiplication);
		b = new List(arguments[0], arguments[1]);
		a = new List(typeOf(arguments[0]), typeOf(arguments[1]));
		var d = a.sortIndexed();
		b = b.sortOnIndexes(d);
		a = a.sortOnIndexes(d);
		a = a.join("_");
		switch (a) {
				case "boolean_boolean":
						return b[0] && b[1]
								? !0
								: !1;
				case "Point_Point":
						return b[0].cross(b[1]);
				case "Point3D_Point3D":
						return b[0].cross(b[1]);
				case "Point_number":
						return new Point(b[0].x * b[1], b[0].y * b[1]);
				case "Point3D_number":
						return new Point3D(b[0].x * b[1], b[0].y * b[1], b[0].z * b[1]);
				case "Interval_number":
						return new Interval(b[0].min * b[1], b[0].max * b[1]);
				case "Interval_Point":
						return b[1].cross(new Point(b[0].min, b[0].max));
				case "Interval_Interval":
						return (new Point(b[0].min, b[0].max)).cross(new Point(b[1].min, b[1].max));
				case "Date_number":
						return new Date(b[0].getTime() * b[1] * 6E4);
				case "DateInterval_number":
						return new DateInterval(UniversalNumericOperators.multiplication(b[0].date0, b[1]), UniversalNumericOperators.multiplication(b[0].date1, b[1]));
				case "DateInterval_Interval":
						return new DateInterval(UniversalNumericOperators.multiplication(b[0].date0, b[1].min), UniversalNumericOperators.multiplication(b[0].date1, b[1].max));
				case "boolean_number":
				case "number_number":
						break;
				default:
						return trace("[!] multiplication didn't manage to resolve:", a),
						trace("[!] multiplication didn't manage to resolve:", a, "==", arguments[0] * arguments[1]),
						null
		}
		return arguments[0] * arguments[1]
}
b = arguments[0];
for (a = 1; a < arguments.length; a++)
		b = UniversalNumericOperators.multiplication(b, arguments[a]);
return b
};
UniversalNumericOperators.division = function () {
var a,
		b;
if (arguments.length < 2)
		return typeOf(arguments[0]),
		a;
if (arguments.length == 2)
		return typeOf(arguments[0]),
		typeOf(arguments[1]),
		arguments[0] / arguments[1];
a = arguments[0];
for (b = 1; b < arguments.length; b++)
		a = UniversalNumericOperators.division(a, arguments[b]);
return a
};
UniversalNumericOperators.getMin = function (a, b) {
switch (typeOf(a) + "_" + typeOf(b)) {
		case "number_number":
				return Math.min(a, b);
		case "Date_Date":
				return a < b
						? a
						: b;
		case "Interval_undefined":
		case "List_null":
		case "NumberList_undefined":
		case "DateInterval_undefined":
				return a.getMin();
		case "Point_":
				return Math.min(a.x, a.y);
		default:
				return trace("[!] ERROR: UniversalNumericOperators.getMin", a, b),
				null
}
};
UniversalNumericOperators.getMax = function (a, b) {
switch (typeOf(a) + "_" + typeOf(b)) {
		case "number_number":
				return Math.max(a, b);
		case "Date_Date":
				return a > b
						? a
						: b;
		case "Interval_undefined":
		case "List_undefined":
		case "NumberList_undefined":
		case "DateInterval_undefined":
				return a.getMax();
		case "Point_":
				return Math.max(a.x, a.y);
		default:
				return trace("[!] ERROR: UniversalNumericOperators.getMax", a, b),
				null
}
};
UniversalNumericOperators.distance = function (a, b) {
var d,
		e;
if (arguments.length < 2)
		return typeOf(arguments[0]),
		d;
if (arguments.length == 2) {
		d = new List(arguments[0], arguments[1]);
		e = new List(typeOf(arguments[0]), typeOf(arguments[1]));
		var f = e.sortIndexed();
		d.sortOnIndexes(f);
		e = e.sortOnIndexes(f);
		d = e.join("_");
		switch (d) {
				case "number_number":
						return Math.abs(Number(a) - Number(b));
				case "NumberList_NumberList":
						return Math.abs(a.getSum() - b.getSum());
				default:
						return trace("[!] distance didn't manage to resolve:", d),
						trace("[!] distance didn't manage to resolve:", d, "==", Math.abs(arguments[0] - arguments[1])),
						null
		}
}
d = arguments[0];
for (e = 1; e < arguments.length; e++)
		d = UniversalNumericOperators.multiplication(d, arguments[e]);
return d
};
UniversalNumericOperators.interpolation = function (a, b, d) {
a = UniversalNumericOperators.multiplication(1 - d, a);
b = UniversalNumericOperators.multiplication(d, b);
return a == null || b == null
		? null
		: UniversalNumericOperators.addition(a, b)
};
UniversalNumericOperators.power = function (a, b) {
var d = typeOf(a);
if (d == "number")
		return Math.pow(a, b);
if (Array.isArray(a)) {
		var e = instantiate(d);
		e.id = a.id;
		for (d = 0; a[d] != null; d++)
				e.push(this.power(a[d], b));
		return e
}
return null
};
UniversalNumericOperators.randomNumber = function (a) {
var b = Math.random();
return b = a.getInterpolatedValue(b)
};
function StringListOperators() {}
StringListOperators.concatStrings = function (a, b) {
b == null && (b = "");
return a.join(b)
};
StringListOperators.countStringsOccurrencesOnTexts = function (a, b) {
var d = new NumberTable,
		e,
		f,
		g,
		h,
		k;
for (e = 0; a[e] != null; e++) {
		g = a[e];
		h = new NumberList;
		h.id = g;
		for (f = 0; b[f] != null; f++)
				k = b[f].split(g),
				h[f] = k.length - 1;
		d[e] = h
}
return d
};
function StringOperators() {}
StringOperators.ENTER = String.fromCharCode(13);
StringOperators.ENTER2 = String.fromCharCode(10);
StringOperators.ENTER3 = String.fromCharCode(8232);
StringOperators.SPACE = String.fromCharCode(32);
StringOperators.SPACE2 = String.fromCharCode(160);
StringOperators.TAB = "\t";
StringOperators.TAB2 = String.fromCharCode(9);
StringOperators.splitString = function (a, b) {
b == null && (b = ",");
b = b
		.split("\\n")
		.join("\n");
return a.indexOf(b) == -1
		? new StringList(a)
		: StringList.fromArray(a.split(b))
};
StringOperators.splitByEnter = function (a) {
var b = this.splitString(a, "\n");
if (b.length > 1)
		return b;
b = this.splitString(a, StringOperators.ENTER2);
if (b.length > 1)
		return b;
b = this.splitString(a, StringOperators.ENTER3);
return b.length > 1
		? b
		: null
};
StringOperators.firstTextBetweenStrings = function (a, b, d) {
var e = a.indexOf(b);
if (e < 0)
		return null;
if (d == "")
		return a.substr(e);
d = a
		.substr(e + b.length)
		.indexOf(d);
return d == -1
		? a.substring(e + b.length, a.length - 1)
		: a.substring(e + b.length, e + d + b.length)
};
StringOperators.allTextsBetweenStrings = function (a, b, d) {
if (a.indexOf(b) == -1)
		return null;
var a = a.split(b),
		e = a.length,
		f = new StringList,
		g,
		h,
		k;
for (k = 1; k < e; k++)
		g = a[k],
		d == b
				? f.push(g)
				: (h = g.indexOf(d), h >= 0 && f.push(g.substr(0, h)));
return f
};
StringOperators.placeString = function (a, b, d) {
return a.substr(0, d) + b + a.substr(d + b.length)
};
StringOperators.insertString = function (a, b, d) {
return a.substr(0, d) + b + a.substr(d)
};
StringOperators.createHtmlMenu = function (a, b, d) {
b == void 0 && (b = ", ");
d == void 0 && (d = 0);
for (var e = new List, f, g = a.length, h = 0; h < g; h++) {
		f = "";
		for (var k = 0; k < g; k++) {
				if (h == k)
						switch (d) {
								case 0:
										f += a[k];
										break;
								case 1:
										f += "<b>" + a[k] + "</b>";
										break;
								case 2:
										f += "<e" + String(k) + "*" + a[k] + ">";
										break;
								case 3:
										f += "<b><e" + String(k) + "*" + a[k] + "></b>"
						} else
								f += "<e" + String(k) + "*" + a[k] + ">";
		k < g - 1 && (f += b)
		}
		e.push(f)
}
return e
};
StringOperators.removeEnters = function (a) {
return a.replace(/(\StringOperators.ENTER|\StringOperators.ENTER2|\StringOperators.ENTER3)/gi, " ")
};
StringOperators.removeTabs = function (a) {
return a.replace(/(\StringOperators.TAB|\StringOperators.TAB2|\t)/gi, "")
};
StringOperators.removePunctuation = function (a, b) {
return a.replace(/[:,.;?!\(\)\"\']/gi, b || "")
};
StringOperators.removeDoubleSpaces = function (a) {
for (var b = RegExp(/  /); b.test(a);)
		a = a.replace(b, " ");
return a
};
StringOperators.removeHtmlTags = function (a) {
var b = document.createElement("DIV");
b.innerHTML = a;
return b.textContent || b.innerText
};
function NetworkConvertions() {}
NetworkConvertions.createNetworkFromPairsTable = function (a, b, d, e) {
e == null && (e = !1);
if (a.length < 2)
		return null;
var f = new Network,
		g = b == null
				? Math.min(a[0].length, a[1].length)
				: Math.min(a[0].length, a[1].length, b.length);
b == null && a.length > 2 && typeOf(a[2]) == NumberList && a[2].length >= g && (b = a[2]);
typeOf(a[0]) == NodeList && typeOf(a[1]);
var h,
		k,
		l,
		n,
		m,
		o;
for (o = 0; o < g; o++)
		l = "" + a[0][o],
		n = "" + a[1][o],
		h = f.nodeList.getNodeWithId(l),
		h == null
				? (h = new Node(l, l), f.addNode(h))
				: h.weight++,
		k = f.nodeList.getNodeWithId(n),
		k == null
				? (k = new Node(n, n), f.addNode(k))
				: k.weight++,
		b == null
				? (m = f.relationList.getFirstRelationByNodesIds(h.id, k.id, !1), m == null || e
						? (m = new Relation(l + "_" + n + f.relationList.length, l + "_" + n, h, k, 1), f.addRelation(m))
						: m.weight++)
				: b[o] > d && (m = new Relation(l + "_" + n, l + "_" + n, h, k, b[o]), f.addRelation(m));
return f
};
function NetworkEncodings() {}
NetworkEncodings.decodeGDF = function (a) {
var b = new Network,
		a = a.split("\n");
if (a.length == 0)
		return null;
var d,
		e,
		f,
		g = a[0]
				.substr(8)
				.split(","),
		h;
for (e = 1; a[e] != null; e++) {
		d = a[e];
		if (d.substr(0, 8) == "edgedef>") {
				h = e + 1;
				break
		}
		d = NetworkEncodings.replaceChomasInLine(d);
		f = d.split(",");
		node = new Node(String(f[0]), String(f[1]));
		for (d = 0; g[d] != null && f[d] != null; d++)
				g[d] == "weight"
						? node.weight = Number(f[d])
						: g[d] == "x"
								? node.x = Number(f[d])
								: g[d] == "y"
										? node.y = Number(f[d])
										: node[g[d]] = f[d].replace(/\*CHOMA\*/g, ",");
		b.addNode(node)
}
g = a[h - 1]
		.substr(8)
		.split(",");
for (e = h; a[e] != null; e++)
		if (d = a[e], d = NetworkEncodings.replaceChomasInLine(d), f = d.split(","), f.length >= 2)
				if (node0 = b.nodeList.getNodeById(String(f[0])), node1 = b.nodeList.getNodeById(String(f[1])), node0 == null || node1 == null)
						c.log("NetworkEncodings.decodeGDF | [!] problems with nodes ids:", f[0], f[1], "at line", e);
				else {
						id = node0.id + "_" + node1.id + "_" + Math.floor(Math.random() * 999999);
						relation = new Relation(id, id, node0, node1);
						for (d = 2; g[d] != null && f[d] != null; d++)
								g[d] == "weight"
										? relation.weight = Number(f[d])
										: relation[g[d]] = f[d].replace(/\*CHOMA\*/g, ",");
						b.addRelation(relation)
				}
		return b
};
NetworkEncodings.replaceChomasInLine = function (a) {
var b = a.split('"');
if (b.length < 2)
		return a;
var d;
for (d = 0; b[d] != null; d++)
		(a = d * 0.5 != Math.floor(d * 0.5)) && (b[d] = b[d].replace(/,/g, "*CHOMA*"));
return a = StringList
		.fromArray(b)
		.getConcatenated("")
};
NetworkEncodings.encodeGDF = function (a, b, d) {
var b = b == null
				? new StringList
				: b,
		d = d == null
				? new StringList
				: d,
		e = "nodedef>id" + (b.length > 0
				? ","
				: "") + b.getConcatenated(","),
		f,
		g,
		h;
for (f = 0; a.nodeList[f] != null; f++) {
		h = a.nodeList[f];
		e += "\n" + h.id;
		for (g = 0; b[g] != null; g++)
				e += typeof h[b[g]] == "string"
						? ',"' + h[b[g]] + '"'
						: "," + h[b[g]]
		}
e += "\nedgedef>id0,id1" + (d.length > 0
		? ","
		: "") + d.getConcatenated(",");
for (f = 0; a.relationList[f] != null; f++) {
		b = a.relationList[f];
		e += "\n" + b.node0.id + "," + b.node1.id;
		for (g = 0; d[g] != null; g++)
				e += typeof b[d[g]] == "string"
						? ',"' + b[d[g]] + '"'
						: "," + b[d[g]]
		}
return e
};
function NetworkGenerators() {}
NetworkGenerators.createTextsCoOccurrencesNetwork = function (a, b, d, e) {
a = StringListOperators.countStringsOccurrencesOnTexts(words, this.books, d, e);
return NetworkGenerators.createNetworkFromOccurrencesTable(a)
};
NetworkGenerators.createNetworkFromOccurrencesTable = function (a, b, d) {
var b = b == null
				? 0
				: b,
		d = d == null
				? 0
				: d,
		e = new Network,
		f,
		g,
		h,
		k,
		l,
		n,
		m,
		o;
for (f = 0; a[f] != null; f++) {
		h = a[f].id;
		f == 0
				? (n = new Node(h, h), e.addNode(n))
				: n = e.nodeList[f];
		g = a[f].getSum();
		n.weight = g;
		for (g = f + 1; a[g] != null; g++) {
				k = a[g].id;
				f == 0
						? (m = new Node(k, k), e.addNode(m))
						: m = e.nodeList[g];
				o = a[g].getSum();
				m.weight = o;
				switch (b) {
						case 0:
								l = a[f].dotProduct(a[g]);
								break;
						case 1:
								l = NumberListOperators.cosinus(a[f], a[g])
				}
				l > d && e.createRelation(n, m, h + "_" + k, l)
		}
}
return e
};
function NetworkOperators() {}
NetworkOperators.degree = function (a, b, d) {
if (b == d)
		return 0;
for (var a = b.nodeList, b = 1, e, f; a.indexOf(d) == -1;) {
		e = a.clone();
		for (f = 0; a[f] != null; f++)
				e = ListOperators.concat(e, a[f].nodeList);
		e = e.getWithoutRepetitions();
		if (a.length == e.length)
				return -1;
		a = e;
		b++
}
return b
};
function TreeEncodings() {}
TreeEncodings.decodeIdentedTree = function (a, b, d) {
var b = b == null
				? ""
				: b,
		d = d == null
				? "\t"
				: d,
		e = new Tree,
		a = StringOperators.splitByEnter(a),
		f = a.length;
if (f == 0 || f == 1 && (a[0] == null || a[0] == ""))
		return null;
var g,
		h,
		k,
		l;
if (b != "" && b != null) {
		var n = new Node(b, b);
		e.addNodeToTree(n, null)
}
for (b = 0; b < f; b++) {
		h = a[b];
		k = h.length;
		for (g = 0; g < k; g++)
				if (h.charAt(g) != d) {
						l = h.substr(g);
						break
				}
		h = new Node(h, l);
		g == 0
				? n != null
						? e.addNodeToTree(h, n)
						: e.addNodeToTree(h, null)
				: (g = g + 1 - Number(n == null), g = e.getNodesByLevel(g - 1) != null && e.getNodesByLevel(g - 1).length > 0
						? e.getNodesByLevel(g - 1)[
								e
										.getNodesByLevel(g - 1)
										.length - 1
						]
						: null,
				e.addNodeToTree(h, g))
}
e.assignDescentWeightsToNodes();
return e
};
LoadDeliciousTagsFromWebsite.prototype.constructor = LoadDeliciousTagsFromWebsite;
function LoadDeliciousTagsFromWebsite(a) {
this._warnFunction = a;
this.tagsToRemove = new StringList("imported")
}
LoadDeliciousTagsFromWebsite.prototype.search = function (a) {
a = LoadDeliciousTagsFromWebsite.deliciousPageUrl(a);
Loader.loadData(a, this.onComplete, this)
};
LoadDeliciousTagsFromWebsite.deliciousPageUrl = function (a) {
if (a.indexOf(".") == -1)
		return "http://delicious.com/url/" + a;
a.charAt(a.length - 1) != "/" && (a += "/");
this._url = this.adaptUrl(a);
return "http://delicious.com/url/" + MD5.hex_md5(a)
};
LoadDeliciousTagsFromWebsite.adaptUrl = function (a) {
a.substr(0, 3) == "www" && (a = "http://" + a);
a.charAt(a.length - 1) != "/" && (a += "/");
return a
};
LoadDeliciousTagsFromWebsite.prototype.onComplete = function (a) {
a = StringOperators.allTextsBetweenStrings(a.result, 'class="tag " title="', '"');
this._warnFunction(ListOperators.countElementsRepetitionOnList(a))
};
LoadDeliciousTagsFromWebsite.prototype.searchMultiple = function (a, b, d) {
this._urlList = new StringList;
this._modifiedUrlList = new StringList;
this.normalizeEach = b;
this.maxNumberOfTags = d;
for (b = 0; a[b] != null; b++)
		this._urlList[b] = LoadDeliciousTagsFromWebsite.adaptUrl(a[b]),
		this._modifiedUrlList[b] = LoadDeliciousTagsFromWebsite.deliciousPageUrl(a[b]);
this._tablesList = new List;
this._multiLoader = new MultiLoader;
this
		._multiLoader
		.loadDatas(this._modifiedUrlList, this.onCompleteMulti, this)
};
LoadDeliciousTagsFromWebsite.prototype.onCompleteMulti = function (a) {
a = StringOperators.allTextsBetweenStrings(a.result[a.result.length - 1], 'class="tag " title="', '"');
a == null && (a = new StringList);
a = a.toLowerCase();
a.removeElements(this.tagsToRemove);
a = ListOperators.countElementsRepetitionOnList(a);
this._tableMerged = this._tableMerged == null
		? a.clone()
		: TableOperators.mergeDataTables(this._tableMerged, a);
c.log("\u2022", this._tableMerged.length + "/" + (this._urlList.length + 1));
c.log("this._tableMerged[0].length", this._tableMerged[0].length);
if (this._tableMerged.length == this._urlList.length + 1) {
		if (this.normalizeEach)
				for (a = 1; this._tableMerged[a] != null; a++)
						this._tableMerged[a] = this._tableMerged[a].getNormalizedToMax();
a = this
				._tableMerged
				.getSubList(new Interval(1, this._tableMerged.length - 1))
				.getRowsSums();
		c.log("rowsSums", a);
		this._tableMerged = this
				._tableMerged
				.sortListsByList(a);
		if (this.maxNumberOfTags != null)
				this._tableMerged = this._tableMerged.sliceRows(0, this.maxNumberOfTags);
		this._warnFunction(this._tableMerged)
}
};
function CountriesApi() {
this.COUNTRIES_INFO_PATH = "./resources/countriesInfo.csv";
this.SIMPLE_POLYGONS_PATH = "./resources/countriesSimplePolygons.csv";
this.POLYGONS_PATH = "./resources/countriesPolygons.csv";
this.complexLoaded = this.simpleLoaded = !1
}
CountriesApi.prototype.loadAndBuild = function (a, b, d, e) {
this.callee = b;
this.simple = d;
this.complex = e;
this.onComplete = a;
Loader.loadData(this.COUNTRIES_INFO_PATH, this.loadedInfo, this)
};
CountriesApi.prototype.loadedInfo = function (a) {
c.log("CountriesApi.loadedInfo", a);
a = TableEncodings.CSVtoTable(a.result, !1);
c.log("table", a);
var a = a.getTransposed(),
		b = [
				"Asia",
				"Africa",
				"North America, Central America and The Caribbean",
				"South America",
				"",
				"Europe",
				"Australasia"
		];
this._countryList = new CountryList;
for (var d, e, f = 0; a[f] != null; f++)
		e = a[f],
		d = new Country(e[2], e[0]),
		d.isoCode = d.id,
		d.recognized = !0,
		d.continentName = b[e[1]],
		d.wikipediaUrl = "http://en.wikipedia.org/wiki/" + (e[5] == "*"
				? d.id
				: e[5]),
		e[6] == 0 && (e[6] = ""),
		d.alternativeNames = StringList.fromArray(e[6].split(";")),
		d.geoCenter = new Point(Number(e[7]), Number(e[8])),
		this._countryList.addNode(d);
this.simple && Loader.loadData(this.SIMPLE_POLYGONS_PATH, this.loadedPolygons, this);
this.complex && Loader.loadData(this.POLYGONS_PATH, this.loadedPolygons, this)
};
CountriesApi.prototype.loadedPolygons = function (a) {
c.log("CountriesApi.loadedPolygons", a);
var b = a.url == this.SIMPLE_POLYGONS_PATH;
b
		? this.simpleLoaded = !0
		: this.complexLoaded = !0;
for (var a = TableEncodings.CSVtoTable(a.result, !1), d, e = 0; a[0][e] != null; e++)
		d = a[0][e].toUpperCase(),
		country = this._countryList.getNodeById(d),
		b
				? (country.simplePolygonList = this.buildPolygons(a[1][e]), country.id == "AF" && (c.log(a[1][e]), c.log("AF polygon --\>", country.simplePolygonList[0])))
				: country.polygonList = this.buildPolygons(a[1][e]);

!(this.simple && !this.simpleLoaded || this.complex && !this.complexLoaded) && this
		.onComplete
		.call(this.callee, this._countryList)
};
CountriesApi.prototype.buildPolygons = function (a) {
if (a == 0 || a == "")
		return new PolygonList;
for (var a = a.split("*"), b, d, e = new List, f, g, h = 0; a[h] != null; h++) {
		b = a[h].split(" ");
		f = new Polygon;
		e[h] = f;
		d = b[0].split(",");
		g = new Point(Number(d[0]), Number(d[1]));
		f[0] = g;
		for (var k = 1; b[k] != null; k++)
				d = b[k].split(","),
				f[k] = new Point(Number(d[0]) + g.x, Number(d[1]) + g.y)
}
return e
};
RemarkableWordsApi.EN_WORDS_FREQUENCY_PATH = "./resources/english_10Kwords_freq.csv";
RemarkableWordsApi.ES_WORDS_FREQUENCY_PATH = "./resources/english_10Kwords_freq.csv";
function RemarkableWordsApi(a, b) {
this.onComplete = a;
this.target = b;
this.text = "";
this.language = "en"
}
RemarkableWordsApi.prototype.startLoading = function () {
switch (this.language) {
		case "es":
				this.esFrequencyTable == null && Loader.loadData(RemarkableWordsApi.ES_WORDS_FREQUENCY_PATH, this.onLoadWords, this);
		default:
				this.enFrequencyTable == null && Loader.loadData(RemarkableWordsApi.EN_WORDS_FREQUENCY_PATH, this.onLoadWords, this)
}
};
RemarkableWordsApi.prototype.calculate = function (a, b, d) {
this.text = a;
this.language = b == null
		? "en"
		: b;
this.removeWords = d;
return this.language == "es" && this.esFrequencyTable == null || this.language == "en" && this.enFrequencyTable == null
		? null
		: this.executeCalculus(!0)
};
RemarkableWordsApi.prototype.loadAndCalculate = function (a, b) {
this.text = a;
this.language = b == null
		? "en"
		: b;
switch (this.language) {
		case "es":
				this.esFrequencyTable == null
						? Loader.loadData(RemarkableWordsApi.ES_WORDS_FREQUENCY_PATH, this.onLoadWords, this)
						: this.executeCalculus();
		default:
				this.enFrequencyTable == null
						? Loader.loadData(RemarkableWordsApi.EN_WORDS_FREQUENCY_PATH, this.onLoadWords, this)
						: this.executeCalculus()
}
};
RemarkableWordsApi.prototype.onLoadWords = function (a) {
switch (this.language) {
		case "es":
				this.esFrequencyTable = TableEncodings.CSVtoTable(a.result, !1);
				break;
		default:
				this.enFrequencyTable = TableEncodings.CSVtoTable(a.result, !1)
}
this.executeCalculus()
};
RemarkableWordsApi.prototype.executeCalculus = function (a) {
var a = a == null
				? !1
				: a,
		b = this
				.text
				.replace(/  /g, " ")
				.toLowerCase(),
		d = StringList.fromArray(b.split(/[ .,;:!?()\/\-\u2013'"\u2026\[\]\n\t*]/g));
d.removeElement("");
d.removeElement("&amp");
if (this.removeWords != null)
		for (b = 0; this.removeWords[b] != null; b++)
				d.removeElement(this.removeWords[b].toLowerCase());
nWords = d.length;
var d = ListOperators.countElementsRepetitionOnList(d, !0),
		e,
		f;
switch (this.language) {
		case "es":
				e = this.esFrequencyTable;
				f = 1E7;
				break;
		default:
				e = this.enFrequencyTable,
				f = 1E7
}
var g = new Table;
g[0] = d[0];
g[1] = d[1];
var h = new NumberList;
g[2] = h;
var k = new NumberList;
g[3] = k;
for (var l, b = 0; d[0][b] != null; b++)
		l = d[0][b],
		l = e[0].indexOf(l),
		h[b] = l > -1
				? e[1][l]
				: 30,
		k[b] = d[1][b] / nWords / (h[b] / f);
g = TableOperators.sortListsByNumberList(g, k);
if (a)
		return g;
else
		this.onComplete != null && this
				.onComplete
				.call(this.target, g)
};
MentionRelation.prototype = new Relation;
MentionRelation.prototype.constructor = MentionRelation;
function MentionRelation(a, b, d, e) {
var f = "m_" + a.id + "_" + b.id + "_" + d;
Relation.apply(this, [
		f,
		f,
		a,
		b,
		1,
		!0
]);
this.nTweet = d;
this.isRT = !1;
this.tweet = e
}
MergedRelation.prototype = new Relation;
MergedRelation.prototype.constructor = MergedRelation;
function MergedRelation(a, b) {
var d = "m_" + a.id + "_" + b.id;
Relation.apply(this, [
		d,
		d,
		a,
		b,
		1,
		!0
]);
this.toWeight = this.weight = 1;
this.rtWeight = this.fromWeight = 0
}
MergedRelation.prototype.cloneMergedRelation = function (a) {
var b = a
				.nodeList
				.getNodeById(this.node0.id),
		a = a
				.nodeList
				.getNodeById(this.node1.id);
if (b == null || a == null)
		return null;
b = new MergedRelation(b, a);
b.weight = this.weight;
b.toWeight = this.toWeight;
b.fromWeight = this.fromWeight;
b.rtWeight = this.rtWeight;
if (this.tweets != null)
		b.tweets = this.tweets.clone();
return b
};
RTRelation.prototype = new Relation;
RTRelation.prototype.constructor = RTRelation;
function RTRelation(a, b, d, e, f, g) {
var h = "r_" + a.id + "-" + b.id + "-" + f + "-" + g;
Relation.apply(this, [
		h,
		h,
		a,
		b,
		1,
		!0
]);
this.nUser0 = d;
this.nUser1 = e;
this.nTweet0 = f;
this.nTweet1 = g
}
TweetNode.prototype = new Node;
TweetNode.prototype.constructor = TweetNode;
function TweetNode(a, b) {
var d = b + "_" + a;
Node.apply(this, [d, d]);
this.nTweetFromUser = a;
this.userId = b;
this.nThread = -1
}
function TwitterApi() {}
TwitterApi.searchUsers = function (a, b, d) {
this.network = network;
(new Date).getTime();
var e = d
		? d
		: arguments.callee;
Loader.loadJSONP("http://apps2.impure.com/impureDataServices/twitter/twitterStreamApi.php&service=" +
				"searchUsers&q=" + a + "&fields=id_str, text&method=POST&maxResults=100", function (a) {
		a = jQuery.parseJSON(a.result);
		b.call(e, a)
})
};
TwitterApi.searchKeyword = function (a, b, d, e, f) {
var g = (new Date).getTime(),
		h = f
				? f
				: arguments.callee;
Loader.loadJSONP("http://search.twitter.com/search.json?&q=" + a + "&rpp=" + d + "&page=" + e + "&impureNoCacheRandom=" + g, function (a) {
		b.call(h, a)
}, this)
};
TwitterNetworkedSearch.prototype.constructor = TwitterNetworkedSearch;
TwitterNetworkedSearch.MAX_USERS_PER_QUERY = 12;
function TwitterNetworkedSearch(a) {
this._warnFunction = a
}
TwitterNetworkedSearch.prototype.searchAndBuildUsersNetwork = function (a, b) {
this._queries = new StringList;
for (var d = ListOperators.slidingWindowOnList(a, TwitterNetworkedSearch.MAX_USERS_PER_QUERY, TwitterNetworkedSearch.MAX_USERS_PER_QUERY, 1), e = 0; d[e] != null; e++) {
		for (var f = "", g = 0; d[e][g] != null; g++)
				f += "to:" + d[e][g] + " OR from:" + d[e][g] + (d[e][g + 1] == null
						? ""
						: " OR ");
		this._queries[e] = f;
		c.log(f)
}
d = ListOperators.slidingWindowOnList(b, TwitterNetworkedSearch.MAX_USERS_PER_QUERY, TwitterNetworkedSearch.MAX_USERS_PER_QUERY, 1);
for (e = 0; d[e] != null; e++) {
		f = "";
		for (g = 0; d[e][g] != null; g++)
				f += '"' + d[e][g] + '"' + (d[e][g + 1] == null
						? ""
						: " OR ");
		this
				._queries
				.push(f);
		c.log(f)
}
};
TwitterNetworkedSearch.prototype.search = function () {};
TwitterSearch.prototype.constructor = TwitterSearch;
function TwitterSearch(a) {
this._warnFunction = a;
this._drawString = this._newString = this._string = this._newSearchString = this._searchString = "";
this._fileData = null;
this.preventRepetitions = this.loading = !1
}
TwitterSearch.prototype.search = function (a, b, d, e) {
this._newSearchString = this.expand(a);
this.nMaxToLoad = this._maxResults = e != void 0
		? e
		: -1;
this._nPage = 1;
this.nLoaded = 0;
b = e < 100
		? e
		: 100;
this.loading = !0;
c.log("TWITTER SEARCH |\u00a0search:", a);
c.log("this._searchString!=this._newSearchString", this._searchString != this._newSearchString);
c.log("this._searchString:", this._searchString);
c.log("this._newSearchString:", this._newSearchString);
c.log("maxResults:", e);
if (!this.preventRepetitions || this._searchString != this._newSearchString)
		c.log("start search"),
		this._string = "Loading Twitter Data",
		this._isComplete = !1,
		this._searchString = this._newSearchString,
		TwitterApi.searchKeyword(this._searchString, this.onComplete, b, 1, this)
};
TwitterSearch.prototype.clean = function () {
this._idList = this._table = null
};
TwitterSearch.prototype.onComplete = function (a) {
c.log("TwitterSearch |\u00a0onComplete | e", a);
if (a.errorType == 0) {
		this._isComplete = !0;
		if (this._table == null) {
				this._table = new Table;
				var b = new List;
				b.id = "created_at";
				this
						._table
						.push(b);
				var d = new NumberList;
				d.id = "id";
				this
						._table
						.push(d);
				var e = new NumberList;
				e.id = "from_user_id";
				this
						._table
						.push(e);
				var f = new List;
				f.id = "from_user";
				this
						._table
						.push(f);
				var g = new List;
				g.id = "iso_language_code";
				this
						._table
						.push(g);
				var h = new List;
				h.id = "profile_image_url";
				this
						._table
						.push(h);
				var k = new List;
				k.id = "geo";
				this
						._table
						.push(k);
				var l = new List;
				l.id = "text";
				this
						._table
						.push(l);
				var n = new NumberList;
				n.id = "to_user_id";
				this
						._table
						.push(n);
				var m = new List;
				m.id = "source";
				this
						._table
						.push(m)
		} else
				b = this._table[0],
				d = this._table[1],
				e = this._table[2],
				f = this._table[3],
				g = this._table[4],
				h = this._table[5],
				k = this._table[6],
				l = this._table[7],
				n = this._table[8],
				m = this._table[9];
		var o;
		for (o = 0; o < a.result.results.length; o++) {
				var p = a.result.results[o];
				b.push(new Date(DateOperators.parseDate(p.created_at)));
				d.push(p.id);
				e.push(p.from_user_id);
				f.push(p.from_user);
				g.push(p.iso_language_code);
				h.push(p.profile_image_url);
				k.push(p.geo != null
						? p.geo
						: "");
				l.push(p.text);
				n.push(p.to_user_id != null
						? p.to_user_id
						: "");
				m.push(decodeURI(p.source))
		}
		this._fileData = this._table;
		this.nLoaded = d.length;
		b = d == null
				? 0
				: d.length;
		this._maxResults > this._nPage * 100 && a.result.results.length > 90
				? (this._nPage++, TwitterApi.searchKeyword(this._searchString, this.onComplete, 100, this._nPage, this), this._string = "Loading " + b + "/" + this._maxResults)
				: (this._string = "Loaded " + b + "/" + this._maxResults, this.loading = !1);
		this._warnFunction(this._fileData)
}
};
TwitterSearch.prototype.expand = function (a) {
var b = /total\([a-zA-Z0-9_]+\)/g,
		d = a.split(b),
		b = a.match(b);
if (b == null)
		return a;
var a = d[0],
		e,
		f;
for (e = 0; b[e] != null; e++)
		f = b[e].substr(6, b[e].length - 7),
		a += "(to:" + f + " OR from:" + f + ")" + d[e + 1];
return a = a.replace(/\) +\(/g, ") OR (")
};
function TwitterSearchProcesses() {}
TwitterSearchProcesses.buildAggregatedTable = function (a) {
var b = a[2],
		d = a[0],
		e = a[5],
		f = a[7],
		a = a[3],
		g = ListOperators.countElementsRepetitionOnList(b);
aggregatedTable = new Table;
aggregatedTable[0] = g[0];
aggregatedTable[1] = new List;
aggregatedTable[2] = g[1];
aggregatedTable[3] = new NumberList;
aggregatedTable[4] = new List;
aggregatedTable[5] = new List;
aggregatedTable[6] = new List;
aggregatedTable[7] = new List;
aggregatedTable[8] = new List;
aggregatedTable[9] = new List;
var g = aggregatedTable[0].length,
		h,
		k;
for (h = 0; h < g; h++)
		k = ListOperators.indexesOfElement(b, aggregatedTable[0][h]),
		aggregatedTable[1][h] = a[k[0]],
		aggregatedTable[3][h] = k,
		aggregatedTable[4][h] = e[k[0]],
		aggregatedTable[5][h] = d[k[k.length - 1]],
		aggregatedTable[6][h] = d[k[0]],
		aggregatedTable[7][h] = f.getSubListByIndexes(k),
		aggregatedTable[8][h] = d.getSubListByIndexes(k);
return aggregatedTable
};
TwitterSearchProcesses.buildMentionsNetwork = function (a) {
var b,
		d,
		e,
		f,
		g,
		h,
		k = new Network,
		l = new List,
		n = /\b(rt|RT):? /gi,
		m;
nUsers = a[0].length;
for (b = 0; b < nUsers; b++)
		l.push(a[1][b].toLowerCase());
for (b = 0; b < nUsers; b++)
		e = a[1][b],
		d = a[0][b],
		d = new Node(d, e),
		k.addNode(d);
for (b = 0; b < nUsers; b++) {
		f = a[7][b];
		for (d = 0; f[d] != null; d++)
				if (g = StringOperators.allTextsBetweenStrings(StringOperators.removePunctuation(f[d], " ").toLowerCase() + " ", "@", " "), g != null) {
						m = f[d].search(n) == 0;
						for (e = 0; g[e] != null; e++)
								if (h = l.indexOf(g[e]), h > -1 && (h = new MentionRelation(k.nodeList[b], k.nodeList[h], d, f[d]), k.addRelation(h), m))
										h.isRT = !0
				}
		}
return k
};
TwitterSearchProcesses.buildRetweetsNetwork = function (a, b) {
var d = new Network,
		e,
		f = /\b(rt|RT):? @[a-zA-Z0-9_]+(: | |:)?/gi,
		g = new List,
		h,
		k,
		l;
for (e = 0; e < nUsers; e++)
		h = b[0].indexOf(a[2][e]),
		l = a[7][e],
		k = b[7][h].indexOf(l),
		h = new TweetNode(k, h),
		d.addNode(h),
		l = l.toLowerCase().replace(f, ""),
		k = g.lastIndexOf(l),
		k > -1 && (k = d.nodeList[k], relation = new RTRelation(k, h, k.userId, h.userId, k.nTweetFromUser, h.nTweetFromUser), d.addRelation(relation)),
		g.push(l);
for (e = 0; d.nodeList[e] != null; e++)
		if (h = d.nodeList[e], h.toNodeList.length > 0 && h.fromNodeList.length == 0)
				h.nThread = e;
		else if (h.fromNodeList.length > 0)
				h.nThread = h.fromNodeList[0].nThread;
return d
};
TwitterSearchProcesses.buildMergedNetworks = function (a, b, d) {
var e = d[0],
		f = d[7],
		g = d[8],
		b = new Network;
b.id = "merged";
for (var h = a.nodeList, k, l = 0; h[l] != null; l++)
		k = new TwitterUserNode(h[l].id, h[l].id, e[l], l, f[l].reverse(), g[l].reverse()),
		k.thumbnailUrl = d[4][l],
		b.addNode(k);
d = a.relationList;
for (l = 0; d[l] != null; l++)
		if (a = d[l], a.node0.id != a.node1.id)
				if (e = b.relationList.getFirstRelationBetweenNodesByIds(a.node0.id, a.node1.id), e == null
						? (e = b.nodeList.getNodeById(a.node0.id), f = b.nodeList.getNodeById(a.node1.id), e = new MergedRelation(e, f), b.addRelation(e))
						: (e.weight++, e.node0.id == a.node0.id
								? e.toWeight ++: e.fromWeight++), a.isRT)
						e.rtWeight++;
				else {
						if (e.tweets == null)
								e.tweets = new StringList;
						e
								.tweets
								.push(a.tweet)
				}
		return b
};
TwitterUserNode.prototype = new Node;
TwitterUserNode.prototype.constructor = TwitterUserNode;
function TwitterUserNode(a, b, d, e, f, g) {
Node.apply(this, [b, a]);
this.i = e;
this.userId = d;
this.tweets = f;
this.dates = g
}
TwitterUserNode.prototype.getLastTweet = function () {
return this.tweets[this.tweets.length - 1]
};
TwitterUserNode.prototype.getLastDate = function () {
return this.dates[this.dates.length - 1]
};
TwitterUserNode.prototype.loadThumbnail = function () {
Loader.loadImage(this.thumbnailUrl, this.onImageLoaded, this)
};
TwitterUserNode.prototype.onImageLoaded = function (a) {
this.image = a.result
};
TwitterUserNode.prototype.cloneUser = function () {
var a = new TwitterUserNode(this.id, this.id, this.userId, this.i, this.tweets, this.dates);
a.x = this.x;
a.y = this.y;
a.z = this.z;
a.nodeType = this.nodeType;
a.weight = this.weight;
a.descentWeight = this.descentWeight;
a.thumbnailUrl = this.thumbnailUrl;
a.image = this.image;
return a
};
TwitterWords.prototype.constructor = TwitterWords;
function TwitterWords(a) {
this._warnFunction = a;
this.nDays = 180
}
TwitterWords.prototype.search = function (a) {
Loader.loadData(this.buildQuery(a), this.onComplete, this)
};
TwitterWords.prototype.search = function (a) {
Loader.loadData(this.buildQuery(a), this.onComplete, this)
};
TwitterWords.prototype.searchMultiple = function (a) {
a.length < 7 && (c.log("-----\>[" + this.buildQuery(a.getConcatenated("/")) + "]"), Loader.loadData(this.buildQuery(a.getConcatenated("/")), this.onComplete, this))
};
TwitterWords.prototype.onComplete = function (a) {
a = StringOperators.firstTextBetweenStrings(a.result, "var plot = '", "'");
c.log(a);
var a = a.split(/\\n/g),
		b,
		d,
		e,
		f = new DateList,
		g = new Table;
g[0] = f;
b = StringOperators.splitString(a[0], " ");
b = b[1].split(",");
var h = (b.length - 1) / 2;
for (d = 0; d < h; d++)
		b = new NumberList,
		g[d + 1] = b;
c.log("array.length, nNumberLists", a.length, h);
for (var k = 0; a[k] != null; k++) {
		b = StringOperators.splitString(a[k], " ");
		d = DateOperators.stringToDate(b[0], 1);
		f[k] = d;
		b = b[1].split(",");
		for (d = 0; d < h; d++)
				e = Number(b[d * 2 + 2]),
				g[d + 1][k] = e
}
this._warnFunction(g)
};
TwitterWords.prototype.buildQuery = function (a) {
return "http://trendistic.indextank.com/" + a + "/_" + this.nDays + "-days"
};
WikipediaArticlesApi.prototype.constructor = WikipediaArticlesApi;
function WikipediaArticlesApi(a, b) {
this._warnFunction = a;
this.target = b
}
WikipediaArticlesApi.prototype.loadArticle = function (a, b) {
if (b == null || b)
		c.log("load:"),
		Loader.loadData("http://en.wikipedia.org/w/index.php?action=render&title=" + a, this.onComplete, this)
};
WikipediaArticlesApi.prototype.onComplete = function (a) {
this
		._warnFunction
		.call(this.target, a.result)
};
function WikipediaArticlesOperators() {}
WikipediaArticlesOperators.getLinksTableFromArticle = function (a, b) {
var d = new Table;
new StringList;
new StringList;
var e = new StringList;
c.log("article.length", a.length);
var e = [
				"JSTOR", "Special", "File"
		],
		f = StringOperators.allTextsBetweenStrings(a, '<a href="//en.wikipedia.org/wiki/', '"');
c.log("1. allWPLinks.length", f.length);
var g = 0;
for (; f[g] != null; g++) {
		var h = 0;
		b : for (; e[h] != null; h++)
				if (f[g].substr(0, e[h].length) == e[h]) {
						f.splice(g, 1);
						g--;
						break b
				}
		b && (f[g] = "http://en.wikipedia.org/wiki/" + f[g]);
		c.log(f[g])
}
c.log("2. allWPLinks.length", f.length);
f = f.getWithoutRepetitions();
c.log("3. allWPLinks.length", f.length);
e = StringOperators.allTextsBetweenStrings(a, 'class="external text" href="http:', '"');
c.log("\n\nexternalLinks.length", e.length);
for (g = 0; e[g] != null; g++)
		e[g] = "http://" + e[g],
		c.log(e[g]);
return d
};
WikipediaArticlesVisits.prototype.constructor = WikipediaArticlesVisits;
function WikipediaArticlesVisits(a, b) {
this.warnFunction = a;
this.target = b;
this.width = 130;
this.height = 16;
this._articlesToSeacrh = "";
this.fakeInfoMode = this.loading = !1
}
WikipediaArticlesVisits.prototype.search = function (a, b, d, e) {
this.searchString = "http://toolserver.org/~emw/index.php?c=wikistats&m=get_traffic_data&";
this.normalized = e;
for (e = 0; a[e] != null; e++)
		this.searchString += "p" + (e + 1) + "=" + a[e],
		a[e + 1] != null && (this.searchString += "&");
this.searchString += "&project1=en&from=" + (b.getMonth() + 1) + "/" + b.getDate() + "/" + b.getFullYear() + "&to=" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
c.log("WikipediaArticlesVisits | this.searchString:");
c.log(this.searchString);
this.fakeInfoMode
		? Loader.loadData("./resources/data/wpVisitsQuery.txt", this.onComplete, this)
		: Loader.loadData(this.searchString, this.onComplete, this)
};
WikipediaArticlesVisits.prototype.onComplete = function (a) {
var a = StringOperators.allTextsBetweenStrings(a.result, "[[", "]]"),
		b = StringOperators.allTextsBetweenStrings(a[0], '["', '",'),
		d = DateOperators.stringListToDateList(b, 1, "-"),
		e = new Table;
e[0] = d;
for (d = 0; a[d] != null; d++)
		b = StringOperators.allTextsBetweenStrings(a[d], '["', '",'),
		DateOperators.stringListToDateList(b, 1, "-");
for (d = 0; a[d] != null; d++)
		b = StringOperators.allTextsBetweenStrings(a[d], '", ', "]"),
		b = b.toNumberList(),
		this.normalized
				? e.push(b.getNormalized())
				: e.push(b);
this
		.warnFunction
		.call(this.target, e)
};
function Draw() {}
Draw.drawSmoothPolygon = function (a, b, d, e) {
var e = e == null
				? 30
				: e,
		f = b.length,
		g,
		h = d
				? b[f - 1]
				: b[0],
		k,
		l = h;
a.moveTo(h.x, h.y);
for (d = 0; b[d] != null; d++)
		g = b[d],
		k = b[d % f],
		h = GeometryOperators.getSoftenControlPoints(h, g, k, e),
		k = h[0],
		a.bezierCurveTo(l.x, l.y, k.x, k.y, g.x, g.y),
		l = h[1],
		h = g
};
Draw.fillRectangleWithImage = function (a, b, d, e, f) {
if (f != null)
		a.fillStyle = f,
		a.fillRect(b.x, b.y, b.width, b.height),
		a.fill();
switch (e) {
		case 0:
				a.drawImage(d, b.x, b.y, b.width, b.height);
				break;
		case 1:
				var g = b.x + Math.max(b.width - d.width, 0) * 0.5,
						h = b.y + Math.max(b.height - d.height, 0) * 0.5,
						e = Math.min(d.width, b.width),
						f = Math.min(d.height, b.height);
				a.drawImage(d, Math.max(d.width - b.width, 0) * 0.5, Math.max(d.height - b.height, 0) * 0.5, e, f, g, h, e, f);
				break;
		case 2:
				e = Math.min(d.width, b.width),
				f = Math.min(d.height, b.height),
				g = e / f,
				h = d.width / d.height,
				g < h && (f = e / h),
				g > h && (e = f / h),
				g = b.x + (b.width - e) * 0.5,
				h = b.y + (b.height - f) * 0.5,
				a.drawImage(d.image, 0, 0, d.width, d.height, g, h, e, f)
}
};
Draw.drawCircle = function (a, b, d, e) {
a.arc(b, d, e, 0, TwoPi, !0)
};
Draw.drawEllipse = function (a, b, d, e, f) {
var g = e * 0.5522848,
		h = f * 0.5522848,
		k = b + e,
		l = d + f;
a.moveTo(b - e, d);
a.bezierCurveTo(b - e, d - h, b - g, d - f, b, d - f);
a.bezierCurveTo(b + g, d - f, k, d - h, k, d);
a.bezierCurveTo(k, d + h, b + g, l, b, l);
a.bezierCurveTo(b - g, l, b - e, d + h, b - e, d);
a.moveTo(b - e, d)
};
Draw.drawPolygon = function (a, b, d, e, f) {
var g;
a.moveTo(e + b[0].x, f + b[0].y);
for (g = 1; b[g] != null; g++)
		a.lineTo(e + b[g].x, f + b[g].y);
d
		? a.lineTo(e + b[0].x, f + b[0].y)
		: a.moveTo(e + b[0].x, f + b[0].y)
};
Draw.drawRoundRect = function (a, b, d, e, f, g) {
var g = g || 0,
		h = d + f;
a.moveTo(b + g, d);
a.lineTo(b + e - g, d);
a.quadraticCurveTo(b + e, d, b + e, d + g);
a.lineTo(b + e, d + f - g);
a.quadraticCurveTo(b + e, h, b + e - g, h);
a.lineTo(b + g, h);
a.quadraticCurveTo(b, h, b, h - g);
a.lineTo(b, d + g);
a.quadraticCurveTo(b, d, b + g, d)
};
Draw.drawEquilateralTriangle = function (a, b, d, e, f) {
f = f || 0;
a.moveTo(e * Math.cos(f) + b, e * Math.sin(f) + d);
a.lineTo(e * Math.cos(f + 2.0944) + b, e * Math.sin(f + 2.0944) + d);
a.lineTo(e * Math.cos(f + 4.1888) + b, e * Math.sin(f + 4.1888) + d);
a.lineTo(e * Math.cos(f) + b, e * Math.sin(f) + d)
};
Draw.drawArrowTriangle = function (a, b, d, e) {
var f = b.angleToPoint(d),
		d = b.distanceToPoint(d);
this.drawTriangleFromBase(a, b.x, b.y, e, d, f)
};
Draw.drawTriangleFromBase = function (a, b, d, e, f, g) {
a.moveTo(b + 0.5 * e * Math.cos(g + Math.PI * 0.5), d + 0.5 * e * Math.sin(g + Math.PI * 0.5));
a.lineTo(b + 0.5 * e * Math.cos(g - Math.PI * 0.5), d + 0.5 * e * Math.sin(g - Math.PI * 0.5));
a.lineTo(b + f * Math.cos(g), d + f * Math.sin(g));
a.lineTo(b + 0.5 * e * Math.cos(g + Math.PI * 0.5), d + 0.5 * e * Math.sin(g + Math.PI * 0.5))
};
Draw.drawHorizontalFlowPiece = function (a, b, d, e, f, g, h, k) {
a.moveTo(b, e);
a.bezierCurveTo(b + k, e, d - k, g, d, g);
a.lineTo(d, h);
a.bezierCurveTo(d - k, h, b + k, f, b, f);
a.lineTo(b, e)
};
Draw.drawRectangles = function (a, b, d, e, f, g, h, k) {
var g = g || 0,
		l = 2 * g,
		n,
		m,
		o = f.length,
		p = new Rectangle;
for (n = 0; b[n] != null; n++)
		if (m = b[n], !(m.height <= g || m.width <= g))
				if (a.fillStyle = f[n % o], a.fillRect(m.x + d + g, m.y + e + g, m.width - l, m.height - l), h != null && h[n] != null)
						p.x = m.x + d + g,
						p.y = m.y + e + g,
						p.width = m.width - l,
						p.height = m.height - l,
						Draw.fillRectangleWithImage(a, p, h[n], k)
};
Draw.drawQuadrilater = function (a, b, d, e, f, g) {
g = g == null
		? !0
		: g;
a.moveTo(b.x, b.y);
a.lineTo(d.x, d.y);
a.lineTo(e.x, e.y);
a.lineTo(f.x, f.y);
g && a.lineTo(b.x, b.y)
};
function DrawSimpleVis() {}
DrawSimpleVis.drawSimpleBarChart = function (a, b, d, e) {
var e = e == null
				? ColorListOperators.colorListFromColorScale(new ColorScale)
				: e,
		d = d == null
				? new Rectangle(10, 10, 400, 300)
				: d,
		f = d.width / b.length,
		g = d.getBottom(),
		h = b.getNormalizedToMax(d.height),
		k;
for (k = 0; b[k] != null; k++)
		a.fillStyle = e[k],
		a.fillRect(d.x + k * f, g - h[k], f - 1, h[k])
};
DrawSimpleVis.drawIntervalsFlowTable = function () {
c.log("[!] MOVED TO IntervalTableDraw.js")
};
DrawSimpleVis.drawIntervalsWordsFlowTable = function () {
c.log("[!] MOVED TO IntervalTableDraw.js")
};
DrawSimpleVis.drawStackBarsFlowTable = function (a, b, d, e) {
var f = b.length,
		g,
		e = e == null
				? ColorListOperators.colorListFromColorScale(new ColorScale(ColorOperators.temperatureScale), f)
				: e,
		d = d == null
				? new Rectangle(10, 10, 400, 300)
				: d,
		h = b[0].length,
		k = d.width / (h - 1),
		l = d.height,
		n,
		m,
		o,
		p,
		t,
		f = b[f - 1];
p = 0;
var s = d.x,
		q = d.y;
a.strokeStyle = "white";
for (d = 0; b[d] != null; d++) {
		t = b[d];
		for (g = 1; g < h; g++)
				p = (1 - f[g].y) * 0.5 * l + d * 0 + q,
				n = new Point(g * k + s, t[g].x * l + p),
				m = new Point((g + 1) * k + s, t[g].x * l + p),
				o = new Point((g + 1) * k + s, t[g].y * l + p),
				p = new Point(g * k + s, t[g].y * l + p),
				a.fillStyle = e[d],
				a.beginPath(),
				a.moveTo(n.x, n.y),
				a.lineTo(m.x, m.y),
				a.lineTo(o.x, o.y),
				a.lineTo(p.x, p.y),
				a.lineTo(n.x, n.y),
				a.fill();
		a.fill()
}
};
function DrawTexts() {}
DrawTexts.POINT_TO_PIXEL = 1.3333;
DrawTexts.PIXEL_TO_POINT = 0.75;
DrawTexts.setContextTextProperties = function (a, b, d, e, f, g) {
g = g == null
		? ""
		: g;
g != "" && (g += " ");
context.fillStyle = a || "#000000";
context.font = g + (String(b) || "14") + "px " + (d || "Arial");
context.textAlign = e == null
		? "left"
		: e;
context.textBaseline = f == null
		? "top"
		: f
};
DrawTexts.fillTextWordWrap = function (a, b, d, e, f, g, h, k) {
b = this.textWordWrapReturnLines(a, b, g, h);
return this.fillTextWordWrapWithTextLines(a, b, d, e, h, f, k)
};
DrawTexts.fillTextWordWrapWithTextLines = function (a, b, d, e, f, g, h) {
var k;
if (f == 0 || f == null)
		f = 99999;
for (k = 0; b[k] != null; k++)
		if (a.fillText(b[k], d, e + k * g), (k + 2) * g > f)
				break;
return h
		? b.length * g
		: b.length
};
DrawTexts.textWordWrapReturnLines = function (a, b, d, e, f) {
d = d || 100;
f = f || 16;
e = f == 0
		? -1
		: Math.floor((e || 600) / f);
f = new StringList;
if (d <= 0)
		return f.push(b),
		f;
var b = b.split("\\n"),
		g,
		h = 0;
for (g = 0; g < b.length; g++) {
		for (var k = b[g].split(" "), l = 1; k.length > 0 && l <= k.length;) {
				var n = k
						.slice(0, l)
						.join(" ");
				if (a.measureText(n).width > d) {
						l == 1 && (l = 2);
						n = k
								.slice(0, l - 1)
								.join(" ");
						f.push(n);
						if (f.length == e)
								return f;
						h++;
						k = k.splice(l - 1);
						l = 1
				} else
						l++
				}
		l > 0 && (n = k.join(" "), f.push(n));
		h++
}
return f
};
DrawTexts.cropString = function (a, b, d) {
if (b != null) {
		d = d || 0;
		if (d <= 0 || a.measureText(b).width <= d)
				return b;
		for (var b = b.split(""), e = 1; b.length > 0 && e <= b.length;) {
				var f = b
						.slice(0, e)
						.join("");
				if (a.measureText(f).width > d)
						return e == 1 && (e = 2),
						b.slice(0, e - 1).join("");
				else
						e++
				}
		}
};
function DrawTextsAdvanced() {}
DrawTextsAdvanced.characterOnQuadrilater = function () {};
DrawTextsAdvanced.textOnQuadrilater = function (a, b, d, e, f, g, h, k) {
k = k == null
		? 0
		: k;
if (k == 1) {
		var k = new Point((d.x + e.x) * 0.5, (d.y + e.y) * 0.5),
				l = new Point((d.x + g.x) * 0.5, (d.y + g.y) * 0.5),
				n = new Point((f.x + g.x) * 0.5, (f.y + g.y) * 0.5),
				m = new Point((e.x + f.x) * 0.5, (e.y + f.y) * 0.5),
				o = new Point((k.x + n.x) * 0.5, (k.y + n.y) * 0.5);
		DrawTextsAdvanced.textOnQuadrilater(a, b, d, k, o, l, h, 2);
		DrawTextsAdvanced.textOnQuadrilater(a, b, k, e, m, o, h, 3);
		DrawTextsAdvanced.textOnQuadrilater(a, b, o, m, f, n, h, 4);
		DrawTextsAdvanced.textOnQuadrilater(a, b, l, o, n, g, h, 5)
} else {
		l = a
				.measureText(b)
				.width;
		switch (k) {
				case 0:
						n = new Point(0, 0);
						m = new Point(l, 0);
						o = new Point(1.0E-6, h + 1.0E-6);
						break;
				case 2:
						n = new Point(0, 0);
						m = new Point(l * 0.5, 0);
						o = new Point(1.0E-6, h * 0.5 + 1.0E-6);
						break;
				case 3:
						n = new Point(l * 0.5, 0);
						m = new Point(l, 0);
						o = new Point(l * 0.5 + 1.0E-6, h * 0.5 + 1.0E-6);
						break;
				case 4:
						n = new Point(l * 0.5, h * 0.5);
						m = new Point(l, h * 0.5);
						o = new Point(l * 0.5 + 1.0E-6, h + 1.0E-6);
						break;
				case 5:
						n = new Point(0, h * 0.5),
						m = new Point(l * 0.5, h * 0.5),
						o = new Point(1.0E-6, h + 1.0E-6)
		}
		a.save();
		DrawTextsAdvanced.applyTransformationOnCanvasFromPoints(a, n, m, o, d, e, g);
		a.beginPath();
		a.moveTo(n.x - 2, n.y - 2);
		a.lineTo(m.x + 8, m.y - 2);
		a.lineTo(o.x - 2, o.y + 8);
		a.clip();
		a.fillText(b, 0, 0);
		a.restore();
		n.x = m.x + 1.0E-4;
		n.y = o.y + 1.0E-4;
		a.save();
		DrawTextsAdvanced.applyTransformationOnCanvasFromPoints(a, n, m, o, f, e, g);
		a.beginPath();
		a.moveTo(n.x + 4, n.y + 2);
		a.lineTo(m.x + 4, m.y - 2);
		a.lineTo(o.x - 2, o.y + 2);
		a.clip();
		a.fillText(b, 0, 0);
		a.restore()
}
};
DrawTextsAdvanced.applyTransformationOnCanvasFromPoints = function (a, b, d, e, f, g, h) {
b = MatrixGenerators.createMatrixFromTrianglesMapping(b, d, e, f, g, h);
a.transform(b.a, b.b, b.c, b.d, b.tx, b.ty)
};
ColorPicker.prototype.constructor = ColorPicker;
function ColorPicker() {
this.y = this.x = 0;
this.height = this.width = 200;
this.nV = this.nH = 10;
this.saturation = 1;
this.dHue = 360 / (this.nH + 1);
this.dLight = 1 / (this.nH + 2);
this.visible = !1;
this.backgroundColor = "rgb(200,200,200)";
this.margin = 2
}
ColorPicker.prototype.draw = function () {
var a = this.width / this.nH,
		b = this.height / this.nV,
		d = a - 2 * this.margin,
		e = b - 2 * this.margin;
context.fillStyle = this.backgroundColor;
context.fillRect(this.x, this.y, this.width, this.height);
for (var f = 0; f < this.nH; f++)
		for (var g = 0; g < this.nV; g++)
				context.fillStyle = this.colorAtSquare(f, g),
				context.fillRect(this.x + f * a + this.margin, this.y + g * b + this.margin, d, e)
};
ColorPicker.prototype.colorAtSquare = function (a, b) {
return a < this.nH - 1
		? ColorOperators.HSLtoHEX(a * this.dHue, this.saturation, (b + 1) * this.dLight)
		: ColorOperators.grayByLevel(b / (this.nV - 1))
};
ColorPicker.prototype.colorBelowMouse = function () {
return mouseX < this.x || mouseX > this.x + this.width || mouseY < this.y || mouseY > this.y + this.height
		? null
		: this.colorFromCoordinate(mouseX - this.x, mouseY - this.y)
};
ColorPicker.prototype.colorFromCoordinate = function (a, b) {
return this.colorAtSquare(this.nH * a / this.width, this.nV * b / this.height)
};
DragDetection.prototype.constructor = DragDetection;
function DragDetection(a, b, d, e) {
this.mode = a || 0;
this.listenerFunction = b;
this.target = d;
this.areaVerificationFunction = e;
this.factor = 1;
this.center = new Point(0, 0);
addInteractionEventListener("mousedown", this.onMouse, this);
addInteractionEventListener("mouseup", this.onMouse, this);
this.dragging = !1;
this.mouseClickPosition = new Point;
this.mousePosition = new Point;
this.a = this.r = 0;
this.dragVector = new Point
}
DragDetection.prototype.enterframe = function (a) {
switch (a.mode) {
		case 0:
				a.dragVector.x = (mouseX - a.mousePosition.x) * a.factor;
				a.dragVector.y = (mouseY - a.mousePosition.y) * a.factor;
				a.mousePosition.x = mouseX;
				a.mousePosition.y = mouseY;
				break;
		case 1:
				a.dragVector.x = mouseX - a.mouseClickPosition.x;
				a.dragVector.y = mouseY - a.mouseClickPosition.y;
				break;
		case 2:
				var b = mouseX - a.center.x,
						d = mouseY - a.center.y,
						e = Math.sqrt(Math.pow(b, 2) + Math.pow(d, 2)),
						b = Math.atan2(d, b);
				a.dragVector.x = e - a.r;
				a.dragVector.y = b - a.a;
				a.r = e;
				a.a = b
}
a
		.listenerFunction
		.call(a.target, a.dragVector)
};
DragDetection.prototype.onMouse = function (a) {
switch (a.type) {
		case "mousedown":
				if (this.areaVerificationFunction != null && !this.areaVerificationFunction.call(this.target))
						break;
				this.dragging = !0;
				this.mouseClickPosition.x = mouseX;
				this.mouseClickPosition.y = mouseY;
				this.mousePosition.x = mouseX;
				this.mousePosition.y = mouseY;
				var a = mouseX - this.center.x,
						b = mouseY - this.center.y;
				this.r = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
				this.a = Math.atan2(b, a);
				this.dragVector.x = 0;
				this.dragVector.y = 0;
				this.idInterval != null && clearInterval(this.idInterval);
				this.idInterval = setInterval(this.enterframe, 30, this);
				break;
		case "mouseup":
				this.dragging = !1,
				clearInterval(this.idInterval),
				this.idInterval = null
}
};
InputTextField.prototype.constructor = InputTextField;
function InputTextField(a) {
this.id = a;
this.y = this.x = 0;
this.width = 200;
this.height = 18;
this.focused = this.hovered = !1;
this.textColor = "black";
this.textSize = "14";
this.textFont = "Arial";
this.textAlign = "left";
this.textbaseLine = "top";
this.textStyle = "";
this.backgroundColor = "rgba(255,255,255,0.8)";
this.borderStyle = null;
this.borderWidth = 1;
this.cursorVisible = !0;
this._intervalID = setInterval(this.cursorCycle, 500, this);
addInteractionEventListener("mousedown", this.onMouse, this);
addInteractionEventListener("keydown", this.onKeyDown, this);
this._time = 0;
this.allSelected = !1;
this._assocativeKeys = {
		49: [
				"1", "!", "\u2018"
		],
		71: [
				"g", "G", "@"
		],
		186: [
				";", ":", "\u00b6"
		],
		187: [
				"=", "+", "\u00b1"
		],
		189: ["-", "_", "\u2013"]
}
}
InputTextField.prototype.onMouse = function () {
this.focused = this.hovered;
clearInterval(this._intervalID);
this.focused
		? (this.allSelected = (new Date).getTime() - this._time < 400, this._time = (new Date).getTime(), this._intervalID = setInterval(this.cursorCycle, 500, this))
		: this.allSelected = !1;
this.cursorVisible = this.focused
};
InputTextField.prototype.setEnterFunction = function (a, b) {
this.enterFunction = a;
this.enterFunctionTarget = b
};
InputTextField.prototype.cursorCycle = function (a) {
a.cursorVisible = !a.cursorVisible
};
InputTextField.prototype.onKeyDown = function (a) {
if (this.focused) {
		var b = "",
				b = document.all
						? window.event.keyCode
						: a.keyCode;
		if (b == 8)
				this.text = this.allSelected
						? ""
						: this.text.substr(0, this.text.length - 1);
		else if (b == 13)
				this.enterFunction != null && this.enterFunction.call(this.enterFunctionTarget, this.id);
		else {
				var d = String.fromCharCode(b);
				c.log("onKeyDown x:" + b + ", character: [" + d + "]");
				if (this._assocativeKeys[b] != null) {
						if (this.allSelected)
								this.text = "";
						d = a.shiftKey
								? this._assocativeKeys[b][1]
								: a.altKey
										? this._assocativeKeys[b][2]
										: this._assocativeKeys[b][0];
						this.text += d
				} else if (d.match(/[a-zA-Z0-9 _\-#@:$%^&*\(\)\.]/)) {
						if (this.allSelected)
								this.text = "";
						d = a.shiftKey
								? d.match(/[0-9]/)
										? ") ! @ # $ % ^ & * (".split(" ")[Number(d)]
										: d.toUpperCase()
								: d.toLowerCase();
						this.text += d
				}
		}
		this.allSelected = !1
}
};
InputTextField.prototype.draw = function (a) {
if (this.hovered = mouseY > this.y && mouseY < this.y + this.height && mouseX > this.x && mouseX < this.x + this.width)
		canvas.style.cursor = "text";
a.fillStyle = this.backgroundColor;
a.fillRect(this.x, this.y, this.width, this.height);
DrawTexts.setContextTextProperties(this.textColor, this.textSize, this.textFont, this.textAlign, this.textbaseLine, this.textStyle);
for (var b = this.text, d = a.measureText(b).width, e = d; e > this.width;)
		b = this.text.substr(0, b.length - 2) + "\u2026",
		e = a.measureText(b).width;
if (d < this.width && this.cursorVisible)
		a.strokeStyle = "black",
		a.lineWidth = 1,
		a.beginPath(),
		a.moveTo(this.x + d + 2, this.y + 2),
		a.lineTo(this.x + d + 2, this.y + this.height - 2),
		a.stroke();
if (this.allSelected)
		a.fillStyle = "rgb(150,150,150)",
		a.fillRect(this.x + 1, this.y + 2, e - 2, this.height - 4);
DrawTexts.setContextTextProperties(this.textColor, this.textSize, this.textFont, this.textAlign, this.textbaseLine, this.textStyle);
a.fillStyle = b == "" || b == null
		? "gray"
		: this.textColor;
b = (b == "" || b == null) && this.baseText != null
		? this.baseText
		: b;
a.fillText(b, this.x, this.y)
};
InputTextField.prototype.setText = function (a) {
this.text = a
};
InputTextField.prototype.getText = function () {
return this.text
};
InputTextFieldHTML.prototype.constructor = InputTextFieldHTML;
function InputTextFieldHTML(a) {
this.id = a;
this.x = 300;
this.y = 2;
this.width = 200;
this.height = 20;
this.zIndex = 30;
this.textColor = "black";
this.backgroundColor = "#FFFFFF";
this.main = document.getElementById("qJU4JntGP");
this.div = document.createElement("div2");
this.DOMtext = document.createElement("textarea");
this
		.DOMtext
		.setAttribute("type", "text");
this
		.div
		.setAttribute("style", "position:absolute;top:" + this.y + "px;left:" + this.x + "px;z-index:" + this.zIndex + ";");
this
		.div
		.setAttribute("rows", "1");
this
		.main
		.appendChild(this.div);
this
		.div
		.appendChild(this.DOMtext);
this.DOMtext.value = "";
addInteractionEventListener("keydown", this.onKeyDown, this);
this.draw()
}
InputTextFieldHTML.prototype.draw = function () {
if (this.x != this._prevX || this.y != this._prevY || this.width != this._prevWidth || this.height != this._prevHeight)
		this._prevX = this.x,
		this._prevY = this.y,
		this._prevWidth = this.width,
		this._prevHeight = this.height,
		this.DOMtext.style = "none",
		this.DOMtext.style.padding = "0px",
		this.DOMtext.style.border = "0px",
		this.DOMtext.style.borderColor = "#FFFFFF",
		this.DOMtext.style.background = "transparent",
		this.DOMtext.style.resize = "none",
		this.DOMtext.setAttribute("style", "color: " + this.textColor + "; width:" + this.width + "px;height:" + this.height + "px;"),
		this.div.setAttribute("style", "position:absolute;top:" + this.y + "px;left:" + this.x + "px;z-index:" + this.zIndex + ";")
};
InputTextFieldHTML.prototype.setText = function (a) {
this.DOMtext.value = this.text = a
};
InputTextFieldHTML.prototype.getText = function () {
return this.DOMtext.value
};
InputTextFieldHTML.prototype.onKeyDown = function (a) {
this._eKeyDown = a;
setTimeout(this.onKeyDownDelayed, 4, this)
};
InputTextFieldHTML.prototype.onKeyDownDelayed = function (a) {
if (a.text != a.DOMtext.value) {
		a.text = a.DOMtext.value;
		var b = a
				.text
				.charAt(a.text.length - 1);
		b == StringOperators.ENTER || b == StringOperators.ENTER2 || b == StringOperators.ENTER3
				? (a.setText(a.text.substr(0, a.text.length - 1)), a.enterFunction != null && a.enterFunction.call(a.enterFunctionTarget, a.id))
				: a.changeFunction != null && a
						.changeFunction
						.call(a.changeFunctionTarget, a.id)
}
};
InputTextFieldHTML.prototype.setEnterFunction = function (a, b) {
this.enterFunction = a;
this.enterFunctionTarget = b
};
InputTextFieldHTML.prototype.setChangeFunction = function (a, b) {
this.changeFunction = enterFunction;
this.changeFunctionTarget = b
};
TextBox.prototype.constructor = TextBox;
function TextBox(a) {
this.x = 300;
this.y = 2;
this.width = 200;
this.text = a == null
		? ""
		: a;
this.fontColor = "black";
this.fontSize = "14";
this.fontName = "Arial";
this.fontStyle = "";
this.lineHeight = 14;
this.lineWidth = 2;
this.setText(this.text);
addInteractionEventListener("mousedown", this.mouseDown, this)
}
TextBox.prototype.setText = function (a) {
this.text = a;
var b,
		d = this
				.text
				.split("<e");
if (d.length > 1) {
		var e,
				f;
		this.links = new StringList;
		this.linksType = new StringList;
		for (var g = new List, h, a = 1; d[a] != null; a++)
				if (e = d[a].indexOf("*"), b = d[a].lastIndexOf("*"), f = d[a].indexOf(">"), e > 0 && f > e) {
						this
								.links
								.push(d[a].substr(0, e));
						e == b || d[a].charAt(b + 1) == "b"
								? (d[a] = d[a].substring(e + 1, f) + d[a].substr(f + 1), this.linksType.push("blank"))
								: (d[a] = d[a].substring(e + 1, b) + d[a].substr(f + 1), this.linksType.push("self"));
						h = d[a - 1].length;
						h -= 1 * (d[a - 1].split("\\n").length - 1);
						for (b = 0; b < a - 1; b++)
								h += d[b].length,
								h -= 1 * (d[b].split("\\n").length - 1);
						g.push(new Interval(h, f - e - 1))
				}
		this.text = d.join("")
} else
		this.pointPairs = this.links = null;
DrawTexts.setContextTextProperties(this.fontColor, this.fontSize, this.fontName, null, null, this.fontStyle);
this.lines = DrawTexts.textWordWrapReturnLines(context, this.text, this.width, 0, this.lineHeight);
this.height = this.lines.length * this.lineHeight;
if (this.links != null) {
		f = 0;
		this.pointPairs = [];
		for (a = 0; this.links[a] != null; a++) {
				e = g[a];
				for (b = f = 0; this.lines[b] != null; b++) {
						h = this.lines[b];
						if (e.x >= f && e.x < f + h.length) {
								d = context
										.measureText(h.substr(0, e.x - f))
										.width;
								e = context
										.measureText(h.substr(0, e.x + e.y - f))
										.width;
								b = b * this.lineHeight + 0.5;
								this
										.pointPairs
										.push({x0: d, x1: e, y: b});
								break
						}
						f += h.length + 1
				}
		}
}
for (b = f = 0; this.lines[b] != null; b++)
		h = this.lines[b],
		f += h.length + 1;
DrawTexts.setContextTextProperties(this.fontColor, this.fontSize, this.fontName, null, null, this.fontStyle);
for (a = this.maxWidth = 0; this.lines[a] != null; a++)
		this.maxWidth = Math.max(this.maxWidth, context.measureText(this.lines[a]).width)
};
TextBox.prototype.draw = function () {
if (this.backgroundColor != null)
		context.fillStyle = this.backgroundColor,
		context.fillRect(this.x, this.y, this.width, this.height);
DrawTexts.setContextTextProperties(this.fontColor, this.fontSize, this.fontName, null, null, this.fontStyle);
DrawTexts.fillTextWordWrapWithTextLines(context, this.lines, this.x, this.y, 0, this.lineHeight);
var a,
		b,
		d,
		e;
this.overLink = null;
if (this.pointPairs != null) {
		context.lineWidth = this.lineWidth;
		context.strokeStyle = this.fontColor;
		for (var f = 0; this.pointPairs[f] != null; f++)
				if (a = this.pointPairs[f].x0 + this.x, b = this.pointPairs[f].x1 + this.x, d = this.pointPairs[f].y + this.y, e = Math.floor(d + this.fontSize), this.line(a, b, e + 0.5), mouseY > d && mouseY < e && mouseX > a && mouseX < b)
						canvas.style.cursor = "pointer",
						this.overLink = f
}
};
TextBox.prototype.line = function (a, b, d) {
context.beginPath();
context.moveTo(a, d);
context.lineTo(b, d);
context.stroke()
};
TextBox.prototype.mouseDown = function () {
this.overLink != null && (this.linksType[this.overLink] == "blank"
		? window.open(this.links[this.overLink])
		: window.open(this.links[this.overLink], "_self"))
};
TextButton.prototype.constructor = TextButton;
function TextButton(a, b, d, e) {
this.text = a;
this.warnFunction = b;
this.target = d;
this.id = e;
this.fontColor = "black";
this.fontSize = "14";
this.fontName = "Arial";
this.fontStyle = "";
this.y = this.x = 0;
this.underline = !1;
this.active = !0;
this._updateDimensions();
addInteractionEventListener("mousedown", this.onMouse, this)
}
TextButton.prototype.onMouse = function () {
this.active && this.mouseOnButton() && this
		.warnFunction
		.call(this.target, this.id)
};
TextButton.prototype.setText = function (a) {
this.text = a;
this._updateDimensions()
};
TextButton.prototype.setTextProperties = function (a, b, d, e) {
this.fontColor = a;
this.fontSize = b;
this.fontName = d;
this.fontStyle = e;
this._updateDimensions()
};
TextButton.prototype._updateDimensions = function () {
DrawTexts.setContextTextProperties(this.fontColor, this.fontSize, this.fontName, null, null, this.fontStyle);
this.width = context
		.measureText(this.text)
		.width;
this.height = this.fontSize * DrawTexts.POINT_TO_PIXEL
};
TextButton.prototype.draw = function () {
if (this.backgroundColor != null)
		context.fillStyle = this.backgroundColor,
		context.fillRect(this.x, this.y, this.width, this.height);
DrawTexts.setContextTextProperties(this.fontColor, this.fontSize, this.fontName, null, null, this.fontStyle);
context.fillText(this.text, this.x, this.y);
if (this.underline) {
		var a = Math.floor(this.y + this.height * 0.8) + 0.5;
		context.strokeStyle = this.fontColor;
		context.lineWidth = 2;
		context.beginPath();
		context.moveTo(this.x, a);
		context.lineTo(this.x + this.width, a);
		context.stroke()
}
if (this.active && this.mouseOnButton())
		canvas.style.cursor = "pointer"
};
TextButton.prototype.mouseOnButton = function () {
return mouseY > this.y && mouseY < this.y + this.height && mouseX > this.x && mouseX < this.x + this.width
};
TextFieldHTML.prototype.constructor = TextFieldHTML;
function TextFieldHTML() {
this.x = 300;
this.y = 2;
this.width = 200;
this.height = 20;
this.zIndex = 30;
this.textColor = "black";
this.backgroundColor = "#FFFFFF";
this.main = document.getElementById("qJU4JntGP");
this.div = document.createElement("div2");
this
		.div
		.setAttribute("style", "position:absolute;top:" + this.y + "px;left:" + this.x + "px;z-index:" + this.zIndex + ";");
this
		.main
		.appendChild(this.div);
this.setText(this.text);
this.draw()
}
TextFieldHTML.prototype.draw = function () {
if (this.x != this._prevX || this.y != this._prevY || this.width != this._prevWidth || this.height != this._prevHeight)
		this._prevX = this.x,
		this._prevY = this.y,
		this._prevWidth = this.width,
		this._prevHeight = this.height,
		this.div.setAttribute("style", "position:absolute;top:" + this.y + "px;left:" + this.x + "px;z-index:" + this.zIndex + "; width:" + this.width + "px;height:" + this.height + "px;")
};
TextFieldHTML.prototype.setText = function (a) {
if (this.text != a)
		this.text = a,
		this.div.innerHTML = FastHtml.expand(a)
};
TextFieldHTML.prototype.getText = function () {
return this.DOMtext.value
};
ToolTip.prototype.constructor = ToolTip;
function ToolTip(a) {
this.target = a == null
		? this
		: a;
this.width = 500;
this.height = 200;
this.visible = !1;
this.interlines_space = 16;
this.heightMax = 600;
this.y = this.x = 0;
this.pointedY = this.pointedX = -1;
this.drawContentFunction = this.drawText;
this.toolTipPlacement = 4
}
ToolTip.prototype.draw = function () {
this.visible && (this.drawShape(), this.drawContentFunction.call(this.target))
};
ToolTip.prototype.drawText = function () {
DrawTexts.setContextTextProperties("black", 12);
DrawTexts.fillTextWordWrapWithTextLines(context, this.lines, this.x + 4, this.y + 4, this.height, this.interlines_space)
};
ToolTip.prototype.setText = function (a, b) {
if (!(a == void 0 || a == "")) {
		this.textSize = b || 12;
		a == void 0 && (a = "");
		if (a != this.text)
				this.text = a,
				DrawTexts.setContextTextProperties("black", this.textSize, "Arial", "right", "top"),
				this.lines = DrawTexts.textWordWrapReturnLines(context, a, this.width - 8, this.heightMax),
				this.drawContentFunction = this.drawText,
				this.target = this;
		this.height = this.lines.length * this.interlines_space + 12;
		this.settedMode = 0
}
};
ToolTip.prototype.drawShape = function () {
context.fillStyle = "rgba(255,255,255,0.9)";
switch (this.toolTipPlacement) {
		case 2:
				this.x = 0.7 * this.x + 0.3 * Math.min(Math.max(5, mouseX - this.width * 0.3), canvasWidth - this.width - 5);
				this.y = 0.7 * this.y + 0.3 * Math.min(Math.max(5, mouseY + 50), this.pointedY + 30);
				this.drawShapeInPlace(2);
				break;
		case 4:
				var a = Math.atan2((this.pointedY - canvasHeight * 0.5) / canvasHeight, (this.pointedX - canvasWidth * 0.5) / canvasWidth) + Math.PI,
						b = Math.sqrt(Math.pow(this.width * 0.5, 2), Math.pow(this.height * 0.5, 2)) * 1.2,
						a = new Point(this.pointedX + b * Math.cos(a), this.pointedY + b * Math.sin(a));
				this.x = a.x - this.width * 0.5;
				this.y = a.y - this.height * 0.5;
				var d;
				if (this.y > this.pointedY)
						this.y = this.pointedY + 20,
						d = 2;
				else if (this.y < this.pointedY - this.height)
						this.y = this.pointedY - this.height - 20,
						d = 0;
				else if (this.x > this.pointedX)
						this.x = this.pointedX + 20,
						d = 1;
				else if (this.x < this.pointedX - this.width)
						this.x = this.pointedX - this.width - 20,
						d = 3;
				this.drawShapeInPlace(d)
}
};
ToolTip.prototype.drawShapeInPlace = function (a) {
context.beginPath();
switch (a) {
		case 0:
				a = Math.max(Math.min(this.pointedX, this.x + this.width - 10), this.x + 10);
				context.moveTo(this.x, this.y);
				context.lineTo(this.x + this.width, this.y);
				context.lineTo(this.x + this.width, this.y + this.height);
				context.lineTo(a + 10, this.y + this.height);
				context.lineTo(this.pointedX, this.pointedY);
				context.lineTo(a - 10, this.y + this.height);
				context.lineTo(this.x, this.y + this.height);
				context.lineTo(this.x, this.y);
				break;
		case 1:
				a = Math.min(Math.max(this.pointedY, this.y + 10), this.y + this.height - 10);
				context.moveTo(this.x, this.y);
				context.lineTo(this.x + this.width, this.y);
				context.lineTo(this.x + this.width, this.y + this.height);
				context.lineTo(this.x, this.y + this.height);
				context.lineTo(this.x, a + 10);
				context.lineTo(this.x - 20, this.pointedY);
				context.lineTo(this.x, a - 10);
				context.lineTo(this.x, this.y);
				break;
		case 2:
				a = Math.max(Math.min(this.pointedX, this.x + this.width - 10), this.x + 10);
				context.moveTo(this.x, this.y);
				context.lineTo(a - 10, this.y);
				context.lineTo(this.pointedX, this.pointedY);
				context.lineTo(a + 10, this.y);
				context.lineTo(this.x + this.width, this.y);
				context.lineTo(this.x + this.width, this.y + this.height);
				context.lineTo(this.x, this.y + this.height);
				context.lineTo(this.x, this.y);
				break;
		case 3:
				a = Math.min(Math.max(this.pointedY, this.y + 10), this.y + this.height - 10),
				context.moveTo(this.x, this.y),
				context.lineTo(this.x + this.width, this.y),
				context.lineTo(this.x + this.width, a - 10),
				context.lineTo(this.x + this.width + 20, this.pointedY),
				context.lineTo(this.x + this.width, a + 10),
				context.lineTo(this.x + this.width, this.y + this.height),
				context.lineTo(this.x, this.y + this.height),
				context.lineTo(this.x, this.y)
}
context.fill()
};
var Loader = new function () {};
Loader.proxy = "";
function LoaderRequest(a, b, d) {
this.url = a;
this.method = b
		? b
		: "GET";
this.data = d
}
Loader.loadImage = function (a, b, d) {
var e = d
				? d
				: arguments.callee,
		f = document.createElement("img");
f.onload = function () {
		var d = new LoadEvent;
		d.result = f;
		d.url = a;
		b.call(e, d)
};
f.onerror = function () {
		var d = new LoadEvent;
		d.errorType = 1;
		d.errorMessage = "There was a problem retrieving the image [" + f.src + "]:";
		d.url = a;
		b.call(e, d)
};
f.src = Loader.proxy + a
};
Loader.loadJSON = function (a, b) {
Loader
		.loadData(a, function (a) {
				b.call(arguments.callee, jQuery.parseJSON(a))
		})
};
Loader.callIndex = 0;
Loader.loadJSONP = function (a, b, d) {
Loader.callIndex += 1;
var e = Loader.callIndex,
		f = a + "&callback=JSONcallback" + e,
		g = d
				? d
				: arguments.callee;
c.log("Loader.loadJSONP, newUrl:", f);
$.ajax({
		url: f,
		type: "GET",
		data: {},
		dataType: "jsonp",
		contentType: "application/json",
		jsonp: "jsonp",
		jsonpCallback: "JSONcallback" + e,
		success: function (a) {
				c.log("Loader.loadJSONP | succes, data:", a);
				var d = new LoadEvent;
				d.result = a;
				c.log("e:", d);
				c.log("e.result:", d.result);
				c.log("target:", g);
				b.call(g, d)
		}
})
};
Loader.loadData = function (a, b, d) {
c.log("Loader.loadData | url:", a);
var e = String(a).substr(0, 4) == "http",
		f = new XMLHttpRequest,
		g = d
				? d
				: arguments.callee,
		h = function () {
				if (f.readyState == 4) {
						var d = new LoadEvent;
						d.url = a;
						f.status == 200 || f.status == 0 && f.responseText != null
								? d.result = f.responseText
								: (c.log("[!] There was a problem retrieving the data [" + f.status + "]:\n" + f.statusText), d.errorType = f.status, d.errorMessage = "[!] There was a problem retrieving the data [" + f.status + "]:" + f.statusText);
						b.call(g, d)
				}
		};
if (window.XMLHttpRequest && !window.ActiveXObject)
		try {
				f = new XMLHttpRequest
		} catch (k) {
				f = !1
		}
else if (window.ActiveXObject)
		try {
				f = new ActiveXObject("Msxml2.XMLHTTP.6.0")
		} catch (l) {
				try {
						f = new ActiveXObject("Msxml2.XMLHTTP.3.0")
				} catch (n) {
						try {
								f = new ActiveXObject("Msxml2.XMLHTTP")
						} catch (m) {
								try {
										f = new ActiveXObject("Microsoft.XMLHTTP")
								} catch (o) {
										f = !1
								}
						}
				}
		}
if (f)
		f.onreadystatechange = h,
		e
				? f.open("GET", Loader.proxy + a, !0)
				: f.open("GET", a, !0),
		f.send("")
};
Loader.loadXML = function (a, b) {
function d() {
		e.readyState == 4 && (e.status == 200
				? f(e.responseXML)
				: alert("There was a problem retrieving the XML data:\n" + e.statusText))
}
var e = new XMLHttpRequest,
		f = b;
if (window.XMLHttpRequest && !window.ActiveXObject)
		try {
				e = new XMLHttpRequest
		} catch (g) {
				e = !1
		}
else if (window.ActiveXObject)
		try {
				e = new ActiveXObject("Msxml2.XMLHTTP")
		} catch (h) {
				try {
						e = new ActiveXObject("Microsoft.XMLHTTP")
				} catch (k) {
						e = !1
				}
		}
if (e)
		e.onreadystatechange = d,
		e.open("GET", a, !0),
		e.send("")
};
LoadEvent.prototype = {};
LoadEvent.prototype.constructor = LoadEvent;
function LoadEvent() {
Object.apply(this);
this.result = null;
this.errorType = 0;
this.errorMessage = ""
}
MultiLoader.prototype = {};
MultiLoader.prototype.constructor = MultiLoader;
function MultiLoader() {
this.onComplete = this.urlList = null;
this.iLoaded = 0;
this.target = null;
this.loading = !1;
this.imagesLoaded = this.datasLoaded = null;
this.associativeArray = [];
this.simulateDelay = !1;
this.DELAY_MILLISECONDS = 1E3
}
MultiLoader.prototype.loadDatas = function (a, b, d) {
this.urlList = a;
this.target = d
		? d
		: arguments.callee;
this.onComplete = b;
this.datasLoaded = new List;
this.nextDataLoading()
};
MultiLoader.prototype.nextDataLoading = function () {
c.log("MultiLoader.prototype.nextDataLoading | this.urlList[this.iLoaded]:", this.urlList[this.iLoaded]);
this.iLoaded < this.urlList.length
		? (Loader.loadData(this.urlList[this.iLoaded], this.onCompleteLoadData, this), this.loading = !0)
		: this.loading = !1
};
MultiLoader.prototype.onCompleteLoadData = function (a) {
this.priorityWeights != null
		? this.datasLoaded[
				this
						.urlList
						.indexOf(a.url)
		] = a.result
		: this
				.datasLoaded
				.push(a.result);
this.associativeArray[a.url] = a.result;
var b = new LoadEvent;
b.result = this.datasLoaded;
b.url = a.url;
this
		.onComplete
		.call(this.target, b);
this.loading = !1;
this.iLoaded++;
this.nextDataLoading()
};
MultiLoader.prototype.loadImages = function (a, b, d, e) {
this.urlList = a;
this.target = d
		? d
		: arguments.callee;
this.onComplete = b;
this.priorityWeights = e;
this.imagesLoaded = new List;
this.nextImageLoading()
};
MultiLoader.prototype.onCompleteLoadImage = function (a) {
this.priorityWeights != null
		? this.imagesLoaded[
				this
						.urlList
						.indexOf(a.url)
		] = a.result
		: this
				.imagesLoaded
				.push(a.result);
this.associativeArray[a.url] = a.result;
var b = new LoadEvent;
b.result = this.imagesLoaded;
b.url = a.url;
this
		.onComplete
		.call(this.target, b);
this.loading = !1;
this.iLoaded++;
this.nextImageLoading()
};
MultiLoader.prototype.setPriorityWeights = function (a) {
this.priorityWeights = a;
this.loading || this.nextImageLoading()
};
MultiLoader.prototype.nextImageLoading = function (a) {
if (this.simulateDelay || a != null)
		a == null
				? (this.loading = !0, this.timer = setTimeout(this.nextImageLoading, this.DELAY_MILLISECONDS, this))
				: (a.loading = !1, a.simulateDelay = !1, a.nextImageLoading(), a.simulateDelay = !0);
else if (this.iLoaded < this.urlList.length)
		if (this.priorityWeights != null) {
				var b,
						a = -99999999,
						d;
				for (d = 0; this.urlList[d] != null; d++)
						this.priorityWeights[d] > a && this.associativeArray[this.urlList[d]] == null && (a = this.priorityWeights[d], b = d);
				a > 0
						? (c.log("MultiLoader | nextImageLoading:", this.urlList[this.iLoaded]), Loader.loadImage(this.urlList[b], this.onCompleteLoadImage, this), this.loading = !0)
						: c.log("MultiLoader stopped due to max wieght <= 0")
		} else
				Loader.loadImage(this.urlList[this.iLoaded], this.onCompleteLoadImage, this),
				this.loading = !0;
else
		this.loading = !1
};
function Forces(a, b, d, e) {
this.k = a
		? a
		: 0.01;
this.dEqSprings = b
		? b
		: 100;
this.dEqRepulsors = d
		? d
		: 200;
this.friction = e
		? e
		: 0.8;
this.nodeList = new NodeList;
this.forcesList = new List;
this.equilibriumDistances = new NumberList;
this.forcesTypeList = new List;
this.fromNodeList = new NodeList;
this.toNodeList = new NodeList
}
Forces.prototype.forcesForNetwork = function (a, b, d, e, f) {
b = b || 0;
d = d || new Point(0, 0);
e = e == null
		? 0
		: e;
f = f == null
		? !1
		: f;
this.forcesList = new List;
this.equilibriumDistances = new NumberList;
this.forcesTypeList = new List;
this.fromNodeList = new NodeList;
this.toNodeList = new NodeList;
var g = a.nodeList.length,
		h,
		k,
		l = a.relationList;
for (h = 0; h < g; h++)
		b == 0
				? this.addNode(a.nodeList[h], new Point(a.nodeList[h].x, a.nodeList[h].y))
				: (k = Math.random() * TwoPi, this.addNode(a.nodeList[h], new Point(d.x + b * Math.cos(k), d.y + b * Math.sin(k))));
for (h = 0; h < g - 1; h++) {
		b = a.nodeList[h];
		for (k = h + 1; k < g; k++)
				if (d = a.nodeList[k], l.nodesAreConnected(b, d)) {
						switch (e) {
								case 0:
										this
												.equilibriumDistances
												.push(this.dEqSprings);
										break;
								case 1:
										this
												.equilibriumDistances
												.push((1.2 - l.getFirstRelationBetweenNodesByIds(b.id, d.id, !1).weight) * this.dEqSprings);
										break;
								case 2:
										this
												.equilibriumDistances
												.push(Math.sqrt(Math.min(b.nodeList.length, d.nodeList.length)) * this.dEqSprings * 0.1)
						}
						this.addForce(b, d, "Spring");
						f && (this.equilibriumDistances.push(this.dEqRepulsors * 0.5), this.addForce(b, d, "Repulsor"))
				}
		else
				this
						.equilibriumDistances
						.push(this.dEqRepulsors),
				this.addForce(b, d, "Repulsor")
}
};
Forces.prototype.addNode = function (a, b, d) {
b = b == null
		? new Point(Math.random() * 200 - 100, Math.random() * 200 - 100)
		: b;
d = d == null
		? new Point(0, 0)
		: d;
this
		.nodeList
		.push(a);
a.x = b.x;
a.y = b.y;
a.vx = d.x;
a.vy = d.y;
a.ax = 0;
a.ay = 0
};
Forces.prototype.addForce = function (a, b, d) {
this
		.fromNodeList
		.push(a);
this
		.toNodeList
		.push(b);
this
		.forcesList
		.push(a.id + "*" + b.id + "*" + d);
this
		.forcesTypeList
		.push(d)
};
Forces.prototype.calculate = function () {
this.resetAccelerations();
var a,
		b,
		d,
		e,
		f,
		g,
		h,
		k;
for (a = 0; this.forcesList[a] != null; a++)
		switch (b = this.fromNodeList[a], d = this.toNodeList[a], e = this.forcesTypeList[a], k = this.equilibriumDistances[a], f = d.x - b.x, g = d.y - b.y, h = Math.sqrt(Math.pow(f, 2) + Math.pow(g, 2)), e) {
				case "Spring":
						e = this.k * (h - k) / h;
						b.ax += e * f;
						b.ay += e * g;
						d.ax -= e * f;
						d.ay -= e * g;
						break;
				case "Repulsor":
						h < k && (e = this.k * (h - k) / h, b.ax += e * f, b.ay += e * g, d.ax -= e * f, d.ay -= e * g)
		}
};
Forces.prototype.attractionToPoint = function (a, b, d) {
var b = b == null
				? 1
				: b,
		e,
		f,
		g,
		h;
for (i = 0; this.nodeList[i] != null; i++)
		e = this.nodeList[i],
		g = a.x - e.x,
		h = a.y - e.y,
		f = Math.pow(g, 2) + Math.pow(h, 2),
		f = d != null
				? Math.min(b / f, d)
				: b / f,
		e.ax += f * g,
		e.ay += f * h
};
Forces.prototype.applyForces = function () {
var a;
for (i = 0; this.nodeList[i] != null; i++)
		a = this.nodeList[i],
		a.vx += a.ax,
		a.vy += a.ay,
		a.vx *= this.friction,
		a.vy *= this.friction,
		a.x += a.vx,
		a.y += a.vy
};
Forces.prototype.deactivateForcesFromNode = function (a) {
a.vx = a.vy = a.ax = a.ay = 0
};
Forces.prototype.resetAccelerations = function () {
var a;
for (i = 0; this.nodeList[i] != null; i++)
		a = this.nodeList[i],
		a.ax = 0,
		a.ay = 0
};
Engine3D.prototype.constructor = Engine3D;
function Engine3D() {
this.id = "";
this.type = "Engine3D";
this.lens = 300;
this._freeRotation = !1;
this.setBasis(new Polygon3D(new Point3D(1, 0, 0), new Point3D(0, 1, 0), new Point3D(0, 0, 1)));
this._cuttingPlane = 10
}
Engine3D.prototype.setBasis = function (a) {
this._basis = a.clone();
this._basisBase = a.clone();
this._provisionalBase = a.clone()
};
Engine3D.prototype.setAngles = function (a) {
this._angles = a.clone();
this._freeRotation = !1;
this._basis = this.basis3DRotation(this._basisBase, this._angles)
};
Engine3D.prototype.applyRotation = function (a) {
if (!this._freeRotation)
		this._freeRotation = !0,
		this.updateAngles(),
		this._provisionalBase[0] = this._basis[0].clone(),
		this._provisionalBase[1] = this._basis[1].clone(),
		this._provisionalBase[2] = this._basis[2].clone();
this._basis[0] = this.point3DRotation(this._provisionalBase[0], new Point3D(-a.y, a.x, 0));
this._basis[1] = this.point3DRotation(this._provisionalBase[1], new Point3D(-a.y, a.x, 0));
this._basis[2] = this.point3DRotation(this._provisionalBase[2], new Point3D(-a.y, a.x, 0));
this._provisionalBase[0] = this
		._basis[0]
		.clone();
this._provisionalBase[1] = this
		._basis[1]
		.clone();
this._provisionalBase[2] = this
		._basis[2]
		.clone()
};
Engine3D.prototype.projection3D = function (a) {
prescale = this.lens / (this.lens + (this._basis[0].z * a.x + this._basis[1].z * a.y + this._basis[2].z * a.z));
return new Point3D((this._basis[0].x * a.x + this._basis[1].x * a.y + this._basis[2].x * a.z) * prescale, (this._basis[0].y * a.x + this._basis[1].y * a.y + this._basis[2].y * a.z) * prescale, prescale)
};
Engine3D.prototype.projection3DNode = function (a) {
prescale = this.lens / (this.lens + (this._basis[0].z * a.x + this._basis[1].z * a.y + this._basis[2].z * a.z));
return new Point3D((this._basis[0].x * a.x + this._basis[1].x * a.y + this._basis[2].x * a.z) * prescale, (this._basis[0].y * a.x + this._basis[1].y * a.y + this._basis[2].y * a.z) * prescale, prescale)
};
Engine3D.prototype.scale = function (a) {
return this.lens / (this.lens + (this._basis[0].z * a.x + this._basis[1].z * a.y + this._basis[2].z * a.z))
};
Engine3D.prototype.sortedIndexesByPointsScale = function (a) {
for (var b = [], d = 0; a[d] != null; d++)
		b[d] = [a[d], d];
UTLITARY_GLOBAL_VAR = this._basis;
b = b.sort(this._sortingCriteria, this._basis);
UTLITARY_GLOBAL_VAR = null;
for (var e = new NumberList, d = 0; a[d] != null; d++)
		e[d] = b[d][1];
return e
};
Engine3D.prototype.sortListByPointsScale = function (a, b) {
for (var d = [], e = 0; a[e] != null; e++)
		d[e] = [b[e], a[e]];
UTLITARY_GLOBAL_VAR = this._basis;
d = d.sort(this._sortingCriteria, this._basis);
UTLITARY_GLOBAL_VAR = null;
var f = instantiateWithSameType(a);
f.id = a;
for (e = 0; a[e] != null; e++)
		f[e] = d[e][1];
return f
};
Engine3D.prototype._sortingCriteria = function (a, b) {
var d = a[0],
		e = b[0];
return UTLITARY_GLOBAL_VAR[0].z * d.x + UTLITARY_GLOBAL_VAR[1].z * d.y + UTLITARY_GLOBAL_VAR[2].z * d.z < UTLITARY_GLOBAL_VAR[0].z * e.x + UTLITARY_GLOBAL_VAR[1].z * e.y + UTLITARY_GLOBAL_VAR[2].z * e.z
		? 1
		: -1
};
Engine3D.prototype.updateAngles = function () {
this._angles = this.eulerAngles()
};
Engine3D.prototype.eulerAngles = function () {console.log(this._basis);
return new Point3D(Math.atan2(-this._basis[1].z, this._basis[2].z), Math.asin(this._basis[0].z), Math.atan2(-this._basis[0].y, this._basis[0].x))
};
Engine3D.prototype.basis3DRotation = function (a, b) {
var ca = Math.cos(b.x),
sa = Math.sin(b.x),
cb = Math.cos(b.y),
sb = Math.sin(b.y),
cg = Math.cos(b.z),
sg = Math.sin(b.z);
return new Polygon3D(new Point3D(a[0].x * cg * cb + a[0].y * (cg * sa * sb + sg * ca) + a[0].z * (sg * sa - cg * ca * sb), -a[0].x * sg * cb + a[0].y * (cg * ca - sg * sa * sb) + a[0].z * (sg * ca * sb + cg * sa), a[0].x * sb - a[0].y * sa * cb + a[0].z * cb * ca), new Point3D(a[1].x * cg * cb + a[1].y * (cg * sa * sb + sg * ca) + a[1].z * (sg * sa - cg * ca * sb), -a[1].x * sg * cb + a[1].y * (cg * ca - sg * sa * sb) + a[1].z * (sg * ca * sb + cg * sa), a[1].x * sb - a[1].y * sa * cb + a[1].z * cb * ca), new Point3D(a[2].x * cg * cb + a[2].y * (cg * sa * sb + sg * ca) + a[2].z * (sg * sa - cg * ca * sb), -a[2].x * sg * cb + a[2].y * (cg * ca - sg * sa * sb) + a[2].z * (sg * ca * sb + cg * sa), a[2].x * sb - a[2].y * sa * cb + a[2].z * cb * ca))
};
Engine3D.prototype.point3DRotation = function (a, b) {
var ca = Math.cos(b.x),
sa = Math.sin(b.x),
cb = Math.cos(b.y),
sb = Math.sin(b.y),
cg = Math.cos(b.z),
sg = Math.sin(b.z);
return new Point3D(a.x * cg * cb + a.y * (cg * sa * sb + sg * ca) + a.z * (sg * sa - cg * ca * sb), -a.x * sg * cb + a.y * (cg * ca - sg * sa * sb) + a.z * (sg * ca * sb + cg * sa), a.x * sb - a.y * sa * cb + a.z * cb * ca)
};
Engine3D.prototype.line3D = function (a, b) {
var d = new Polygon3D,
		e = this.lens / (this.lens + (this._basis[0].z * a.x + this._basis[1].z * a.y + this._basis[2].z * a.z)),
		f = this.lens / (this.lens + (this._basis[0].z * b.x + this._basis[1].z * b.y + this._basis[2].z * b.z));
if (e > 0 || f > 0) {
		if (e > 0 && f > 0)
				d.push(new Point((this._basis[0].x * a.x + this._basis[1].x * a.y + this._basis[2].x * a.z) * e, (this._basis[0].y * a.x + this._basis[1].y * a.y + this._basis[2].y * a.z) * e)),
				d.push(new Point((this._basis[0].x * b.x + this._basis[1].x * b.y + this._basis[2].x * b.z) * f, (this._basis[0].y * b.x + this._basis[1].y * b.y + this._basis[2].y * b.z) * f));
		else {
				var g = new Point3D(this._basis[0].x * a.x + this._basis[1].x * a.y + this._basis[2].x * a.z, this._basis[0].y * a.x + this._basis[1].y * a.y + this._basis[2].y * a.z, this._basis[0].z * a.x + this._basis[1].z * a.y + this._basis[2].z * a.z),
						h = new Point3D(this._basis[0].x * b.x + this._basis[1].x * b.y + this._basis[2].x * b.z, this._basis[0].y * b.x + this._basis[1].y * b.y + this._basis[2].y * b.z, this._basis[0].z * b.x + this._basis[1].z * b.y + this._basis[2].z * b.z),
						k = (-this.lens + this._cuttingPlane - g.z) / (h.z - g.z),
						k = new Point3D(g.x + k * (h.x - g.x), g.y + k * (h.y - g.y), -this.lens + this._cuttingPlane),
						l = this.lens / (this.lens + k.z);
				e > 0
						? (d.push(new Point(g.x * e, g.y * e)), d.push(new Point(k.x * l, k.y * l)))
						: (d.push(new Point(k.x * l, k.y * l)), d.push(new Point(h.x * f, h.y * f)))
		}
		return d
}
return null
};
function typeOf(a) {
var b = typeof a;
return b !== "object"
		? b
		: a === null
				? "null"
				: a.getDate != null
						? "date"
						: a.getType()
}
function VOID() {}
function instantiate(a, b) {
switch (a) {
		case "number": return Number(b);
		case "string": return String(b);
		case "date":
				if (!b || b.length == 0)
						return new Date;
				if (b.length == 1) {
						if (b[0].match(/\d*.-\d*.-\d*\D\d*.:\d*.:\d*/)) {
								var d = b[0].split(" ");
								d[0] = d[0].split("-");
								d[1] = d[1]
										? d[1].split(":")
										: [0, 0, 0];
								return new Date(Date.UTC(d[0][0], Number(d[0][1]) - 1, d[0][2], d[1][0], d[1][1], d[1][2]))
						}
						return Number(b[0]) != "NaN"
								? new Date(Number(b[0]))
								: new Date(b[0])
				}
				return new Date(Date.UTC.apply(null, b));
		case "boolean":
				return Boolean(b == "false" || b == "0" ? false : true);
		case "List": return new List(b);
		case "Table": return new Table(b);
		case "StringList": return new StringList(b);
		case "NumberList": return new NumberList(b);
		case "NumberTable": return new NumberTable(b);
		case "NodeList": return new NodeList(b);
		case "RelationList": return new RelationList(b);
		case "Polygon": return new Polygon(b);
		case "Polygon3D": return new Polygon3D(b);
		case "PolygonList": return new PolygonList(b);
		case "DateList": return new DateList(b);
		case "ColorList": return new ColorList(b);
}
var e,d = window[a];
e = function () {};
e.prototype = d.prototype;
e = new e;
d.apply(e, b);
return e
}
function instantiateWithSameType(a, b) {
return instantiate(typeOf(a), b)
}
Date.prototype.getType = function () {
return "Date"
};
var uniqueGlobalFunc = [];
function getUniqueGlobalFunc(a, b) {
uniqueGlobalFunc.push([a, b]);
return uniqueGlobalFunc.length - 1
}
function executeUniqueGlobalFunc(a, b) {
a != void 0 && uniqueGlobalFunc[a][0].call(uniqueGlobalFunc[a][1], b)
}
function ConsoleTools() {}
ConsoleTools.NumberTableOnConsole = function (a) {
var b = "",
		d,
		e,
		f,
		g;
c.log(a);
for (g = 0; g < a[0].length; g++) {
		d = "|";
		for (f = 0; a[f] != null; f++) {
				for (e = String(Math.floor(100 * a[f][g]) / 100).replace(/0./, "."); e.length < 3;)
						e = " " + e;
				d += e + "|"
		}
		b += d + "\n"
}
c.log(b);
return b
};
function FastHtml() {}
FastHtml.expand = function (a, b, d) {
if (a == null || a == "")
		return "";
if (a.split("<").length != a.split(">").length)
		return a;
for (var e = ""; e != null;)
		e = StringOperators.firstTextBetweenStrings(a, "<fs", ">"),
		e != null && (a = a.replace("<fs" + e + ">", '<font size="' + (Number(e) - 12) + '">')),
		a.indexOf(">") == -1 && (e = null);
for (e = ""; e != null;)
		e = StringOperators.firstTextBetweenStrings(a, "<ff", ">"),
		e != null && (a = a.replace("<ff" + e + ">", '<font face="' + e + '">'));
a = a.replace(/\u00ac/, "<br/>");
a = a.replace(/<fcBlack>/g, '<font color="#000000">');
a = a.replace(/<fcWhite>/g, '<font color="#FFFFFF">');
a = a.replace(/<fcRed>/g, '<font color="#FF0000">');
a = a.replace(/<fcGreen>/g, '<font color="#00FF00">');
a = a.replace(/<fcBlue>/g, '<font color="#0000FF">');
a = a.replace(/<fcOrange>/g, '<font color="#FFAA00">');
a = a.replace(/<fcCyan>/g, '<font color="#00FFFF">');
a = a.replace(/<fcYellow>/g, '<font color="#FFFF00">');
a = a.replace(/<fcMagenta>/g, '<font color="#FF00FF">');
for (e = ""; e != null;)
		e = StringOperators.firstTextBetweenStrings(a, "<fcuint", ">"),
		e != null && (a = a.replace("<fcuint" + e + ">", '<font color="' + ColorOperators.uinttoHEX(e) + '">'));
for (e = ""; e != null;)
		if (e = StringOperators.firstTextBetweenStrings(a, "<frgb", ">"), e != null)
				var f = e.split("."),
						a = a.replace("<frgb" + e + ">", '<font color="' + ColorOperators.RGBtoHEX(Number(f[0]), Number(f[1]), Number(f[2])) + '">');
for (e = ""; e != null;)
		e = StringOperators.firstTextBetweenStrings(a, "<fc", ">"),
		e != null && (a = a.replace("<fc" + e + ">", '<font color="#' + e + '">'));
for (e = ""; e != null;)
		e = StringOperators.firstTextBetweenStrings(a, "<tl", ">"),
		e != null && (a = a.replace("<tl" + e + ">", '<textformat leftmargin="' + e + '">'));
for (e = ""; e != null;)
		e = StringOperators.firstTextBetweenStrings(a, "<tv", ">"),
		e != null && (a = a.replace("<tv" + e + ">", '<textformat leading="' + e + '">'));
for (var e = "", g, h; e != null;)
		e = StringOperators.firstTextBetweenStrings(a, "<e", ">"),
		e != null && (f = e.split("*")[0],
		g = e.split("*")[1],
		h = e.split("*").length > 2 && e.split("*")[2] == "s"
				? "_self"
				: "_blank",
		f.substr(0, 7) == "http://" || f.substr(0, 8) == "https://"
				? a = a.replace("<e" + e + ">", "<u><a href='" + f + "' target='" + h + "'>" + g + "</a></u>")
				: (h = getUniqueGlobalFunc(d, b), a = a.replace("<e" + e + ">", "<u><a href='javascript:void(0)' onclick='event.preventDefault(); executeUniqueGl" +
								"obalFunc(" + h + ", " + f + ");return false; '>" + g + "</a></u>")));
a = a.replace(/<pl>/g, '<p align="left">');
a = a.replace(/<pc>/g, '<p align="center">');
a = a.replace(/<pr>/g, '<p align="right">');
a = a.replace(/<pj>/g, '<p align="justify">');
a = a.replace(/<\/f>/g, "</font>");
a = a.replace(/<\/t>/g, "</textformat>");
c.log("/////////FastHtml convertion////////");
c.log(a);
c.log("////////////////////////////////////");
return a
};
FastHtml.findAndPlaceLinks = function (a) {
var b = a.split(/http:\/\//g);
if (b.length > 1) {
		var d = [],
				e,
				f;
		d[0] = b[0];
		for (var g = 1; b[g] != null; g++)
				e = b[g].search(/ |:|;/),
				e > -1
						? (f = "http://" + b[g].substr(0, e), d[g] = "<e" + f + "*" + f + ">" + b[g].substr(e))
						: (f = "http://" + b[g].substr(0), d[g] = "<e" + f + "*" + f + ">")
		}
return b.length == 0 || b.length == 1
		? a
		: d.join("")
};
FastHtml.findAndPlaceTwitterAdresses = function (a) {
var b = a.split(/@/g);
if (b.length > 1) {
		var d = [],
				e,
				f,
				g;
		d[0] = b[0];
		for (var h = 1; b[h] != null; h++)
				e = b[h].search(/ |:|;/),
				e > -1
						? (g = b[h].substr(0, e), f = "https://twitter.com/" + g, d[h] = "<e" + f + "*@" + g + ">" + b[h].substr(e))
						: (g = b[h].substr(0), f = "https://twitter.com/" + g, d[h] = "<e" + f + "*@" + g + ">")
		}
return b.length == 0 || b.length == 1
		? a
		: d.join("")
};
function MD5() {}
MD5.hex_md5 = function (a) {
return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(a)))
};
MD5.b64_md5 = function (a) {
return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(a)))
};
MD5.any_md5 = function (a, b) {
return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(a)), b)
};
MD5.hex_hmac_md5 = function (a, b) {
return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(a), this.str2rstr_utf8(b)))
};
MD5.b64_hmac_md5 = function (a, b) {
return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(a), this.str2rstr_utf8(b)))
};
MD5.any_hmac_md5 = function (a, b, d) {
return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(a), this.str2rstr_utf8(b)), d)
};
MD5.md5_vm_test = function () {
return this
		.hex_md5("abc")
		.toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
};
MD5.rstr_md5 = function (a) {
return this.binl2rstr(this.binl_md5(this.rstr2binl(a), a.length * 8))
};
MD5.rstr_hmac_md5 = function (a, b) {
var d = rstr2binl(a);
d.length > 16 && (d = this.binl_md5(d, a.length * 8));
for (var e = Array(16), f = Array(16), g = 0; g < 16; g++)
		e[g] = d[g] ^ 909522486,
		f[g] = d[g] ^ 1549556828;
d = this.binl_md5(e.concat(this.rstr2binl(b)), 512 + b.length * 8);
return this.binl2rstr(this.binl_md5(f.concat(d), 640))
};
MD5.rstr2hex = function (a) {
for (var b = "", d, e = 0; e < a.length; e++)
		d = a.charCodeAt(e),
		b += "0123456789abcdef".charAt(d >>> 4 & 15) + "0123456789abcdef".charAt(d & 15);
return b
};
MD5.rstr2b64 = function (a) {
for (var b = "", d = a.length, e = 0; e < d; e += 3)
		for (var f = a.charCodeAt(e) << 16 | (e + 1 < d
				? a.charCodeAt(e + 1) << 8
				: 0) | (e + 2 < d
				? a.charCodeAt(e + 2)
				: 0), g = 0; g < 4; g++)
				b += e * 8 + g * 6 > a.length * 8
						? ""
						: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f >>> 6 * (3 - g) & 63);
return b
};
MD5.rstr2any = function (a, b) {
var d = b.length,
		e,
		f,
		g,
		h,
		k,
		l = Array(Math.ceil(a.length / 2));
for (e = 0; e < l.length; e++)
		l[e] = a.charCodeAt(e * 2) << 8 | a.charCodeAt(e * 2 + 1);
var n = Math.ceil(a.length * 8 / (Math.log(b.length) / Math.log(2))),
		m = Array(n);
for (f = 0; f < n; f++) {
		k = [];
		for (e = h = 0; e < l.length; e++)
				if (h = (h << 16) + l[e], g = Math.floor(h / d), h -= g * d, k.length > 0 || g > 0)
						k[k.length] = g;
m[f] = h;
		l = k
}
d = "";
for (e = m.length - 1; e >= 0; e--)
		d += b.charAt(m[e]);
return d
};
MD5.str2rstr_utf8 = function (a) {
for (var b = "", d = -1, e, f; ++d < a.length;)
		e = a.charCodeAt(d),
		f = d + 1 < a.length
				? a.charCodeAt(d + 1)
				: 0,
		55296 <= e && e <= 56319 && 56320 <= f && f <= 57343 && (e = 65536 + ((e & 1023) << 10) + (f & 1023), d++),
		e <= 127
				? b += String.fromCharCode(e)
				: e <= 2047
						? b += String.fromCharCode(192 | e >>> 6 & 31, 128 | e & 63)
						: e <= 65535
								? b += String.fromCharCode(224 | e >>> 12 & 15, 128 | e >>> 6 & 63, 128 | e & 63)
								: e <= 2097151 && (b += String.fromCharCode(240 | e >>> 18 & 7, 128 | e >>> 12 & 63, 128 | e >>> 6 & 63, 128 | e & 63));
return b
};
MD5.str2rstr_utf16le = function (a) {
for (var b = "", d = 0; d < a.length; d++)
		b += String.fromCharCode(a.charCodeAt(d) & 255, a.charCodeAt(d) >>> 8 & 255);
return b
};
MD5.str2rstr_utf16be = function (a) {
for (var b = "", d = 0; d < a.length; d++)
		b += String.fromCharCode(a.charCodeAt(d) >>> 8 & 255, a.charCodeAt(d) & 255);
return b
};
MD5.rstr2binl = function (a) {
for (var b = Array(a.length >> 2), d = 0; d < b.length; d++)
		b[d] = 0;
for (d = 0; d < a.length * 8; d += 8)
		b[d >> 5] |= (a.charCodeAt(d / 8) & 255) << d % 32;
return b
};
MD5.binl2rstr = function (a) {
for (var b = "", d = 0; d < a.length * 32; d += 8)
		b += String.fromCharCode(a[d >> 5] >>> d % 32 & 255);
return b
};
MD5.binl_md5 = function (a, b) {
a[b >> 5] |= 128 << b % 32;
a[(b + 64 >>> 9 << 4) + 14] = b;
for (var d = 1732584193, e = -271733879, f = -1732584194, g = 271733878, h = 0; h < a.length; h += 16)
		var k = d,
		l = e,
		n = f,
		m = g,
		d = this.md5_ff(d, e, f, g, a[h + 0], 7, -680876936),
		g = this.md5_ff(g, d, e, f, a[h + 1], 12, -389564586),
		f = this.md5_ff(f, g, d, e, a[h + 2], 17, 606105819),
		e = this.md5_ff(e, f, g, d, a[h + 3], 22, -1044525330),
		d = this.md5_ff(d, e, f, g, a[h + 4], 7, -176418897),
		g = this.md5_ff(g, d, e, f, a[h + 5], 12, 1200080426),
		f = this.md5_ff(f, g, d, e, a[h + 6], 17, -1473231341),
		e = this.md5_ff(e, f, g, d, a[h + 7], 22, -45705983),
		d = this.md5_ff(d, e, f, g, a[h + 8], 7, 1770035416),
		g = this.md5_ff(g, d, e, f, a[h + 9], 12, -1958414417),
		f = this.md5_ff(f, g, d, e, a[h + 10], 17, -42063),
		e = this.md5_ff(e, f, g, d, a[h + 11], 22, -1990404162),
		d = this.md5_ff(d, e, f, g, a[h + 12], 7, 1804603682),
		g = this.md5_ff(g, d, e, f, a[h + 13], 12, -40341101),
		f = this.md5_ff(f, g, d, e, a[h + 14], 17, -1502002290),
		e = this.md5_ff(e, f, g, d, a[h + 15], 22, 1236535329),
		d = this.md5_gg(d, e, f, g, a[h + 1], 5, -165796510),
		g = this.md5_gg(g, d, e, f, a[h + 6], 9, -1069501632),
		f = this.md5_gg(f, g, d, e, a[h + 11], 14, 643717713),
		e = this.md5_gg(e, f, g, d, a[h + 0], 20, -373897302),
		d = this.md5_gg(d, e, f, g, a[h + 5], 5, -701558691),
		g = this.md5_gg(g, d, e, f, a[h + 10], 9, 38016083),
		f = this.md5_gg(f, g, d, e, a[h + 15], 14, -660478335),
		e = this.md5_gg(e, f, g, d, a[h + 4], 20, -405537848),
		d = this.md5_gg(d, e, f, g, a[h + 9], 5, 568446438),
		g = this.md5_gg(g, d, e, f, a[h + 14], 9, -1019803690),
		f = this.md5_gg(f, g, d, e, a[h + 3], 14, -187363961),
		e = this.md5_gg(e, f, g, d, a[h + 8], 20, 1163531501),
		d = this.md5_gg(d, e, f, g, a[h + 13], 5, -1444681467),
		g = this.md5_gg(g, d, e, f, a[h + 2], 9, -51403784),
		f = this.md5_gg(f, g, d, e, a[h + 7], 14, 1735328473),
		e = this.md5_gg(e, f, g, d, a[h + 12], 20, -1926607734),
		d = this.md5_hh(d, e, f, g, a[h + 5], 4, -378558),
		g = this.md5_hh(g, d, e, f, a[h + 8], 11, -2022574463),
		f = this.md5_hh(f, g, d, e, a[h + 11], 16, 1839030562),
		e = this.md5_hh(e, f, g, d, a[h + 14], 23, -35309556),
		d = this.md5_hh(d, e, f, g, a[h + 1], 4, -1530992060),
		g = this.md5_hh(g, d, e, f, a[h + 4], 11, 1272893353),
		f = this.md5_hh(f, g, d, e, a[h + 7], 16, -155497632),
		e = this.md5_hh(e, f, g, d, a[h + 10], 23, -1094730640),
		d = this.md5_hh(d, e, f, g, a[h + 13], 4, 681279174),
		g = this.md5_hh(g, d, e, f, a[h + 0], 11, -358537222),
		f = this.md5_hh(f, g, d, e, a[h + 3], 16, -722521979),
		e = this.md5_hh(e, f, g, d, a[h + 6], 23, 76029189),
		d = this.md5_hh(d, e, f, g, a[h + 9], 4, -640364487),
		g = this.md5_hh(g, d, e, f, a[h + 12], 11, -421815835),
		f = this.md5_hh(f, g, d, e, a[h + 15], 16, 530742520),
		e = this.md5_hh(e, f, g, d, a[h + 2], 23, -995338651),
		d = this.md5_ii(d, e, f, g, a[h + 0], 6, -198630844),
		g = this.md5_ii(g, d, e, f, a[h + 7], 10, 1126891415),
		f = this.md5_ii(f, g, d, e, a[h + 14], 15, -1416354905),
		e = this.md5_ii(e, f, g, d, a[h + 5], 21, -57434055),
		d = this.md5_ii(d, e, f, g, a[h + 12], 6, 1700485571),
		g = this.md5_ii(g, d, e, f, a[h + 3], 10, -1894986606),
		f = this.md5_ii(f, g, d, e, a[h + 10], 15, -1051523),
		e = this.md5_ii(e, f, g, d, a[h + 1], 21, -2054922799),
		d = this.md5_ii(d, e, f, g, a[h + 8], 6, 1873313359),
		g = this.md5_ii(g, d, e, f, a[h + 15], 10, -30611744),
		f = this.md5_ii(f, g, d, e, a[h + 6], 15, -1560198380),
		e = this.md5_ii(e, f, g, d, a[h + 13], 21, 1309151649),
		d = this.md5_ii(d, e, f, g, a[h + 4], 6, -145523070),
		g = this.md5_ii(g, d, e, f, a[h + 11], 10, -1120210379),
		f = this.md5_ii(f, g, d, e, a[h + 2], 15, 718787259),
		e = this.md5_ii(e, f, g, d, a[h + 9], 21, -343485551),
		d = this.safe_add(d, k),
		e = this.safe_add(e, l),
		f = this.safe_add(f, n),
		g = this.safe_add(g, m);
return [d, e, f, g]
};
MD5.md5_cmn = function (a, b, d, e, f, g) {
return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(b, a), this.safe_add(e, g)), f), d)
};
MD5.md5_ff = function (a, b, d, e, f, g, h) {
return this.md5_cmn(b & d |~ b & e, a, b, f, g, h)
};
MD5.md5_gg = function (a, b, d, e, f, g, h) {
return this.md5_cmn(b & e | d &~ e, a, b, f, g, h)
};
MD5.md5_hh = function (a, b, d, e, f, g, h) {
return this.md5_cmn(b ^ d ^ e, a, b, f, g, h)
};
MD5.md5_ii = function (a, b, d, e, f, g, h) {
return this.md5_cmn(d ^ (b |~ e), a, b, f, g, h)
};
MD5.safe_add = function (a, b) {
var d = (a & 65535) + (b & 65535);
return (a >> 16) + (b >> 16) + (d >> 16) << 16 | d & 65535
};
MD5.bit_rol = function (a, b) {
return a << b | a >>> 32 - b
};
function StringUtils() {}
StringUtils.stringtoXML = function (a) {
if (window.ActiveXObject) {
		var b = new ActiveXObject("Microsoft.XMLDOM");
		b.async = "false";
		b.loadXML(a)
} else
		b = (new DOMParser).parseFromString(a, "text/xml");
return b
};
function Navigator() {}
var userAgent,
userAgentVersion;
Navigator.IE = "IE";
Navigator.NS = "NS";
Navigator.IOS = "IOS";
function detectUserAgent() {
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
		userAgent = Navigator.IE,
		userAgentVersion = new Number(RegExp.$1);
if (navigator.userAgent.match(/iPad/i) != null)
		userAgent = Navigator.IOS;
if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
		userAgent = Navigator.NS,
		userAgentVersion = new Number(RegExp.$1)
};
Navigator.getUserAgent = function () {
return userAgent
};
Navigator.getUserAgentVersion = function () {
return userAgentVersion
};
function CountryListDraw() {}
CountryListDraw.drawCountriesAsCircles = function (a, b, d, e, f, g) {
for (var f = f == null
		? new Rectangle(-180, -90, 360, 180)
		: f, g = g == null
		? ColorListGenerators.createColorListWithSingleColor(b.length, "rgba(100,100,100,0.6)")
		: g, h = e.width / f.width, k = e.height / f.height, l, n = 0; b[n] != null; n++)
		if (!(d[n] < 0.5))
				l = b[n],
				a.fillStyle = g[n],
				a.beginPath(),
				a.arc(e.x + h * (l.geoCenter.x - f.x), e.getBottom() - k * (l.geoCenter.y - f.y), d[n], 0, TwoPi),
				a.fill()
};
CountryListDraw.drawCountriesPolygons = function (a, b, d, e, f, g, h) {
var e = e == null
				? new Rectangle(-180, -90, 360, 180)
				: e,
		f = f == null
				? ColorListGenerators.createColorListWithSingleColor(b.length, "rgba(100,100,100,0.6)")
				: f,
		k = d.width / e.width,
		l = d.height / e.height,
		n,
		m;
if (g != null)
		a.lineWidth = g;
if (h != null)
		a.strokeStyle = h;
for (h = 0; b[h] != null; h++) {
		n = b[h];
		n = n.polygonList;
		a.fillStyle = f[h];
		for (var o = 0; n[o] != null; o++) {
				m = n[o];
				a.beginPath();
				a.moveTo(d.x + k * (m[0].x - e.x), d.getBottom() - l * (m[0].y - e.y));
				for (var p = 1; m[p] != null; p++)
						a.lineTo(d.x + k * (m[p].x - e.x), d.getBottom() - l * (m[p].y - e.y));
				a.fill();
				g != null && a.stroke()
		}
}
};
function IntervalTableDraw() {}
IntervalTableDraw.drawIntervalsFlowTable = function (a, b, d, e, f) {
for (var g = b.length, h, e = e == null
		? ColorListOperators.colorListFromColorScale(new ColorScale(ColorOperators.temperatureScale), g)
		: e, d = d == null
		? new Rectangle(10, 10, 400, 300)
		: d, f = f || !1, k = b[0].length, l = d.width / (k - 1), n = d.height, m, o, g = b[g - 1], p = 0, t = d.x, s = d.y, q, u, d = 0; b[d] != null; d++) {
		o = b[d];
		a.fillStyle = e[d];
		a.beginPath();
		p = (1 - g[0].y) * 0.5 * n + d * 0 + s;
		m = new Point(t, o[0].y * n + p);
		a.moveTo(m.x, m.y);
		q = m;
		for (h = 1; h < k; h++)
				p = (1 - g[h].y) * 0.5 * n + d * 0 + s,
				m = new Point(h * l + t, o[h].y * n + p),
				f
						? (u = (m.x - q.x) * 0.45, a.bezierCurveTo(q.x + u, q.y, m.x - u, m.y, m.x, m.y))
						: a.lineTo(m.x, m.y),
				q = m;
		m = new Point((k - 1) * l + t, o[k - 1].x * n + p);
		a.lineTo(m.x, m.y);
		q = m;
		for (h = k - 2; h >= 0; h--)
				p = (1 - g[h].y) * 0.5 * n + d * 0 + s,
				m = new Point(h * l + t, o[h].x * n + p),
				f
						? (u = (m.x - q.x) * 0.45, a.bezierCurveTo(q.x + u, q.y, m.x - u, m.y, m.x, m.y))
						: a.lineTo(m.x, m.y),
				q = m;
		m = new Point(t, o[0].x * n + p);
		a.lineTo(m.x, m.y);
		a.fill()
}
};
IntervalTableDraw.prototype._isOnShape = function (a, b, d, e, f, g, h) {
var g = (g - a.x) / (b.x - a.x),
		k = 1 - g;
this.p0.x = a.x + g * f;
this.p0.y = a.y;
this.p1.x = k * (a.x + f) + g * (b.x - f);
this.p1.y = k * a.y + g * b.y;
this.p2.x = b.x - k * f;
this.p2.y = b.y;
this.P0.x = k * this.p0.x + g * this.p1.x;
this.P0.y = k * this.p0.y + g * this.p1.y;
this.P1.x = k * this.p1.x + g * this.p2.x;
this.P1.y = k * this.p1.y + g * this.p2.y;
a = k * this.P0.y + g * this.P1.y;
this.p0.y = d;
this.p1.y = k * d + g * e;
this.p2.y = e;
this.P0.y = k * this.p0.y + g * this.p1.y;
this.P1.y = k * this.p1.y + g * this.p2.y;
return h > k * this.P0.y + g * this.P1.y && h < a
};
IntervalTableDraw.drawCircularIntervalsFlowTable = function (a, b, d, e, f, g, h, k, l) {
var n = b.length,
		m,
		o,
		g = g == null
				? ColorListOperators.colorListFromColorScale(new ColorScale(ColorOperators.temperatureScale), n)
				: g,
		d = d == null
				? new Point(100, 100)
				: d,
		e = e == null
				? 200
				: e,
		f = f == null
				? 10
				: f,
		p = b[0].length,
		t = TwoPi / p,
		s = e - f,
		q,
		u,
		w,
		v,
		z,
		B,
		A = t * 0.3,
		C = Math.cos(A),
		D = -1,
		E = [],
		H = [],
		I = [],
		F = [],
		G = [];
for (m = 0; m < n; m++) {
		u = b[m];
		a.fillStyle = g[m % n];
		a.beginPath();
		q = new Point(l == null
				? 0
				: l[0], (1 - u[0].y) * s + f);
		a.moveTo(q.y * Math.cos(q.x) + d.x, q.y * Math.sin(q.x) + d.y);
		v = q;
		for (o = 1; o <= p; o++)
				w = u[o % p],
				q = new Point(l == null
						? o * t
						: l[o % p], (1 - w.y) * s + f),
				z = v.y / C,
				B = q.y / C,
				a.bezierCurveTo(z * Math.cos(v.x + A) + d.x, z * Math.sin(v.x + A) + d.y, B * Math.cos(q.x - A) + d.x, B * Math.sin(q.x - A) + d.y, q.y * Math.cos(q.x) + d.x, q.y * Math.sin(q.x) + d.y),
				k && D == -1 && this._isOnRadialShape(d, mousePoint, v.x, q.x, s * (1 - u[(o - 1) % p].y) + f, s * (1 - u[(o - 1) % p].x) + f, s * (1 - u[o % p].y) + f, s * (1 - u[o % p].x) + f) && (D = m),
				v = q,
				h != null && (w = w.getAmplitude(), w * e > 27 && (z = q.y + w * 0.5 * s, F.push(Math.min(Math.sqrt(w * e) * 1.8, 24)), G.push(q.x + Math.PI * 0.5), H.push(z * Math.cos(q.x) + d.x), I.push(z * Math.sin(q.x) + d.y), E.push(h[m])));
		q = new Point(l == null
				? 0
				: l[0], (1 - u[0].x) * s + f);
		a.lineTo(q.y * Math.cos(q.x) + d.x, q.y * Math.sin(q.x) + d.y);
		v = q;
		for (o = p - 1; o >= 0; o--)
				q = new Point(l == null
						? o * t
						: l[o], (1 - u[o].x) * s + f),
				z = v.y / C,
				B = q.y / C,
				a.bezierCurveTo(z * Math.cos(v.x - A) + d.x, z * Math.sin(v.x - A) + d.y, B * Math.cos(q.x + A) + d.x, B * Math.sin(q.x + A) + d.y, q.y * Math.cos(q.x) + d.x, q.y * Math.sin(q.x) + d.y),
				v = q;
		q = new Point(l == null
				? 0
				: l[0], (1 - u[0].x) * s + f);
		a.lineTo(q.y * Math.cos(q.x) + d.x, q.y * Math.sin(q.x) + d.y);
		a.fill()
}
for (m = 0; E[m] != null; m++)
		DrawTexts.setContextTextProperties("black", F[m], "Arial", "center", "middle"),
		a.save(),
		a.translate(H[m], I[m]),
		a.rotate(G[m]),
		a.fillText(E[m], 0, 0),
		a.restore();
return D
};
IntervalTableDraw._isOnRadialShape = function (a, b, d, e, f, g, h, k) {
e < d && (e += TwoPi);
var l = a.angleToPoint(b);
l < 0 && (l += TwoPi);
l > TwoPi && (l -= TwoPi);
l + TwoPi < e && (l += TwoPi);
l - TwoPi > d && (l -= TwoPi);
if (l < d || l > e)
		return !1;
var n = e - d,
		l = (l - d) / n,
		f = GeometryOperators.bezierCurvePoints(d, f, d + n * 0.5, f, e - n * 0.5, h, e, h, l),
		d = GeometryOperators.bezierCurvePoints(d, g, d + n * 0.25, g, e - n * 0.25, k, e, k, l);
r = b
		.subtract(a)
		.getNorm();
return r > f.y && r < d.y
};
IntervalTableDraw.drawIntervalsWordsFlowTable = function (a, b, d, e, f) {
var g = b.length,
		h,
		f = f == null
				? ColorListOperators.colorListFromColorScale(new ColorScale(ColorOperators.temperatureScale), g)
				: f,
		d = d == null
				? new Rectangle(10, 10, 400, 300)
				: d,
		k = b[0].length,
		l = d.width / (k - 1),
		n = d.height,
		m,
		o,
		p = new Point,
		t = new Point,
		s,
		g = b[g - 1],
		q = 0,
		u = d.x,
		w = d.y,
		v,
		z;
a.strokeStyle = "rgba(255,255,255,0.4)";
a.textBaseline = "top";
a.textAlign = "left";
for (var B, A, C = l, D, E, H, I, F = (k - 1) / d.width, G, J, d = 0; b[d] != null; d++) {
		s = b[d];
		z = " " + e[d];
		E = B = 0;
		q = (1 - g[0].y) * 0.5 * n + w;
		m = new Point(u, s[0].x * n + q);
		o = new Point(u, s[0].y * n + q);
		do
				if (E++, l = o.y - m.y, I = Math.floor(0.3 * l + 1), a.font = I + "px Arial", H = z.charAt(E % z.length), C = a.measureText(H).width + 2, C *= 0.9, B += C, v = F * B, h = Math.floor(v), A = v - h, !(h + 2 > k) && (G = h / F, J = (h + 1) / F, v = F * 0.45, D = DrawSimpleVis._bezierValue(G, J, g[h].y, g[h + 1].y, A, v), prevsY = q, q = (1 - D) * 0.5 * n + w, p.x = m.x, p.y = m.y, t.x = o.x, t.y = o.y, m = DrawSimpleVis._bezierValue(G, J, s[h].x, s[h + 1].x, A, v), o = DrawSimpleVis._bezierValue(G, J, s[h].y, s[h + 1].y, A, v), m = new Point(B + u, m * n + q), o = new Point(B + u, o * n + q), new Point(p.x + C * 0.5, (m.y + o.y + p.y + t.y) * 0.25), a.fillStyle = f[d], l > 1))
						a.save(),
						a.globalAlpha = l / 20,
						DrawTextsAdvanced.textOnQuadrilater(H, p, m, o, t, I, 1),
						a.restore();
while (h + 1 < k)
}
};
IntervalTableDraw._bezierValue = function (a, b, d, e, f, g) {
var h = 1 - f,
		k = new Point(a + f * g, d),
		a = new Point(h * (a + g) + f * (b - g), h * d + f * e),
		b = new Point(b - h * g, e),
		k = new Point(h * k.x + f * a.x, h * k.y + f * a.y),
		b = new Point(h * a.x + f * b.x, h * a.y + f * b.y);
return h * k.y + f * b.y
};
function NumberTableDraw() {}
NumberTableDraw.drawNumberTable = function (a, b, d, e, f, g) {
var f = f == null
				? 2
				: f,
		h = d.width / a.length,
		k = d.height / a[0].length,
		l,
		n,
		m,
		o,
		p,
		t = b.getAmplitude(),
		s;
for (l = 0; a[l] != null; l++) {
		m = a[l];
		o = d.x + l * h;
		g && (s = mouseX > o && mouseX <= o + h);
		for (n = 0; m[n] != null; n++)
				context.fillStyle = e((m[n] - b.x) / t),
				context.fillRect(o, d.y + n * k, h - f, k - f),
				s && mouseY > d.y + n * k && mouseY <= d.y + (n + 1) * k && (p = new Point(l, n))
}
return p
};
function StringListPrimitive(a, b, d, e, f) {
this.ctx = a;
this.stringList = b;
this.positions = d;
this.sizes = e;
this.colors = f;
this.y = this.x = 0;
this.style = " ";
this.font = "Arial";
this.alignment = "left";
this.baseLine = "top";
this.sizeLimitBelow = 8
}
StringListPrimitive.prototype.draw = function () {
this.ctx.textAlign = this.alignment;
this.ctx.textBaseLine = this.baseLine;
for (var a = 0; this.stringList[a] != null; a++)
		if (this.sizes[a] > this.sizeLimitBelow)
				this.ctx.font = this.style + this.sizes[a] + "px " + this.font,
				this.ctx.fillStyle = this.colors == null
						? "black"
						: this.colors[a % this.stringList.length],
				this.ctx.fillText(this.stringList[a], this.positions[a].x + this.x, this.positions[a].y + this.y)
};
function StringListVisOperators() {}
StringListVisOperators.simpleTagCloud = function (a, b, d, e, f, g) {
var e = e == null
				? "Arial"
				: e,
		f = f == null
				? 1.2
				: f,
		h,
		k,
		l,
		n,
		m,
		o,
		p = 20,
		t = b.getNormalizedToMax(),
		s,
		q;
h = !0;
for (var u = 0; h;) {
		interLine = p * f;
		k = o = b = l = 0;
		s = new NumberList;
		q = new Polygon;
		for (h = 0; a[h] != null; h++) {
				n = a[h];
				m = Math.floor(Math.sqrt(t[h]) * p);
				s.push(m);
				g.font = String(m) + "px " + e;
				n = g
						.measureText(n)
						.width;
				if (l + n > d.width) {
						l = 0;
						b += o * f + 1;
						for (o = 0; k < h; k++)
								q[k].y = b;
						k = h
				}
				o = Math.max(o, m);
				q.push(new Point(l, b));
				l += n + m * 0.2
		}
		for (b += o * f + 1; a[k] != null; k++)
				q[k].y = b;
		h = !1;
		b < d.height * 0.97 && (p = 0.5 * p + 0.5 * p * d.height / (b + interLine), h = !0);
		b >= d.height * 0.995 && (p = 0.5 * p + 0.5 * p * d.height / (b + interLine), h = !0);
		u++;
		u > 10 && (h = !1)
}
if (g != null)
		return a = new StringListPrimitive(g, a, q, s),
		a.x = d.x,
		a.y = d.y,
		a.baseLine = "alphabetic",
		a;
table = new Table;
table[0] = a;
table[1] = q;
table[2] = s;
return table
};
function NetworkDraw() {}
NetworkDraw.drawNetworMatrix = function (a, b, d, e, f, g, h, k) {
var e = e == null
				? ColorOperators.grayScale
				: e,
		f = f == null
				? 2
				: f,
		g = g == null
				? !1
				: g,
		l = a.nodeList,
		n = a.relationList,
		m = h != null,
		o = b.width / (l.length + 1),
		p = b.height / (l.length + 1),
		t = o - f,
		s = p - f,
		q = o,
		u = p;
if (k = k && b.pointIsInside(mousePoint))
		var w = new Point(-1, -1);
if (m)
		var o = b.width - o,
				p = b.height - p,
				v,
				z,
				B = [],
				A = [],
				C = [],
				D = [];
for (a = 0; l[a] != null; a++)
		if (context.fillStyle = d[a], m) {
				v = o * h[a];
				z = p * h[a];
				context.fillRect(b.x + q, b.y, v - f, s);
				context.fillRect(b.x, b.y + u, t, z - f);
				if (k) {
						if (mouseX > b.x + q && mouseX < b.x + q + v)
								w.x = a;
						if (mouseY > b.y + u && mouseY < b.y + u + z)
								w.y = a
				}
				B[l[a].id] = q;
				A[l[a].id] = u;
				C[l[a].id] = v;
				D[l[a].id] = z;
				q += v;
				u += z
		}
else
		context.fillRect(b.x + (a + 1) * o, b.y, t, s),
		context.fillRect(b.x, b.y + (a + 1) * p, t, s);
for (a = 0; n[a] != null; a++)
		h = n[a],
		context.fillStyle = e(h.weight),
		m
				? (context.fillRect(b.x + B[h.node0.id], b.y + A[h.node1.id], C[h.node0.id] - f, D[h.node1.id] - f), g || context.fillRect(b.x + A[h.node1.id], b.y + B[h.node0.id], D[h.node1.id] - f, C[h.node0.id] - f))
				: (d = l.indexOf(h.node0) + 1, h = l.indexOf(h.node1) + 1, context.fillRect(b.x + d * o, b.y + h * p, t, s), !g && d != h && context.fillRect(b.x + h * o, b.y + d * p, t, s));
return w
};
function TreeDraw() {}
TreeDraw.drawRectanglesTree = function (a, b, d, e) {
this._drawRectanglesTreeChildren(a.nodeList[0], new Rectangle(b.x, b.y, b.width / a.nLevels, b.height), d, e)
};
TreeDraw._drawRectanglesTreeChildren = function (a, b, d, e) {
context.fillStyle = d[a.level];
context.fillRect(b.x + e, b.y + e, b.width - e * 2, b.height - e * 2);
var f = a.toNodeList;
if (f.length > 0)
		for (var g = b.height / (a.descentWeight - 1), h = b.y, k, a = 0; f[a] != null; a++)
				k = g * f[a].descentWeight,
				this._drawRectanglesTreeChildren(f[a], new Rectangle(b.x + b.width, h, b.width, k), d, e),
				h += k
};
function Main() {}
Main.userAgent = "unknown";
function init() {};
function cycle() {};
function resizeWindow() {};
var listenerArray = [],
canvas,
canvasX = 0,
canvasY = 0,
removeDiv;
userAgent = "none";
var canvasResizeable = !0,
canvasWidth = 1,
canvasHeight = 1,
nFrame = 0,
mouseX = 0,
mouseY = 0,
mousePoint,
deltaWheel = 0,
cursorStyle = "auto",
backGroundColor = "white",
cycleActive,
context,
TwoPi = 2 * Math.PI,
HalfPi = 0.5 * Math.PI,
radToGrad = 180 / Math.PI,
gradToRad = Math.PI / 180,
c = console,
_wheelActivated = !1,
_keyboardActivated = !1,
setIntervalId;
window.addEventListener("load", function () {
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent) && (userAgent = "IE", userAgentVersion = new Number(RegExp.$1), userAgentVersion < 9))
		return null;

/ Firefox[\ / \s](\d + \.\d +) /.test(navigator.userAgent) && (userAgent = "FIREFOX", userAgentVersion = new Number(RegExp.$1));
/Mozilla[\/\s](\d+\.\d+)/.test(navigator.userAgent) && (userAgent = "MOZILLA", userAgentVersion = new Number(RegExp.$1));
navigator
		.userAgent
		.match(/Safari/) != null && (userAgent = "Safari", userAgentVersion = new Number(RegExp.$1));
navigator
		.userAgent
		.match(/iPad/i) != null && (userAgent = "IOS");
navigator
		.userAgent
		.match(/iPhone/i) != null && (userAgent = "IOS");
Main.userAgent = userAgent;
Main.frameRate = 30;
canvas = document.getElementById("ZIM5Kx8dq");
removeDiv = document.getElementById("rAyqYDfzD");
removeDiv.style.display = "none";
canvasHeight = canvas.height;
canvasWidth = canvas.width;
context = canvas.getContext("2d");
canvasWidth = context.canvas.width = window.innerWidth;
canvasHeight = context.canvas.height = window.innerHeight;
mousePoint = new Point;
canvas.addEventListener("mousemove", onMouseMove, !1);
window.addEventListener("resize", onResize, !1);
canvas != null && (startCycle(), init())
}, !1);
function onMouseMove(a) {
userAgent == "IE"
		? (mouseX = window.event.clientX, mouseY = window.event.clientY)
		: (mouseX = a.layerX, mouseY = a.layerY);
mousePoint.x = mouseX;
mousePoint.y = mouseY
}
function onResize() {
if (canvasResizeable != !1)
		canvas.setAttribute("width", document.body.clientWidth),
		canvas.setAttribute("height", document.body.clientHeight),
		canvasWidth = context.canvas.width = window.innerWidth,
		canvasHeight = context.canvas.height = window.innerHeight,
		resizeWindow()
}
function clearContext() {
context.clearRect(0, 0, canvasWidth, canvasHeight)
}
function enterFrame() {
context.clearRect(0, 0, canvasWidth, canvasHeight);
cycle();
nFrame++
}
function stopCycle() {
clearInterval(setIntervalId);
cycleActive = !1
}
function startCycle() {
setIntervalId = setInterval(enterFrame, 30);
cycleActive = !0
}
function addInteractionEventListener(a, b, d) {
listenerArray.push([a, b, d]);
switch (a) {
		case "mousedown":
		case "mouseup":
		case "click":
		case "mousemove":
				canvas.addEventListener(a, onCanvasEvent, !1);
				break;
		case "mousewheel":
				_wheelActivated || activateWheel();
				break;
		case "keydown":
				_keyboardActivated || activateKeyboard()
}
}
function onCanvasEvent(a) {
var b;
for (b = 0; listenerArray[b] != null; b++)
		listenerArray[b][0] == a.type && listenerArray[b][1].call(listenerArray[b][2], a)
}
function removeInteractionEventListener() {}
function setBackgroundColor(a) {
backGroundColor = a;
document.getElementById("ISX0lt_qbex").setAttribute("bgcolor", backGroundColor)
}
function activateKeyboard() {
_keyboardActivated = !0;
document.onkeydown = onKey
}
function onKey(a) {
onCanvasEvent(a)
}
function activateWheel() {
_wheelActivated = !0;
window.addEventListener && window.addEventListener("DOMMouseScroll", onWheel, !1);
window.onmousewheel = document.onmousewheel = onWheel
}
function onWheel(a) {
if (!a)
		a = window.event;
a.wheelDelta ? deltaWheel = a.wheelDelta / 120 : a.detail && (deltaWheel = -a.detail / 3);
a.value = deltaWheel;
onCanvasEvent(a)
};

//////////// Main.js
var loadData;

var pairs;
var pairsIndexes;

var names;
var hds;
var visMagnitudes;
var absMagnitudes;
var allCoordinates;
var allDistances;

var distances;
var coordinates;
var radius;
var normalizedDistances;
var normalizedDistancesA;
var normalizedDistancesV;
var interpolatedDistances;

var radiusV;
var radiusVA;
var radiusAV;
var radiusA;

var coordinatesV;
var coordinatesVA;
var coordinatesAV;
var coordinatesA;

var maxDistance;
var maxVisMagnitude;
var minVisMagnitude;
var maxAbsMagnitude;
var minAbsMagnitude;

var filter_by_constellations = true;

////interpolations
//todo: move these to InterpolationsManager
var selectedV = true;
var fromAToAV = false;
var fromVAToV = false;
var fromVToVA = false;
var fromAVToA = false;

////

var loading = true;

var interpolatingDistances = true;

var t = 0;
var tInterpolationDistances = 1;
var tInterpolationDistancesFinal = 1;

var cX;
var cY;

var rSphere = 300;
var engine3D;
var dragging;
var rotationVector = new Point(0.0016, 0.0012);

///////VIEWS

var view1 = {
'n': 1,
'linesColor': 'rgb(255,255,255)',
'starsColor': 'rgb(0,255,255)',
'backgroundColor': '#000000',
'textsColor': 'WHITE',
'maxStarArea': 60,
'vMagProportion': 0.14,
'aMagProportion': 0.02,
'interpolationSpeed': 0.02,
'filterByConstellations': false,
'magnitudesInterpolation': true,
'distancesInterpolation': false,
'lens3D': 600,
'initZoom': 2.1
};

var view2 = {
'n': 2,
'linesColor': 'rgb(150,150,150)',
'starsColor': 'rgb(100,100,100)',
'starsDepthColor': 'rgb(180,180,180)',
'backgroundColor': '#FFFFFF',
'textsColor': 'DARKGRAY',
'maxStarArea': 60,
'vMagProportion': 0.1,
'aMagProportion': 0.02,
'interpolationSpeed': 0.01,
'filterByConstellations': true,
'magnitudesInterpolation': true,
'distancesInterpolation': true,
'lens3D': 400,
'initZoom': 1.23
};

var VIEW = view2;

///////PARAMS
var linesColor;
var starsColor;
var starsDepthColor;
var backgroundColor;
var maxStarArea;
/////

var zoom = VIEW.initZoom;
var finalZoom;

var kZoom; // = kZoomF1;

init = function () {
linesColor = VIEW.linesColor;
starsColor = VIEW.starsColor;
starsDepthColor = VIEW.starsDepthColor;
backgroundColor = VIEW.backgroundColor;
maxStarArea = VIEW.maxStarArea;
/////

loadData = new LoadDataFiles();

engine3D = new Engine3D();
engine3D.lens = VIEW.lens3D;

dragging = new DragDetection(0, draggingListener, this);
dragging.factor = 0.01;
// dragging.areaVerificationFunction = draggingArea;

addInteractionEventListener('mousewheel', onWheelListener, this);

setBackgroundColor(backgroundColor);

all.inter = new InterpolationsManager();
}

function allDataLoaded() {
kZoom = all.inter.zoom();

coordinates = coordinatesV;
distances = distancesV;
normalizedDistances = distances.getNormalizedToMax();
interpolatedDistances = all.inter.distances();

radius = radiusV.clone();

loading = false;

c.log(coordinates.length);
c.log(distances.length);
c.log(normalizedDistances.length);
c.log(interpolatedDistances.length);
c.log(radius.length);
}

function onWheelListener(e) {
zoom -= e.value * zoom * 0.001;
zoom = Math.min(Math.max(zoom, 0.001), 50000);
}

resizeWindow = function () {
cX = canvasWidth * 0.5;
cY = canvasHeight * 0.5;
}

function draggingListener(draggingVector) {
rotationVector = draggingVector;
}

cycle = function () {
canvas.style.cursor = 'default';

if (pairs == null || normalizedDistances == null)
		return;

		all.inter.cycle();

/////interpolation
if (VIEW.magnitudesInterpolation) {
	all.inter.radius();
}

if (all.inter.interpolating && VIEW.distancesInterpolation) {
		interpolatedDistances = all.inter.distances();
}

/////constellation lines

context.strokeStyle = linesColor;

engine3D.applyRotation(rotationVector);

rSphere = 300;

finalZoom = zoom; //kZoom*zoom;

var i;

var i0;
var i1;

if (VIEW.filterByConstellations) {
		for (i = 0; pairsIndexes[i] != null; i++) {
				i0 = pairsIndexes[i][0];
				i1 = pairsIndexes[i][1];
				line(coordinates[i0], finalZoom * interpolatedDistances[i0], coordinates[i1], finalZoom * interpolatedDistances[i1]);
		}
} else {
		for (i = 0; pairs[i] != null; i++) {
				lineOnSphere(pairs[i][0], pairs[i][1]);
		}
}

/////stars

if (starsDepthColor == null) {
		context.fillStyle = starsColor;

		for (i = 0; coordinates[i] != null; i++) {
				spot(coordinates[i], radius[i], finalZoom * interpolatedDistances[i]);
		}
} else {
		var p;
		var starsArray = new Array();
		for (i = 0; coordinates[i] != null; i++) {
				p = transformation(coordinates[i], finalZoom * interpolatedDistances[i]);
				starsArray.push({'p': p, 's': p.z, 'r': radius[i]});
		}

		starsArray
				.sort(function (star0, star1) {
						return star0.s - star1.s;
				});

		var star;
		for (i = 0; starsArray[i] != null; i++) {
				star = starsArray[i];
				if (star.s > 0) {
						context.fillStyle = ColorOperators.interpolateColors(starsDepthColor, starsColor, Math.min(Math.max(star.s * 0.5, 0), 1));
						context.beginPath();
						context.arc(star.p.x, star.p.y, star.r * star.s, 0, TwoPi);
						context.fill();
				}
				// spotColors(coordinates[i], radius[i], finalZoom*interpolatedDistances[i],
				// starsColor, starsDepthColor);
		}
}
}

function line(p0, d0, p1, d1) {
p0 = sphericTransformation(p0, d0);
p1 = sphericTransformation(p1, d1);

var line = engine3D.line3D(p0, p1);

if (line != null) {
		context.beginPath();
		context.moveTo(line[0].x + this.cX, line[0].y + this.cY);
		context.lineTo(line[1].x + this.cX, line[1].y + this.cY);
		context.stroke();
}
}

function lineOnSphere(p0, p1) {
p0 = sphericTransformation(p0, finalZoom);
p1 = sphericTransformation(p1, finalZoom);

var line = engine3D.line3D(p0, p1);

if (line != null) {
		context.beginPath();
		context.moveTo(line[0].x + this.cX, line[0].y + this.cY);
		context.lineTo(line[1].x + this.cX, line[1].y + this.cY);
		context.stroke();
}
}

function spot(p, r, d) {
p = transformation(p, d);
if (p.z < 0)
		return;
context.beginPath();
context.arc(p.x, p.y, r * p.z, 0, TwoPi);
context.fill();
}

// spotColors=function(p, r, d, color0, color1){ p = transformation(p, d);
// if(p.z<0) return; context.fillStyle =
// ColorOperators.interpolateColors(color1, color0, Math.min(Math.max(p.z*0.5,
// 0), 1)); context.beginPath(); context.arc(p.x, p.y, r*p.z, 0, TwoPi);
// context.fill(); }

function transformation(point, d) {
var newPoint3D = engine3D.projection3D(sphericTransformation(point, d));
return new Point3D(newPoint3D.x + this.cX, newPoint3D.y + this.cY, newPoint3D.z);
}

function sphericTransformation(point, d) {
var r0 = d * rSphere * Math.cos(point.y);
return new Point3D(r0 * Math.cos(point.x), -r0 * Math.tan(point.y), r0 * Math.sin(point.x));
}

////////////// LoadDataFiles.js
LoadDataFiles.URL_CONST = "./resources/constellationsSimple.txt";
LoadDataFiles.URL_STARS = "./resources/stars.txt";
LoadDataFiles.URL_CONSTELLATION = "http://en.wikipedia.org/wiki/List_of_stars_in_Orion"; //"http://en.wikipedia.org/wiki/List_of_stars_in_Gemini";//"http://en.wikipedia.org/wiki/List_of_stars_in_Vulpecula";//"http://en.wikipedia.org/wiki/List_of_stars_in_Andromeda";//"http://en.wikipedia.org/wiki/List_of_stars_in_Scorpius";//
LoadDataFiles.URL_JSON = "./resources/stars.json";

function LoadDataFiles() {

var constNames = "Andromeda,Antlia,Apus,Aquarius,Aquila,Ara,Aries,Auriga,Boötes,Caelum,Cameloparda" +
				"lis,Cancer,Canes_Venatici,Canis_Major,Canis_Minor,Capricornus,Carina,Cassiopeia," +
				"Centaurus,Cepheus,Cetus,Chamaeleon,Circinus,Columba,Coma_Berenices,Corona_Austra" +
				"lis,Corona_Borealis,Corvus,Crater,Crux,Cygnus,Delphinus,Dorado,Draco,Equuleus,Er" +
				"idanus,Fornax,Gemini,Grus,Hercules,Horologium,Hydra,Hydrus,Indus,Lacerta,Leo,Leo" +
				"_Minor,Lepus,Libra,Lupus,Lynx,Lyra,Mensa,Microscopium,Monoceros,Musca,Norma,Octa" +
				"ns,Ophiuchus,Orion,Pavo,Pegasus,Perseus,Phoenix,Pictor,Pisces,Piscis_Austrinus,P" +
				"uppis,Pyxis,Reticulum,Sagitta,Sagittarius,Scorpius,Sculptor,Scutum,Serpens,Sexta" +
				"ns,Taurus,Telescopium,Triangulum,Triangulum_Australe,Tucana,Ursa_Major,Ursa_Mino" +
				"r,Vela,Virgo,Volans,Vulpecula";
this.wikipediaUrls = StringOperators
		.splitString(constNames, ",")
		.append("http://en.wikipedia.org/wiki/List_of_stars_in_", false);

Loader.loadData(LoadDataFiles.URL_CONST, this.onLoadData, this);

// Loader.loadData(this.wikipediaUrls[0], this.onLoadData, this);
// Loader.loadData('http://en.wikipedia.org/wiki/List_of_stars_in_Sagittarius',
// this.onLoadData, this); Loader.loadData(LoadDataFiles.URL_STARS,
// this.onLoadData, this); Loader.loadData(LoadDataFiles.URL_CONSTELLATION,
// this.onLoadData, this);

Loader.loadData(LoadDataFiles.URL_JSON, this.onLoadData, this);
}
var distancesA,distancesV;
LoadDataFiles.prototype.dataLoaded = function () {
distances = new NumberList();
coordinates = new Polygon();
radius = new NumberList();

radiusA = new NumberList();
radiusAV = new NumberList();
radiusVA = new NumberList();
radiusV = new NumberList();

coordinatesA = new Polygon();
coordinatesAV = new Polygon();
coordinatesVA = new Polygon();
coordinatesV = new Polygon();

distancesA = new NumberList();
distancesV = new NumberList();
var r;
for (var i = 0; visMagnitudes[i] != null; i++) {
		if (absMagnitudes[i] < 0) {
				radiusA.push(this.radiusFromMagntiude(absMagnitudes[i], false));
				coordinatesA.push(allCoordinates[i]);
				distancesA.push(allDistances[i]);
		}

		if (visMagnitudes[i] < 6) {
				radiusV.push(this.radiusFromMagntiude(visMagnitudes[i], true));
				coordinatesV.push(allCoordinates[i]);
				distancesV.push(allDistances[i]);
		}

		if (absMagnitudes[i] < 0 || visMagnitudes[i] < 6) {
				if (absMagnitudes[i] < 0 && visMagnitudes[i] < 6) {
						r = 0.5 * (this.radiusFromMagntiude(visMagnitudes[i], true) + this.radiusFromMagntiude(absMagnitudes[i], false));
						radiusAV.push(r);
						radiusVA.push(r);
				} else if (absMagnitudes[i] < 0) {
						radiusAV.push(0);
				} else {
						radiusVA.push(0);
				}
		}
}

radius = radiusV.clone();
coordinates = coordinatesV;
distances = distancesV;
normalizedDistancesA = distancesA.getNormalizedToMax();
normalizedDistancesV = distancesV.getNormalizedToMax();
normalizedDistances = normalizedDistancesV.clone();
interpolatedDistances = normalizedDistances.clone();

maxDistance = distances.getMax();
minVisMagnitude = visMagnitudes.getMin();
maxVisMagnitude = visMagnitudes.getMax();
minAbsMagnitude = absMagnitudes.getMin();
maxAbsMagnitude = absMagnitudes.getMax();

c.log('total stars:', allCoordinates.length);
c.log('abs filtered', distancesA.length);
c.log('vis filtered', distancesV.length);
c.log('maxDistance', maxDistance);

resizeWindow();
}

LoadDataFiles.prototype.onLoadData = function (e) {
var i;

switch (e.url) {
		case LoadDataFiles.URL_CONST:
				var coordinatesTexts = StringOperators.allTextsBetweenStrings(e.result, "\",", ")");
				pairs = new Array();

				var numbers;
				var p0;
				var p1;

				for (i = 0; coordinatesTexts[i] != null; i++) {
						numbers = coordinatesTexts[i].split(',');
						p0 = new Point((Number(numbers[1]) * (360 / 24) - 180) * gradToRad, Number(numbers[0]) * gradToRad);
						p1 = new Point((Number(numbers[3]) * (360 / 24) - 180) * gradToRad, Number(numbers[2]) * gradToRad);
						pairs[i] = [p0, p1];
				}
				break;
		case LoadDataFiles.URL_JSON:
				var stars = JSON
						.parse(e.result)
						.stars;
				var r;

				c.log("stars.length", stars.length);

				visMagnitudes = new NumberList();
				absMagnitudes = new NumberList();
				allCoordinates = new Polygon();
				allDistances = new NumberList();

				for (i = 0; stars[i] != null; i++) {
						visMagnitudes.push(stars[i].visM);
						absMagnitudes.push(stars[i].absM);
						allCoordinates.push(new Point((stars[i].ra * (360 / 24) - 180) * gradToRad, stars[i].dec * gradToRad));
						allDistances.push(stars[i].d);
				}

				this.dataLoaded();

				break;
		case LoadDataFiles.URL_STARS:
				var lines = StringOperators.splitByEnter(e.result);
				var line;

				for (i = 0; lines[i] != null; i++) {
						line = lines[i];
						line = StringOperators.placeString(line, ',', 4);
						line = StringOperators.placeString(line, ',', 30);
						line = StringOperators.placeString(line, ',', 48);
						line = StringOperators.placeString(line, ',', 51);

						line = StringOperators.placeString(line, ',', 54);
						line = StringOperators.placeString(line, ',', 61);
						line = StringOperators.placeString(line, ',', 68);
						line = StringOperators.placeString(line, ',', 73);
						line = StringOperators.placeString(line, ',', 80);
						line = StringOperators.placeString(line, ',', 87);
						line = StringOperators.placeString(line, ',', 94);
						line = StringOperators.placeString(line, ',', 100);

						line = line.replace(/ +,/g, ",");
						line = line.replace(/, +/g, ",");
						line = line.replace(/v,/g, ",");
						line = line.replace(/\+/g, "");

						lines[i] = line;

						c.log(line);
				}

				var starsTable = TableEncodings.CSVtoTable(lines.join('\n'), false);

				visMagnitudes = starsTable[9];
				distances = starsTable[12];

				c.log('visMagnitudes:', visMagnitudes);
				c.log('distances:', distances);
				maxDistance = distances.getMax();
				c.log('maxDistance:', maxDistance);

				coordinates = new Polygon();

				for (i = 0; visMagnitudes[i] != null; i++) {
						coordinates[i] = new Point(starsTable[5][i], starsTable[3][i] + starsTable[4][i] / 60);
						c.log(coordinates[i].x, coordinates[i].y);
				}

				this.dataLoaded();

				break;
		default:
				var tableBlock = StringOperators.firstTextBetweenStrings(e.result, "<table class=\"wikitable sortable\">", "</table");

				//c.log(tableBlock);

				var rowsBlocks = StringOperators.allTextsBetweenStrings(tableBlock, "<tr>", "</tr>");
				var cells;

				var j;

				var RAText;
				var DECText;
				var absMagText;
				var magText;
				var disText;
				var supIndex;
				var coordBlocks
				var ra;
				var dec;
				var hd;
				var d;

				var nameIndex;
				var hdIndex;
				var raIndex;
				var decIndex;
				var visMagIndex;
				var absMagIndex;
				var dIndex;

				var sign;

				if (visMagnitudes == null) {
						names = new StringList();
						hds = new StringList();
						absMagnitudes = new NumberList();
						visMagnitudes = new NumberList();
						distances = new NumberList();
						coordinates = new Polygon();
						allDistances = new NumberList();
						allCoordinates = new NumberList();
				}

				cells = StringOperators.allTextsBetweenStrings(rowsBlocks[0], "<th", "</th>");
				var cell;
				for (i = 0; cells[i] != null; i++) {
						cell = StringOperators
								.removeHtmlTags(cells[i])
								.replace(/\>/g, "")
								.toLowerCase();
						//c.log(i, cell);
						if (cell.indexOf('name') != -1)
								nameIndex = i;
						if (cell.indexOf('hd') != -1)
								hdIndex = i;
						if (cell.indexOf('ra') != -1)
								raIndex = i;
						if (cell.indexOf('dec') != -1)
								decIndex = i;
						if (cell.indexOf('vis') != -1 || cell.indexOf('app') != -1)
								visMagIndex = i;
						if (cell.indexOf('abs') != -1)
								absMagIndex = i;
						if (cell.indexOf('dis') != -1)
								dIndex = i;
						}

				c.log("raIndex,decIndex,visMagIndex,dIndex", raIndex, decIndex, visMagIndex, dIndex);

				for (i = 1; rowsBlocks[i] != null; i++) {
						//c.log(i); c.log(rowsBlocks[i]);
						cells = StringOperators.allTextsBetweenStrings(rowsBlocks[i], "<td>", "</td>");
						if (cells != null) {

								magText = cells[visMagIndex].replace(/−/g, "-");
								//c.log(magText);
								supIndex = magText.search(/\<|\?|–|\(/g);
								magText = supIndex == -1
										? magText
										: magText.substr(0, supIndex);
								supIndex = magText.search(/-/g);
								magText = supIndex < 1
										? magText
										: magText.substr(0, supIndex);

								absMagText = cells[absMagIndex].replace(/−/g, "-");
								//c.log(magText);
								supIndex = absMagText.search(/\<|\?|–|\(/g);
								absMagText = supIndex == -1
										? absMagText
										: absMagText.substr(0, supIndex);
								supIndex = absMagText.search(/-/g);
								absMagText = supIndex < 1
										? absMagText
										: absMagText.substr(0, supIndex);

								//c.log("magText ["+magText+"]");

								disText = cells[dIndex]
										.replace(/\>/g, "")
										.replace(/&gt;/g, "")
										.replace(/~/g, "")
										.replace(/,/g, "")
										.replace(/–/g, "-");
								supIndex = disText.search(/\<|\?|–|\(/g);
								disText = supIndex == -1
										? disText
										: disText.substr(0, supIndex);
								d = Number(disText);

								//c.log(cells[5]);
								RAText = cells[raIndex].replace(/\<sup\>h\<\/sup>&#160/g, "");
								RAText = RAText.replace(/\<sup\>m\<\/sup>&#160/g, "");
								RAText = RAText.replace(/\<sup\>s\<\/sup>/g, "");
								RAText = RAText.replace(/ /g, "");
								RAText = RAText.replace(/\t/g, "");
								RAText = RAText.replace(/−/g, "-");

								DECText = cells[decIndex];
								DECText = DECText.replace(/\+/g, "");
								DECText = DECText.replace(/&#160/g, "");
								DECText = DECText.replace(/°/g, "");
								DECText = DECText.replace(/″/g, "");
								DECText = DECText.replace(/′/g, "");
								DECText = DECText.replace(/ /g, "");
								DECText = DECText.replace(/\t/g, "");
								DECText = DECText.replace(/−/g, "-");

								//c.log(RAText+"|"+DECText+"|");
								coordBlocks = RAText.split(";");
								sign = Number(coordBlocks[0]) >= 0
										? 1
										: -1;
								ra = Number(coordBlocks[0]) + sign * Number(coordBlocks[1]) / 60 + sign * Number(coordBlocks[2]) / 3600;

								//c.log(cells[raIndex]+"----->"+RAText+"   sign:", sign, " ra:", ra);

								coordBlocks = DECText.split(";");
								//c.log(coordBlocks[0], coordBlocks[1], coordBlocks[2]);
								sign = Number(coordBlocks[0]) >= 0
										? 1
										: -1;
								dec = Number(coordBlocks[0]) + sign * Number(coordBlocks[1]) / 60 + sign * Number(coordBlocks[2]) / 3600;
								//c.log(coordBlocks[0]+"|"+Number(coordBlocks[0]));

								hd = cells[hdIndex];

								if (!(d > 20000 || d == 0 || disText.indexOf('e3') != -1 || magText == '' || magText == ' ' || magText.indexOf('n/a') != -1 || Number(absMagText) < -9.4)) {
										names.push(StringOperators.removeHtmlTags(cells[nameIndex]));
										allDistances.push(d);
										visMagnitudes.push(Number(magText));
										absMagnitudes.push(Number(absMagText));
										allCoordinates.push(new Point(dec, ra));
										hds.push(hd);
										//c.log(names[names.length-1], dec, ra);
								}

								//c.log(coordinates[i-1].y, coordinates[i-1].x);
						}
				}

				maxDistance = distances.getMax();
				c.log('maxDistance:', maxDistance);
				if (isNaN(maxDistance)) {
						c.log('distances:', distances);
						e();
				}

				minVisMagnitude = visMagnitudes.getMin();
				maxVisMagnitude = visMagnitudes.getMax();
				c.log('minVisMagnitude:', minVisMagnitude);
				c.log('maxVisMagnitude:', maxVisMagnitude);

				minAbsMagnitude = absMagnitudes.getMin();
				maxAbsMagnitude = absMagnitudes.getMax();

				c.log('minAbsMagnitude:', minAbsMagnitude);
				c.log('maxAbsMagnitude:', maxAbsMagnitude);

				c.log('n stars:', distances.length);
				if (isNaN(maxAbsMagnitude) || isNaN(minAbsMagnitude) || isNaN(maxVisMagnitude) || isNaN(minVisMagnitude) || minVisMagnitude < -1.46 || minAbsMagnitude < -9.4) {
						c.log('visMagnitudes:', visMagnitudes);
						c.log('absMagnitudes:', absMagnitudes);
						e();
				}

				var indexWP = this
						.wikipediaUrls
						.indexOf(e.url);

				if (indexWP > -1 && indexWP < this.wikipediaUrls.length - 1) {
						//if(indexWP<5){
						Loader.loadData(this.wikipediaUrls[indexWP + 1], this.onLoadData, this);
				} else {
						var dataObject = new Object();
						var star;

						dataObject.stars = new Array();

						coordinates = allCoordinates;

						for (i = 0; allDistances[i] != null; i++) {
								dataObject.stars[i] = {
										'name': names[i],
										'absM': absMagnitudes[i],
										'visM': visMagnitudes[i],
										'hd': hds[i],
										'd': allDistances[i],
										'ra': Math.floor(100 * allCoordinates[i].y) / 100,
										'dec': Math.floor(100 * allCoordinates[i].x) / 100
								};
						}

						var jsonString = JSON.stringify(dataObject);

						c.log("-------------JSON---------------");
						c.log(jsonString);
						c.log("--------------------------------");
				}

				break;
}

if (coordinates != null && pairs != null) {
		this.searchForStarsInConstellations();
		allDataLoaded();
}

}
LoadDataFiles.prototype.searchForStarsInConstellations = function () {
if (!VIEW.filterByConstellations)
		return;

var i;
var iStar0;
var iStar1;
pairsIndexes = new Array();

var allIndexes = new List();

for (i = 0; pairs[i] != null; i++) {
		iStar0 = this.closerStar(pairs[i][0]);
		iStar1 = this.closerStar(pairs[i][1]);
		pairsIndexes[i] = [iStar0, iStar1];
		if (VIEW.filterByConstellations) {
				allIndexes.pushIfUnique(iStar0);
				allIndexes.pushIfUnique(iStar1);
		}
}

if (VIEW.filterByConstellations) {
		coordinates = new Polygon();
		distances = new NumberList();

		radiusA = new NumberList();
		radiusAV = new NumberList();
		radiusVA = new NumberList();
		radiusV = new NumberList();

		var index;
		var r;
		var pair;
		for (i = 0; allIndexes[i] != null; i++) {
				index = allIndexes[i];
				coordinates[i] = allCoordinates[index];
				distances[i] = allDistances[index];

				radiusA[i] = this.radiusFromMagntiude(absMagnitudes[index], false);
				radiusV[i] = this.radiusFromMagntiude(visMagnitudes[index], true);
				r = 0.5 * (radiusA[i] + radiusV[i]);
				radiusAV[i] = r;
				radiusVA[i] = r;

				for (var j = 0; pairsIndexes[j] != null; j++) {
						pair = pairsIndexes[j];
						if (pair[0] == index)
								pair[0] = i;
						if (pair[1] == index)
								pair[1] = i;
						}
				}

		coordinatesA = coordinates.clone();
		coordinatesAV = coordinates.clone();
		coordinatesVA = coordinates.clone();
		coordinatesV = coordinates.clone();

		interpolatedDistances = distances.clone();
		distancesA = distances.clone();
		distancesV = distances.clone();
}
}
LoadDataFiles.prototype.closerStar = function (point) {
var i;
var minD2 = 10000000;
var d2;
var iClosest;
for (i = 0; allCoordinates[i] != null; i++) {
		d2 = Math.pow(allCoordinates[i].x - point.x, 2) + Math.pow(allCoordinates[i].y - point.y, 2);
		if (d2 < minD2) {
				iClosest = i;
				minD2 = d2;
		}
}
return iClosest;
}

LoadDataFiles.prototype.radiusFromMagntiude = function (magnitude, visible) {
var k = visible
		? VIEW.vMagProportion
		: VIEW.aMagProportion;
return maxStarArea * Math.sqrt(Math.pow(2, 1 - magnitude)) * k;
}

///////////////////// InterpolationsManager.js
function InterpolationsManager() {
this.speed = VIEW.interpolationSpeed;

this.x = 0;

this.interpolating = false;
this.from0To1 = true;

this.nextFrameStops = false;

////zoom

this.kZoomF0 = 0.8;
this.kZoomF1 = 0.8;

}

InterpolationsManager.prototype.start = function () {
if (this.x > 0 && this.x < 1)
		this.from0To1 = !this.from0To1;

this.interpolating = true;
this.nextFrameStops = false;

if (VIEW.magnitudesInterpolation) {
		if (selectedV) {
				fromVToVA = true;
				fromAVToA = false;
				fromAToAV = false;
				fromVAToV = false;
		} else {
				fromAToAV = true;
				fromVToVA = false;
				fromAVToA = false;
				fromVAToV = false;
		}
}
}

InterpolationsManager.prototype.cycle = function () {
if (!this.interpolating)
		return;

if (this.nextFrameStops) {
		this.nextFrameStops = false;
		this.interpolating = false;
} else {
		if (this.from0To1) {
				this.x += this.speed;
				if (this.x >= 1) {
						this.nextFrameStops = true;
						this.x = 1;
						this.from0To1 = false;
				}
		} else {
				this.x -= this.speed;
				if (this.x <= 0) {
						this.nextFrameStops = true;
						this.x = 0;
						this.from0To1 = true;
				}
		}
}
}

InterpolationsManager.prototype.radius = function () {
var t;
var antit;

if (fromVToVA) {
		t = this.x * 2;
		antit = 1 - t;

		if (this.x >= 0.5) {
				fromVToVA = false;
				fromAVToA = true;
				//t=0;
				radius = radiusAV.clone();
				coordinates = coordinatesA;
				distances = distancesA;
				normalizedDistances = distances.getNormalizedToMax();
		} else {
				for (i = 0; radiusV[i] != null; i++) {
						radius[i] = radiusV[i] * antit + radiusVA[i] * t;
				}
		}
} else if (fromAVToA) {
		t = (this.x - 0.5) * 2;
		antit = 1 - t;

		if (this.x >= 1) {
				fromAVToA = false;
				selectedV = false;
				radius = radiusA.clone();
		} else {
				for (i = 0; radiusA[i] != null; i++) {
						radius[i] = radiusAV[i] * antit + radiusA[i] * t;
				}
		}
} else if (fromAToAV) {
		t = (this.x - 0.5) * 2;
		antit = 1 - t;

		if (this.x <= 0.5) {
				fromAToAV = false;
				fromVAToV = true;
				//t=0;
				radius = radiusVA.clone();
				coordinates = coordinatesV;
				distances = distancesV;
				normalizedDistances = distances.getNormalizedToMax();
		} else {
				for (i = 0; radiusA[i] != null; i++) {
						radius[i] = radiusA[i] * t + radiusAV[i] * antit;
				}
		}
} else if (fromVAToV) {
		t = this.x * 2;
		antit = 1 - t;

		if (this.x <= 0) {
				fromVAToV = false;
				selectedV = true;
				radius = radiusV.clone();
		} else {
				for (i = 0; radiusV[i] != null; i++) {
						radius[i] = radiusVA[i] * t + radiusV[i] * antit;
				}
		}
}
}

InterpolationsManager.prototype.zoom = function () {
return this.kZoomF0 + (this.kZoomF1 - this.kZoomF0) * ((Math.pow(1000, this.x) - 1) / 999);
}

InterpolationsManager.prototype.distances = function () {
var interpolated = new NumberList();
var antix = 1 - this.x;
var i;

for (i = 0; normalizedDistances[i] != null; i++) {
		interpolated[i] = this.x * normalizedDistances[i] * 5 + antix;
}
return interpolated;
}
}