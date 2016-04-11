Framer.DefaultContext.backgroundColor = '#34cdff';

var sketch = Framer.Importer.load("sketch/app.framer/imported/app@1x");

sketch.app.x = (window.innerWidth - sketch.app.width) / 2;

var scroll = ScrollComponent.wrap(sketch.notes);
scroll.scrollHorizontal = false;
scroll.speedY = 0.4;
scroll.contentInset =  {bottom: 100, top: 44};

var sscroll = ScrollComponent.wrap(sketch.editorcontent);
sscroll.scrollHorizontal = false;
//sscroll.scrollVertical = false;
sscroll.speedY = 0.8;
sscroll.contentInset =  {bottom: 100, top: 0};

sketch.editorcontent.parent.width = 958;
sketch.allnotes.opacity = 0;
sketch.insertrefs.opacity = 0;

/* refs */
sketch.refs.x = 957;

var expandBool = false;
var refExpanded = false;

var refs = function () {
	if (refExpanded) {
		refExpanded = false;
		sketch.refs.animate({
	    	properties:{
	        	x: 958
	    	},
	    	time: 0.3
		});
		return;
	}
	refExpanded = true;
	sketch.refs.animate({
    	properties:{
        	x: 681
    	},
    	time: 0.5
	});
	sketch.keyboard.animate({
		properties: {
			y: 750
		},
		time: 0.4
	});
};

var expand = function (event, layer) {
	sketch.insertrefs.on(Events.Click, refs);
	if (!expandBool) return;
	if (refExpanded) {
		refExpanded = false;
		sketch.refs.animate({
	    	properties:{
	        	x: 958
	    	},
	    	time: 0.3
		});
	}
	sketch.notes.animate({
    	properties:{
        	x: -278
    	},
    	time: 0.5
	});
	sketch.editor.animate({
    	properties:{
        	width: 958,
        	x: 0
    	},
    	time: 0.3
	});
	sketch.editorcontent.animate({
		properties: {
			x: 138
		},
		time: 0.3
	});
	sketch.keyboard.animate({
		properties: {
			y: 407
		},
		delay: 0.4,
		time: 0.25
	});
	sketch.allnotes.animate({
		properties: {
			opacity: 1
		},
		time: 0.3
	});
	sketch.newnote.animate({
		properties: {
			opacity: 0
		},
		time: 0.3
	});
	sketch.insertrefs.animate({
		properties: {
			opacity: 1
		},
		time: 0.3
	});
};

var expose = function (event, layer) {
	sketch.insertrefs.off(Events.Click, refs);
	sketch.notes.animate({
    	properties:{
        	x: 0
    	},
    	time: 0.3
	});
	sketch.editor.animate({
    	properties:{
        	width: 682,
        	x: 278
    	},
    	time: 0.3
	});
	sketch.editorcontent.animate({
		properties: {
			x: 0
		},
		time: 0.2
	});
	sketch.keyboard.animate({
		properties: {
			y: 750
		},
		time: 0.4
	});
	sketch.allnotes.animate({
		properties: {
			opacity: 0
		},
		time: 0.3
	});
	sketch.newnote.animate({
		properties: {
			opacity: 1
		},
		time: 0.3
	});
	sketch.insertrefs.animate({
		properties: {
			opacity: 0
		},
		time: 0.3
	});
	sketch.refs.animate({
    	properties:{
        	x: 958
    	},
    	time: 0.3
	});
	refExpanded = false;
};

sketch.editor.on(Events.TouchStart, function () {
	expandBool = true;
});
sketch.editor.on(Events.TouchMove, function () {
	expandBool = false;
});
sketch.editor.on(Events.TouchEnd, expand);
sketch.allnotes.on(Events.Click, expose);
sketch.refs.on(Events.Click, function () {});

sketch.hidekeyboard.on(Events.Click, function (event, layer) {
	sketch.keyboard.animate({
		properties: {
			y: 750
		},
		time: 0.4
	});
});

function makeCellDraggable (layer) {
	layer.on(Events.TouchStart, function () {
		sketch.icon.animate({
			properties: {
				opacity: 0.5
			},
			time: 0.3
		});
		sketch.cellc.animate({
			properties: {
				opacity: 0
			},
			time: 0.3
		});
	});
	layer.on(Events.TouchEnd, function () {
		sketch.icon.animate({
			properties: {
				opacity: 0
			},
			time: 0.3
		});
		sketch.cellc.animate({
			properties: {
				opacity: 1
			},
			time: 0.3
		});
	});
	
    layer.draggable.enabled = true;
    layer.draggable.overdragScale = 0;
    layer.draggable.momentum = false;
    layer.draggable.bounce = false;
    layer.draggable.velocityScale = 0;

    var startX = layer.x;
    var startY = layer.y;
    var out = false;

    layer.on(Events.Drag, function (event, layer) {
    	if (layer.x - startX < -160) {
			sketch.icon.animate({
				properties: {
					opacity: 1,
					shadowY: 15,
					shadowColor: '#888',
					shadowBlur: 10
				},
				time: 0.2
			});
			out = true;
    	} else {
			sketch.icon.animate({
				properties: {
					opacity: 0.5,
					shadowY: 0,
					shadowColor: '#888',
					shadowBlur: 0
				},
				time: 0.2
			});
			out = false;
    	}
    });
 
    layer.on(Events.DragEnd, function (event, layer) {
    	if (out) {
			sketch.reficon.opacity = 1;
			sketch.refs.animate({
		    	properties:{
		        	x: 958
		    	},
		    	time: 0.3
			});
			refExpanded = false;
    	}
        this.animate({
            properties: {
                x: startX,
                y: startY
            }, 
            curve: "spring(300,20,0)"
        });
    });
}

sketch.reficon.opacity = 0;
sketch.icon.opacity = 0;
makeCellDraggable(sketch.cell1);