//convert  600 para 10:00 

export function covertMinutesToHours (minutes: number){
    

    const hours = Math.floor(minutes/60);
    const min = minutes %60;

    // console.log((hours*60) + minutes)
    return ( `${String(hours).padStart(2,'0')}:${String(min).padStart(2,'0')}`)

}