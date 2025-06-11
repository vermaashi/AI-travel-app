export const selectTravelesList=[
    {
        id: 1,
        title: 'just me',
        desc: 'A sole travels in exploration',
        icon: '🦅',
        people:'1'
    },
    {
        id: 2,
        title: 'A couple',
        desc: 'Two Travels in tandem',
        icon: '🍻',
        people:'2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of Fun loving adv',
        icon: '🏡',
        people:'3 to 5 People'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A brunch of thrills-seekes',
        icon: '🏕️',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions=[
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: '💵',
        
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰',
        
    },
    {
        id: 3 ,
        title: 'Luxury',
        desc: 'Dont worry about the cost',
        icon: '💎',
        
    },
]

export const AI_PROMPT=' Generate travel Plan for Location : {location}, for{totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel Address, Price, Hotel image url, geo cordinates, rating, description and suggest itenary with placeName, Place Details, Place Image, Url, Geo-Cordinates, ticket pricing, time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.' 