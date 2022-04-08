import { EventEmitter } from 'eventemitter3'

export enum CountdownEventName {
    START = 'start',
    STOP = 'stop',
    RUNNING = 'running'
}
//状态枚举
enum CountdownStatus {
    running, //进行中
    paused,   // 暂停
    stoped   //结束
}

export interface RemainTimeDate {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    counts: number;
}

interface CountdownEventMap {
    [CountdownEventName.START]: [],
    [CountdownEventName.STOP]: [],
    [CountdownEventName.RUNNING]: [RemainTimeDate], //运行时应该返回数据。
}


export function fillZero(num: number) {
    return `0${num}`.slice(-2)
}

export class Countdown extends EventEmitter<CountdownEventMap>{
    //时间格式 换算
    private static COUNT_IN_MILLSECOND: number = 1 * 1000;
    private static SECOND_IN_MILLSECOND: number = 60 * Countdown.COUNT_IN_MILLSECOND
    private static MINUTE_IN_MILLSECOND: number = 60 * Countdown.SECOND_IN_MILLSECOND
    private static HOUR_IN_MILLSECOND: number = 60 * Countdown.MINUTE_IN_MILLSECOND
    private static DAY_IN_MILLSECOND: number = 24 * Countdown.HOUR_IN_MILLSECOND


    private endTime: number;
    private step: number;
    private status: CountdownStatus = CountdownStatus.stoped; //默认暂停中
    private remainTime: number = 0;
    /**
     * Creates an instance of CountDown.
     * @param {number} endTime  // 结束事件
     * @param {number} [step=1e3]  // 跳动间隔事件
     * @memberof CountDown
     */
    constructor(endTime: number, step: number = 1e3) {
        super() //extends 一定要super
        this.endTime = endTime;
        this.step = step;
        this.start()
    }

    public start() {
        this.emit(CountdownEventName.START)
        this.status = CountdownStatus.running;
        this.countdown();
    }
    public stop() {
        this.emit(CountdownEventName.STOP)
        this.status = CountdownStatus.stoped;
    }
    //主体运行函数
    private countdown() {
        if (this.status !== CountdownStatus.running) {
            return
        }
        this.remainTime = Math.max(this.endTime - Date.now(), 0);
        this.emit(CountdownEventName.RUNNING, this.parseRemainTime(this.remainTime))

        if (this.remainTime > 0) {
            setTimeout(() => this.countdown(), this.step)
        }
    }

    /**
     *
     *
     * @private
     * @param {number} remianTime 当前时间
     * @return {*}  {RemainTimeDate}  时间数据格式
     * @memberof CountDown
     */
    private parseRemainTime(remainTime: number): RemainTimeDate {
        let time = remainTime;
        const days = Math.floor(time / Countdown.DAY_IN_MILLSECOND)
        time = time % Countdown.DAY_IN_MILLSECOND

        const hours = Math.floor(time / Countdown.HOUR_IN_MILLSECOND)
        time = time % Countdown.HOUR_IN_MILLSECOND

        const minutes = Math.floor(time / Countdown.MINUTE_IN_MILLSECOND)
        time = time % Countdown.MINUTE_IN_MILLSECOND


        const seconds = Math.floor(time / Countdown.SECOND_IN_MILLSECOND)
        time = time % Countdown.SECOND_IN_MILLSECOND

        const counts = Math.floor(time / Countdown.COUNT_IN_MILLSECOND)

        return {
            days,
            hours,
            minutes,
            seconds,
            counts
        }
    }
}