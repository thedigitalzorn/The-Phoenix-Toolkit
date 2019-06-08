
var mainComp = app.project.activeItem;
//check if 16bc
//delete extra noise reduction
//notes: subtract blendmode is 5248 & add is 5220 & normal is 5212
//check of layers selected
//check if denoise is only effect added
//only works with reduce noise only on layer
var layer = mainComp.selectedLayers[0];
var effectName = layer.Effects(1).matchName;
if ( effectName != "NeatVideo4A" && effectName != "RG Denoiser3"){
    alert("A denoiser has not been applied to the selected clip");
} else {        
    var copyOne = layer.duplicate();
    var copyTwo = copyOne.duplicate();
    var isolatedNoise = mainComp.layers.precompose([1,2],"Isolated_Noise",true);
    
    isolatedNoise.layers[1].blendingMode = 5248;
    mainComp.layers[1].blendingMode = 5220;
           
    var adjLayer = mainComp.layers.addSolid([1.0,1.0,1.0], "Noise_CC", mainComp.width, mainComp.height, 1);
    adjLayer.adjustmentLayer = true;
    var outerLevels = adjLayer.Effects.addProperty("Levels");
    outerLevels.property(3).setValue(0.03051757812);
    outerLevels.property(4).setValue(1.03051757813);
    $.writeln("midpoint");
    
    //var innerLevels1 = isolatedNoise.layers[1].Effects.addProperty("Levels");
    var innerLevels2 = isolatedNoise.layers[2].Effects.addProperty("Levels");
    //innerLevels1.property(6).setValue(0.03051757812);
    //innerLevels1.property(7).setValue(1.03051757813);
    innerLevels2.property(6).setValue(0.03051757812);
    innerLevels2.property(7).setValue(1.03051757813);
    isolatedNoise.layers[2].Effects(1).enabled = false;
    
    alert("Your project has been set up, Sir!");
    }

