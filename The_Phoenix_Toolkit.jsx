//create undo groups

// main UI creation script
var mainWindow = new Window("palette","The Phoenix Toolkit",undefined);
var groupOne = mainWindow.add("group",undefined,"groupOne")
groupOne.orientation = "column";
groupOne.add("statictext",undefined,"Tools to Streamline a VFX workflow")

var groupTwo = mainWindow.add("panel",undefined,"");
groupTwo.orientation = "column";

groupTwo.add("statictext",undefined,"Setup Scripts")
var sceneSetup = groupTwo.add("button",undefined,"Setup Noise Scene");

groupTwo.add("statictext",undefined,"Custom Objects")
var startButton = groupTwo.add("button",undefined,"Create X Remover");

var cancelButton = groupTwo.add("button",undefined,"Cancel"); 


// trigger scripts on button presses
startButton.onClick = function(){
        //app.beginUndoGroup("createRemover")
        createRemover();
    }

sceneSetup.onClick = function(){
        //app.beginUndoGroup("sceneSetup")
        createNoiseScene();
    }

cancelButton.onClick = function(){
    mainWindow.close()
    }

// generate window
mainWindow.show()
mainWindow.center()

// functions
var createRemover = function(){
      //  creates a object that uses wire removal to hide tape Xs on TVs in VFX
      nullUL = mainComp.layers.addNull(mainComp.duration);
      nullUR = mainComp.layers.addNull(mainComp.duration);
      nullLR = mainComp.layers.addNull(mainComp.duration);
      nullLL = mainComp.layers.addNull(mainComp.duration);
      nullC = mainComp.layers.addNull(mainComp.duration);
      
      nullUL.name = "Upper Left";
      nullUR.name = "Upper Right";
      nullLR.name = "Lower Right";      nullLL.name = "Lower Left";
      nullC.name = "Tape Removal Center";
      
      nullUL.property("Position").setValue([920,500]);
      nullUR.property("Position").setValue([980,500]);
      nullLR.property("Position").setValue([980,580]);
      nullLL.property("Position").setValue([920,580]);
      
      nullUL.parent = nullC;
      nullUR.parent = nullC;
      nullLR.parent = nullC;
      nullLL.parent = nullC;
      }
  
  var createNoiseScene= function(){
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
      }
