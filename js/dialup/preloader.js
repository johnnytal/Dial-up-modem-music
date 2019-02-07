var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        // create progress % text
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px ' + font, fill: 'green', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        
        // load assets
        this.game.load.spritesheet("buttons", "assets/dialup/images/buttons.png", 2400/10, 154);
        this.game.load.image("modem", "assets/dialup/images/bg.png");
        this.game.load.image("musicBtn", "assets/dialup/images/musicBtn.png");
        this.game.load.image("logo", "assets/dialup/images/512x512Logo2018.png");

        this.game.load.audio('short1', 'assets/dialup/audio/short1.ogg'); 
        this.game.load.audio('short2', 'assets/dialup/audio/short2.ogg'); 
        this.game.load.audio('short3', 'assets/dialup/audio/short3.ogg'); 
        this.game.load.audio('short4', 'assets/dialup/audio/short4.ogg'); 
        this.game.load.audio('short5', 'assets/dialup/audio/short5.ogg'); 
        this.game.load.audio('short6', 'assets/dialup/audio/short6.ogg'); 
        
        this.game.load.audio('long1', 'assets/dialup/audio/long1.ogg'); 
        this.game.load.audio('long2', 'assets/dialup/audio/long2.ogg'); 
        this.game.load.audio('long3', 'assets/dialup/audio/long3.ogg'); 
        this.game.load.audio('long4', 'assets/dialup/audio/long4.ogg'); 
        
        this.game.load.audio('music', 'assets/dialup/audio/music.ogg'); 
    },
    
    create: function(){
        this.game.state.start("Game");  
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
   // console.log(progress, cacheKey, success);
};
