define(["easel","tween","sound","preload"],function(){var e=Backbone.View.extend({index:0,sprite:null,src:"",hit:!1,positions:[],dimensions:[],hole:0,tween:null,score_sprite:null,score_value:5,score_miss:3,delay_min:400,delay_max:840,fx_sounds:[],fx_id:"fx",enemy:null,enemies_config:[{src:"img/alien1.png",positions:[{x:220,y:335},{x:568,y:345},{x:912,y:335},{x:290,y:510},{x:720,y:540},{x:1040,y:485}],dimensions:[{xScale:.68,yScale:.68},{xScale:.8,yScale:.8},{xScale:.65,yScale:.65},{xScale:.78,yScale:.78},{xScale:.8,yScale:.8},{xScale:.7,yScale:.7}],frameSettings:[[0,0,224,310,0,112,155],[224,0,224,310,0,112,155],[448,0,224,310,0,112,155]],fx:"fx_flan"},{src:"img/alien2.png",positions:[{x:222,y:310},{x:570,y:360},{x:915,y:320},{x:285,y:465},{x:735,y:530},{x:1035,y:4685}],dimensions:[{xScale:.78,yScale:.78},{xScale:.82,yScale:.82},{xScale:.7,yScale:.7},{xScale:.9,yScale:.9},{xScale:.8,yScale:.8},{xScale:.78,yScale:.78}],frameSettings:[[0,0,220,209,0,110,104],[220,0,220,209,0,110,104],[440,0,220,209,0,110,104]],fx:"fx_fly"},{src:"img/alien3.png",positions:[{x:210,y:320},{x:555,y:320},{x:905,y:320},{x:290,y:455},{x:700,y:510},{x:1035,y:465}],dimensions:[{xScale:.6,yScale:.6},{xScale:.76,yScale:.76},{xScale:.62,yScale:.62},{xScale:.8,yScale:.8},{xScale:.85,yScale:.85},{xScale:.7,yScale:.7}],frameSettings:[[0,0,245,395,0,123,197],[246,0,324,395,0,198,197],[570,0,246,395,0,123,197]],fx:"fx_worm"}],blood:null,blood_src:"img/blood.png",blood_frames:[[0,0,145,78,0,73,39],[145,0,167,78,0,83,39]],initialize:function(){_.bindAll(this,"render","removeEnemy","hide","setHole","close");var e=Math.floor(3*Math.random());this.src=this.enemies_config[e].src,this.positions=this.enemies_config[e].positions,this.dimensions=this.enemies_config[e].dimensions,this.frameSettings=this.enemies_config[e].frameSettings;var i=new createjs.SpriteSheet({images:[this.blood_src],frames:this.blood_frames});this.blood=new createjs.Sprite(i),this.blood.gotoAndStop(Math.round(Math.random())),this.blood.scaleX=1.7,this.blood.scaleY=1.7,this.blood.visible=!1;var s=new createjs.SpriteSheet({images:[this.src],frames:this.frameSettings,animations:{idle:0,dead:1+Math.round(Math.random())}});this.enemy=new createjs.Sprite(s,"idle"),this.sprite=new createjs.Container,this.sprite.on("click",function(){this.sprite.removeAllEventListeners(),this.hit=!0,this.trigger("hit"),createjs.Sound.play(this.fx_id),this.enemy.gotoAndStop("dead");var e=this.sprite.getBounds(),i=this.positions[this.hole].y+80;createjs.Tween.get(this.sprite,{override:!0}).wait(300).to({scaleX:this.sprite.scaleX+.1,scaleY:this.sprite.scaleY+.1,alpha:0},180,createjs.Ease.quartIn).call(this.removeEnemy,null,this),this.blood.visible=!0},this),this.sprite.addChild(this.blood),this.sprite.addChild(this.enemy);var t={width:this.frameSettings[0][2],height:this.frameSettings[0][2]},n=new createjs.Shape;n.graphics.beginFill("#0F0").drawRect(0,0,t.width+200,t.height+120),n.regX=(t.width+80)/2,n.regY=(t.height+80)/2,this.sprite.hitArea=n;var a=["fx_smash1"];this.fx_id=a[Math.round(Math.random()*(a.length-1))]},render:function(){var e=this,i=this.positions[this.hole].y+150,s=this.positions[this.hole].x;this.sprite.x=s,this.sprite.y=i,this.sprite.scaleX=this.dimensions[this.hole].xScale,this.sprite.scaleY=this.dimensions[this.hole].yScale,this.tween=new createjs.Tween(this.sprite).to({y:this.positions[this.hole].y,scaleX:this.dimensions[this.hole].xScale,scaleY:this.dimensions[this.hole].yScale},240,createjs.Ease.quartOut).wait(e.getRandomInt(e.delay_min,e.delay_max)).call(this.hide,null,this)},hide:function(){var e=this,i=this.positions[this.hole].y+150;this.tween=new createjs.Tween(this.sprite,{override:!0}).to({y:i},280,createjs.Ease.backIn).call(function(){e.removeEnemy()})},removeEnemy:function(){this.trigger("enemyGone"),this.hit||this.trigger("miss"),this.close()},close:function(){this.sprite.removeAllEventListeners(),this.unbind(),this.remove(),this.onClose&&this.onClose(),delete this},setHole:function(e,i){this.hole=e,i&&(this.sprite.mask=i),this.render()},getRandomInt:function(e,i){return Math.floor(Math.random()*(i-e+1))+e}});return e});