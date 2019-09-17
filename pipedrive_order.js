javascript:
(function() {
  function get_amount(box) {
    try {
      var a = box.children[0].children[0].children[0].children[0].children[2].children[0];
      a = a.innerHTML;
      a = a.replace(/\&nbsp;€/, "");
      a = a.replace(/ /g, "");
      a = parseInt(a, 10);

      return a;
    } catch(e) {
      return -1;
    }
  };

  function get_nodes(boxes) {
    var nodes = [];
    for (var z = 0; z < boxes.children.length; z += 1) {
      if (boxes.children[z].draggable) {
        nodes.push(boxes.children[z]);
      }
    }
    return nodes;
  };

  function get_highest_amount_node(nodes, start) {
    var node = null;
    for (var i = start; i < nodes.length; i+= 1) {
      if (node === null || get_amount(node) < get_amount(nodes[i])) {
        node = nodes[i];
      }
    }
    return node;
  };

  function reorder_stage(stage) {
    var boxes = stage.children[1].children[0].children[0];
    var l = get_nodes(boxes).length;

    for (var i = 0; i < l; i += 1) {
      var nodes = get_nodes(boxes);
      best = get_highest_amount_node(nodes, i);
      boxes.insertBefore(best, boxes.children[i]);
    }
  };

  var stages = document.querySelectorAll("div[data-test^=stage-][data-test-stage-index]");

  for (var i = 0; i < stages.length; i += 1) {
    reorder_stage(stages[i]);
  }
})()

