export const selectTravelesList = [
    {
        id: 1,
        title: 'Solo Traveler',
        desc: 'Exploring the world on your own terms',
        icon: '🧳',
        people: '1 Person'
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Romantic getaway for two',
        icon: '💑',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family Trip',
        desc: 'Creating memories with loved ones',
        icon: '👨‍👩‍👧‍👦',
        people: '3-5 People'
    },
    {
        id: 4,
        title: 'Friends Group',
        desc: 'Adventure with your closest friends',
        icon: '🎉',
        people: '5-10 People'
    },
    {
        id: 5,
        title: 'Business Travel',
        desc: 'Professional trip with efficiency in mind',
        icon: '💼',
        people: '1-2 People'
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Budget-Friendly',
        desc: 'Smart spending without compromising experiences',
        icon: '💵',
        range: '$'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Comfortable travel with balanced expenses',
        icon: '💰',
        range: '$$'
    },
    {
        id: 3,
        title: 'Premium',
        desc: 'Luxurious experiences with premium comforts',
        icon: '💎',
        range: '$$$'
    },
    {
        id: 4,
        title: 'Luxury',
        desc: 'Ultimate indulgence without financial constraints',
        icon: '👑',
        range: '$$$$'
    }
]

export const AI_PROMPT = `Create a comprehensive travel plan for {location} spanning {totalDays} days designed for {traveler} with a {budget} budget.

**Hotels Section:**
Provide 3-5 carefully selected hotel options including:
- HotelName: Official name of the accommodation
- HotelAddress: Complete physical address
- Price: Average nightly rate in local currency
- Hotel image url: High-quality image link
- Geo coordinates: Latitude and longitude
- Rating: Guest rating out of 5
- Description: 2-3 sentence overview highlighting unique features

**Itinerary Section:**
Design a detailed day-by-day plan with:
- Day-wise structure with logical geographical flow
- Morning, afternoon, and evening activities
- PlaceName: Official name of each attraction
- PlaceDetails: Brief description and highlights
- PlaceImage: Representative photo URL
- GeoCoordinates: Precise location coordinates
- TicketPricing: Entry fees if applicable
- TimeTravel: Recommended duration per location
- BestTimeToVisit: Optimal visiting hours

**Additional Considerations:**
- Include local dining recommendations near each activity
- Suggest transportation options between locations
- Account for rest periods and travel time
- Account for {traveler} type preferences
- Align experiences with {budget} constraints
- Include hidden gems and local favorites
- Consider seasonal factors and weather conditions

**Format Requirements:**
Return response in valid JSON format only, maintaining the exact structure used in previous responses without any additional commentary or markdown formatting.`