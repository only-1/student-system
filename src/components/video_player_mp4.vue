<template>
  <div>
    <div class="playerload" v-if="pagestatus == '1'">加载中....</div>
    <video-player v-else-if="pagestatus == '2'"  class="vjs-custom-skin"
                  style="width: 100%;height: 100%"
                   ref="videoPlayer"
                   :options="playerOptions"
                   :playsinline="true"
                   customEventName="customstatechangedeventname"
                   @play="onPlayerPlay($event)"
                   @pause="onPlayerPause($event)"
                   @ended="onPlayerEnded($event)"
                   @playing="onPlayerPlaying($event)"
                   @timeupdate="onPlayerTimeupdate($event)"
                   @statechanged="playerStateChanged($event)"
                   @ready="playerReadied">
    </video-player>
    <div class="playererror" v-else>错误了</div>


    <!--<div>-->
        <!--<button @click="clickPlayer('408604195332030464')">one_408604195332030464</button>-->
        <!--<button @click="clickPlayer('408604195353001984')">two_408604195353001984</button>-->
        <!--<button @click="clickPlayer('408604195373973504')">three_408604195373973504</button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import httpTool from '@/httptool';
  import cast from '@/cast';
  import tool from '@/utils';

  import 'video.js/dist/video-js.css'
//  import '@css/custom-theme.css'
  import { videoPlayer } from 'vue-video-player'

  export default {


    props:{
      cswId : String,//课件id
      chapterId : String,//章节id
      userId : String,//用户id
      //其他参数
      options:{
        type:Object,
        default: function () {
          return { useType:1  }//用途  1: 正式学习，2:调试预览
        }
      }
    },
    components: {
      videoPlayer
    },
    data() {
      return {
        pagestatus: "1",//页面状态
        playerOptions: {
          // videojs options
          muted: false,
          autoplay:false,
          language: 'zh-CN',
          playbackRates: [1],
          sources: [],
//          aspectRatio: '2:1',// 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
//          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          poster: "/static/logo.png",//封面
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        },
        cswChapter:{

          id:null,
          cswId:this.cswId,
          chapterId:this.chapterId,
          chapterlearnId:null,
          learnTimes:0,
          maxLength:0,
          startLength:0,
          overLength:0,
          useType:this.options.useType
        },
        loopTime:0
      }
    },
    watch: {
      // 如果 `chapterId` 发生改变，这个函数就会运行
      chapterId: function (newVal, oldVal) {
        console.log(newVal)
        if(!tool.isEmpty(newVal)){
          this.pagestatus = "1";
          console.log("======初始参数=====");
          console.log(this.cswChapter);
          this.cswChapter.cswId = this.cswId;
          this.cswChapter.chapterId = this.chapterId;

          console.log(this.cswChapter);
          this.loadVideo();
        }else{
          this.pagestatus = "3";
        }
      }
    },
    mounted() {
      this.$nextTick(function(){
        $('.playLeft').children().css({backgroundColor:'black',marginLeft:'0px'})
        $('.playLeft').children().children().css({backgroundColor:'black'})
        $('.vjs-custom-skin').children().css({width:'100%',height:'100%'})
      })
//      console.log('this is current player instance object', this.player);
//
//      console.log("======初始参数=====");
//      console.log(this.cswChapter);

//      this.loadVideo();
    },
    computed: {
      //播放视屏
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      loadVideo(){
        httpTool.apiHttp({
          url: cast.apiUrl_player + "/LmsPlayer/content",
          method: "get",
          params:{
            cswId: this.cswChapter.cswId,
            chapterId: this.cswChapter.chapterId,
            userId: this.userId
          },
          cbfn: (result) => {
            console.log(result);
            if(result.code == cast.returnState().BIZ_SUCCESS){
              this.cswChapter = result.data;
              this.cswChapter.startLength = result.data.currentLength;
              let source ={
                type: "video/mp4",//播放类型
                src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"//播放地址
              }
              this.playerOptions.sources.push(source);
              if(!tool.isEmpty(result.data.poster)){
                this.playerOptions.poster = result.data.poster;
              }
              this.pagestatus = "2";
              setTimeout(() => {
                  this.clickPlayer();
              }, 1000)


            }else{
              console.log("视频播放失败")
              this.pagestatus = "3";
            }
          }
        });
      },
      //保存用户学习记录
      saveUserLearnRecord(player){
        if(tool.isEmpty(player)){
          return false;
        }

        let currentTime = player.currentTime();//当前播放位置
        let server_url = cast.apiUrl_player + "/LmsPlayer/";
        let flag_newLearn = tool.isEmpty(this.cswChapter.id);

        let params;
        if(flag_newLearn){
          server_url += "start";
          let duration = player.duration();//视频时长
          params = {
            chapterId: this.cswChapter.chapterId,
            cswId:this.cswChapter.cswId,
            userId:this.userId,
            maxLength:duration,
            startLength:currentTime,
            useType:1
          };
        }else{
          server_url += "player";
          params = {
            id: this.cswChapter.id,
            chapterId: this.cswChapter.chapterId,
            chapterlearnId:this.cswChapter.chapterlearnId,
            userId:this.userId,
            learnTimes:'',
            overLength:currentTime
          };
        }
        console.log(params);

        httpTool.apiHttp({
          url: server_url,
          method: "post",
          params:params,
          cbfn: (result) => {
            console.log(result);
            console.assert(result.code == cast.returnState().BIZ_SUCCESS);
            if(result.code == cast.returnState().BIZ_SUCCESS){
              console.log("学习记录保存成功")
              if(flag_newLearn){
                this.cswChapter.id = result.data.id;
                this.cswChapter.chapterlearnId = result.data.chapterlearnId;
              }

            }else{
              console.log("学习记录保存失败")
            }
          }
        });
      },

      clickPlayer(){
//        this.cswChapter.chapterId = chapterId;
        this.player.currentTime(this.cswChapter.startLength);
        this.player.play();
      },
      // listen event
      //当媒介数据将要开始播放时运行脚本
      onPlayerPlay(player) {
        console.log('player play!')
//        this.saveUserLearnRecord(player);
      },
      //当媒介数据暂停时运行脚本
      onPlayerPause(player) {
         console.log('player pause!')
      },

      // or listen state event
      //播放状态改变事件
      playerStateChanged(playerCurrentState) {
         console.log('player current update state', playerCurrentState)
      },

      // player is ready
      //加载视频  当就绪状态（ready-state）改变时运行脚本
      playerReadied(player) {
        console.log('the player is readied', player);
      },

      //当媒介已抵达结尾时运行脚本
      onPlayerEnded(player) {
        this.saveUserLearnRecord(player);
         console.log('player ended!', player)
      },

      //当加载媒介数据时运行脚本
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      //当媒介已停止播放但打算继续播放时运行脚本
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      //当媒介数据已开始播放时运行脚本
      onPlayerPlaying(player) {
         console.log('player Playing!', player)
      },
      //当媒介改变其播放位置时运行脚本
      onPlayerTimeupdate(player) {
        let currentTime = player.currentTime();
        if(currentTime - this.loopTime > cast.playerLoopTime
          || this.loopTime - currentTime > cast.playerLoopTime){
          this.saveUserLearnRecord(player);
          this.loopTime = currentTime;
        }
        console.log('player Timeupdate!', player.currentTime())
      },
      //当媒介能够开始播放但可能因缓冲而需要停止时运行脚本
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      //当媒介能够无需因缓冲而停止即可播放至结尾时运行脚本
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      }
    }
  }
</script>

<style>
.vjs-custom-skin div{
  width: 100%;
  height:100%;
}
.vjs-custom-skin .vjs-loading-spinner{
  width: 50px;
  height: 50px;
}
.video-js .vjs-big-play-button{
 position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -43px;
  margin-top: -20px;
}
/*.vjs-custom-skin div video{*/
  /*width: 100%;*/
  /*height: 600px;*/
/*}*/
</style>
