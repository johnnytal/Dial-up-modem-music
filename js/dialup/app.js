var gameMain = function(game){
    buttons = [];
    sfxs = [];
    multi = false;
    toggle = false;
    musicPlayed = false;
};

gameMain.prototype = {
    create: function(){  
        modem = this.add.sprite(0, 0, 'modem');
        
        musicBtn = this.add.sprite(0, 130, 'musicBtn');
        musicBtn.scale.set(1.2, 1.2);
        musicBtn.x = game.world.centerX - musicBtn.width / 2;
        musicBtn.inputEnabled = true;
        musicBtn.events.onInputDown.add(playMusic, this);
        
        loadSfx();

        for (n=0; n<10; n++){
            if (n>5){
                factorY = 190;
                factorX = -900;  
            } 
            else{ 
                factorX = 200;  
                factorY = 0; 
            }
            
            buttons[n] = this.add.sprite(140 + n*215 + factorX, 467 + factorY, 'buttons');
            buttons[n].scale.set(0.85, 0.85);
            buttons[n].frame = n; 
            buttons[n].inputEnabled = true;
            
            buttons[n].events.onInputDown.add(playSound, this);
        }
        
        headLabel = this.add.text(395, 30, 'DUMMI - Dial Up Modem Music Instrument', {
            font: '52px ' + font, fill: 'lightblue', fontWeight: 'normal', align: 'center',
            stroke: 'black', strokeThickness: 4
        });
        
        
        multiLabel = this.add.text(485, 300, 'Multi - Off', {
            font: '48px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'center',
            stroke: 'white', strokeThickness: 1
        });
        
        multiLabel.inputEnabled = true;
        multiLabel.events.onInputDown.add(function(){
            if (multi){
                multi = false;
                multiLabel.fill = 'darkblue';
                multiLabel.text = 'Multi - Off';
            }
            else{
                multi = true;
                multiLabel.fill = 'purple';
                multiLabel.text = 'Multi - On';
            }
        }, this);
        
        toggleLabel = this.add.text(1170, 300, 'Toggle - Off', {
            font: '48px ' + font, fill: 'darkblue', fontWeight: 'normal', align: 'center',
            stroke: 'white', strokeThickness: 1
        });
        
        toggleLabel.inputEnabled = true;
        toggleLabel.events.onInputDown.add(function(){
            if (toggle){
                toggle = false;
                toggleLabel.fill = 'darkblue';
                toggleLabel.text = 'Toggle - Off';
            }
            else{
                toggle = true;
                toggleLabel.fill = 'purple';
                toggleLabel.text = 'Toggle - On';
            }
        }, this);

	    setTimeout(function(){
	        try{
	            StatusBar.hide();
	        } catch(e){}   
	    }, 1000);
	    
	    logo = this.add.sprite(210, 640, 'logo');
	    logo.scale.set(0.85, 0.7);
	    logo.alpha = 0.9;
	    
        initAd();
    },
};

function playMusic(_that){
	if (!musicPlayed){
		musicSfx.play();
		musicPlayed = true;
		_that.tint = '0x33ff00';
	}
	else{
		musicSfx.stop();
		musicPlayed = false;
		_that.tint = '0xffffff';
	}
}

function loadSfx(){
	musicSfx = game.add.audio('music', 0.5, true);
	
    short1Sfx = game.add.audio('short1', 1, false);
    short2Sfx = game.add.audio('short2', 1, false);
    short3Sfx = game.add.audio('short3', 1, false);  
    short4Sfx = game.add.audio('short4', 1, false);  
    short5Sfx = game.add.audio('short5', 1, false);  
    short6Sfx = game.add.audio('short6', 1, false);
      
    long1Sfx = game.add.audio('long1', 1, false);  
    long2Sfx = game.add.audio('long2', 1, false);  
    long3Sfx = game.add.audio('long3', 1, false);  
    long4Sfx = game.add.audio('long4', 1, false);  
    
    sfxs = [short1Sfx, short2Sfx, short3Sfx, short4Sfx, short5Sfx, short6Sfx, long1Sfx, long2Sfx, long3Sfx, long4Sfx];  
}

function playSound(_that){
	var theFrame = _that.frame;
	var sound = sfxs[theFrame];
	
	
    if (!sound.isPlaying){
        if (!multi) stopSounds();
        
        if (!sound.paused){
            sound.play();    
        }
        else{
            sound.resume();
        }

        if (theFrame < 6){
        	_that.tint = '0xffaa44';
	    }
	    else{
	       _that.tint = '0x44ffaa'; 
	    }
        
        sound.onStop.add(function(){
           _that.tint = 0xffffff;
        }, this);
    } 
    
    else{
        if (toggle){
            sound.stop();
        }
        else{
            sound.play();
        }
    }    
}

function stopSounds(){
    for (n = 0; n < sfxs.length; n++){
        sfxs[n].stop();
    }   
}

function initAd(){
    var admobid = {};

    admobid = {
        banner: 'ca-app-pub-9795366520625065/9232391037'
    };
    
    try{
        if(AdMob) AdMob.createBanner({
           adId: admobid.banner,
           position: AdMob.AD_POSITION.TOP_CENTER,
           autoShow: true
        });
    } catch(e){}
}

