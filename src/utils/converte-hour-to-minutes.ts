//convert 10:00 para 600

export function covertHoursToMinutes (hour: String){
    const [hours, minutes] = hour.split(':').map(Number);

    // console.log((hours*60) + minutes)
    return ((hours*60) + minutes)

}