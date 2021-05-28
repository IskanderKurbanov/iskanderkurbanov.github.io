

class WeatherApplet{
  constructor(data) {

    this.width = document.body.clientWidth

    this.dataTime = new Date(data.time)
    
    this.dataWeather = data.weather

    this.weatherBlock = this.createElement(this.dataWeather, data.city)

    this.timeBlock = this.weatherBlock.querySelector('.timer')
    this.yearTimeBlock = this.weatherBlock.querySelector('.yearTimer')

    this.dragableFunc = false

    this.weatherBlockHeader = this.weatherBlock.querySelector('.weatherBlockHeader')

    this.timer([this.timeBlock, this.yearTimeBlock], this.dataTime)

    this.headFunc()
  }

  createElement(data, city){
    let dragHead
    const weatherBlock = document.createElement('div')
    document.body.append(weatherBlock)
    weatherBlock.className = "weatherBlock"
    this.width>=1000?dragHead='<article class="anchorDrgBtn"></article>':dragHead=''
    weatherBlock.innerHTML = `
                            <div style="display: flex; class="weatherBlockHeader">
                              <article class="anchorExtBtn"></article>
                              ${dragHead}
                              <article class="anchorBtn"></article>
                            </div>
                            <div style="display: flex;margin-bottom:10px;">
                            <img src="${data.icon}" alt="${data.main}" style="width:80px;height:80px;">
                            <aside>
                              <p style="font-size:36px;">${data.temp}°C</p>
                              <p style="font-size:14px;">feels like: ${data.feels_like}°C</p>
                              <p style="font-size:14px;">${data.description}</p>
                            </aside>
                            </div>
                            <p class="timer"></p>
                            <p class="yearTimer"></p>
                            <p style="font-size:18px;">${city}</p>
                            `
    return weatherBlock
  }

  headFunc(){
    this.weatherBlock.querySelector('.anchorExtBtn').addEventListener('click', ()=>{
      if(this.weatherBlock.className=="weatherBlockExt")
        this.weatherBlock.className="weatherBlock"
      else{
        this.weatherBlock.className="weatherBlockExt"
        this.weatherBlock.style.cssText = ''
      }
    })
    if(this.width>=1000){
    this.weatherBlock.querySelector('.anchorDrgBtn').addEventListener('click', ()=>{
      this.dragableFunc = !this.dragableFunc
      if(this.dragableFunc)
        this.dragable(this.weatherBlock)
      else if(!this.dragableFunc || this.weatherBlock.className=="weatherBlockExt")
        this.weatherBlock.style.cssText = ''
    })}
    this.weatherBlock.querySelector('.anchorBtn').addEventListener('click', ()=>this.closeElement(this.weatherBlock, this.timeInterval))
  }

  dragable(object){
    if(object.className=="weatherBlock")
      object.style.position='absolute'
    this.dragValue
    this.move=false
    object.onmousedown=()=>{
      this.dragValue=object
      this.move=true
    }
    object.onmouseup=(e)=>{
      this.dragValue=null
      this.move=false
    }
    object.onmousemove=(e)=>{
      if(this.move && object.className=="weatherBlock" && this.dragableFunc){
        let x=e.pageX
        let y=e.pageY
        this.dragValue.style.left=x+"px"
        this.dragValue.style.top=y+"px"
      }
    }
  }

  timer(object, dataTime){

    this.curr_date = dataTime.getDate()
    this.curr_month = dataTime.getMonth() + 1
    this.curr_year = dataTime.getFullYear()
    this.curr_h = dataTime.getHours()
    this.curr_m = dataTime.getMinutes()
    this.curr_s = dataTime.getSeconds()

    object[1].innerHTML = `${this.curr_date}/${this.curr_month}/${this.curr_year}`

    object[0].innerHTML = this.curr_h + ':' + this.curr_m + '<span class="timerSecond">:' + this.curr_s + "</span>"
    this.timeInterval=setInterval(()=>this.tick(object[0]), 1000)
  }

  tick(object){
    this.curr_s++;
      if (this.curr_s >= 60){
        this.curr_s = 0
        this.curr_m++
      } else if (this.curr_m >= 60){
        this.curr_m = 0
        this.curr_h++
      } else if (this.curr_h >= 24 ){
        this.curr_h = 0
      }
    object.innerHTML = this.curr_h + ':' + this.curr_m + '<span class="timerSecond">:' + this.curr_s + "</span>"
  }

  closeElement(object, timeInterval){
    clearInterval(timeInterval)
    object.remove()
  }
}