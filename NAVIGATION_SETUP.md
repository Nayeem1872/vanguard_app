# Card Details Navigation Setup

## Overview

Successfully implemented navigation from recommendation cards to detailed card pages with dynamic routing.

## Features Implemented

### 1. Dynamic Routing

- Created dynamic route: `/cardDetails/[id]/page.tsx`
- Supports URL parameters like `/cardDetails/12345`

### 2. Card Click Navigation

- Clicking on any recommendation card redirects to its details page
- Uses recommendation ID from API response or falls back to array index

### 3. ID Field Support

- Added optional `id` and `_id` fields to Recommendation interface
- Supports both MongoDB-style `_id` and standard `id` fields

## API Requirements

Your API response should include an `id` or `_id` field for each recommendation:

```json
{
  "success": true,
  "data": [
    {
      "id": "rec_12345", // or "_id": "507f1f77bcf86cd799439011"
      "risk": "HIGH RISK",
      "amount": "+$14.1k",
      "title": "Optimize Customer Success Workflow 1"
      // ... other fields
    }
  ]
}
```

## Navigation Flow

1. **User clicks recommendation card** → `handleCardClick()` is triggered
2. **Extract ID**: Uses `rec.id || rec._id || index.toString()`
3. **Navigate**: `router.push(\`/cardDetails/\${recommendationId}\`)`
4. **Dynamic page loads**: `/cardDetails/[id]/page.tsx` receives the ID
5. **Return navigation**: "Return to Results" button goes back to home page

## Updated Components

### RecommendationCards.tsx

- Added `useRouter` hook
- Added `handleCardClick` function
- Updated Recommendation interface with optional ID fields
- Added onClick handler to card divs

### MainContent.tsx & ComparisonDialog.tsx & RecommendationDrawer.tsx

- Updated Recommendation interfaces to include optional ID fields

### /cardDetails/[id]/page.tsx (New)

- Dynamic page component that receives ID parameter
- Displays recommendation details with ID in URL
- Includes return navigation functionality

## Usage

1. **API Response**: Ensure your API includes `id` or `_id` field
2. **Click Card**: Click any recommendation card to navigate
3. **View Details**: See recommendation details with ID in URL
4. **Return**: Click "Return to Results" to go back

## Fallback Behavior

If no ID is provided in API response:

- System uses array index as ID (0, 1, 2, etc.)
- Navigation still works seamlessly
- URLs will be: `/cardDetails/0`, `/cardDetails/1`, etc.

## Testing

Test the navigation by:

1. Running `npm run dev`
2. Generate some recommendations
3. Click on any recommendation card
4. Verify URL shows `/cardDetails/[some-id]`
5. Check that "Return to Results" works
