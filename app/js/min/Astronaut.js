define(["easel","tween","sound","preload"],function(){var e=Backbone.View.extend({index:0,sprite:null,src:"img/astronaut.png",hit:!1,fx_id:"fx_hurt",positions:[{x:220,y:360},{x:570,y:380},{x:908,y:390},{x:290,y:525},{x:720,y:538},{x:1040,y:500}],dimensions:[{xScale:.68,yScale:.68},{xScale:.75,yScale:.75},{xScale:.6,yScale:.6},{xScale:.72,yScale:.72},{xScale:.75,yScale:.75},{xScale:.76,yScale:.76}],frameSettings:[[0,0,226,389,0,113,194],[226,0,226,389,0,113,194],[453,0,243,389,0,124,194],[696,0,219,389,0,113,194],[915,0,227,389,0,113,194],[1142,0,227,389,0,113,194]],hole:0,tween:null,score_sprite:null,score_value:5,score_miss:0,sound_smash:"fx",life_state:0,life_max:5,lifes:5,delay_min:0,delay_max:260,initialize:function(){_.bindAll(this,"onClick","updateLifes","getLifes","gotoFrame","addListeners","removeListeners","reset","render","removeAstronaut","hide","setHole","close"),this.updateLifes();var e=new createjs.SpriteSheet({images:[this.src],frames:this.frameSettings,animations:{idle:0,dead:4,ghost:5}});this.sprite=new createjs.Sprite(e,"idle"),this.sprite.stop()},addListeners:function(){this.sprite.on("click",this.onClick)},removeListeners:function(){this.sprite.removeAllEventListeners()},onClick:function(){var e=this;if(e.hit=!0,e.trigger("hit"),createjs.Sound.play(e.fx_id),e.life_state++,e.gotoFrame(e.life_state),e.updateLifes()<1)return e.removeListeners(),e.sprite.mask=null,void createjs.Tween.get(e.sprite,{override:!0}).wait(1e3).to({alpha:0,scaleX:1.25,scaleY:1.25},200,createjs.Ease.sineIn).call(function(){e.trigger("dead")});var t=e.sprite.getBounds(),i=e.positions[e.hole].y+80;createjs.Tween.get(e.sprite,{override:!0}).wait(400).to({y:i+t.height},200,createjs.Ease.sineIn).call(e.removeAstronaut,null,e)},reset:function(){var e=this;this.life_state=0,this.removeListeners(),this.addListeners(),this.updateLifes(),this.sprite.gotoAndStop(this.life_state)},gotoFrame:function(e){this.sprite.gotoAndStop(e)},updateLifes:function(){return this.lifes=this.life_max-(this.life_state+1),this.lifes},getLifes:function(){return this.lifes-1},render:function(){var e=this,t=this.positions[this.hole].y+150,i=this.positions[this.hole].x;this.sprite.x=i,this.sprite.y=t,this.sprite.scaleX=this.dimensions[this.hole].xScale,this.sprite.scaleY=this.dimensions[this.hole].yScale,this.sprite.alpha=1,this.tween=new createjs.Tween(this.sprite).to({y:this.positions[this.hole].y,scaleX:this.dimensions[this.hole].xScale,scaleY:this.dimensions[this.hole].yScale},260,createjs.Ease.quartOut).wait(e.getRandomInt(e.delay_min,e.delay_max)).call(this.hide,null,this)},hide:function(){var e=this,t=this.positions[this.hole].y+150;this.tween=new createjs.Tween(this.sprite,{override:!0}).to({y:t},300,createjs.Ease.backIn).call(function(){e.removeAstronaut()})},removeAstronaut:function(){this.trigger("gone")},close:function(){this.sprite.removeAllEventListeners(),this.unbind(),this.remove(),this.onClose&&this.onClose(),delete this},setHole:function(e,t){this.hole=e,t&&(this.sprite.mask=t),this.render()},getRandomInt:function(e,t){return Math.floor(Math.random()*(t-e+1))+e}});return e});