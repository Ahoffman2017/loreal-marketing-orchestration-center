Update the attached “L’Oréal Marketing Orchestration Center – Shared Decision Workspace” screen.

IMPORTANT
- This prompt depends on the attached screenshot/reference. Use it to preserve the current layout, spacing, and design language.
- Do not redesign the full page from scratch.
- Keep the current white-background enterprise UI style.
- Keep the current navigation structure, card hierarchy, and overall page layout.
- Improve clarity, usability, and decision transparency.

STYLE RULES
- Background: white
- Primary: black
- Secondary: gold
- Typography: Roboto
- Icons: Lucide
- Global corner radius: 4px
- Crisp, premium spacing and padding everywhere
- Fixed TopNav
- Fixed LeftNav
- Collapsible right AI console that pushes content left when expanded and expands content back when collapsed
- Responsive and adaptive, mobile first

PRIMARY UX PROBLEM TO FIX
The CTA “Open Platform Detail” is too generic.
Users cannot tell which platform will open, because multiple contributing platforms are shown on the same decision card.

GOAL
Make it immediately clear:
1. which platform is the primary source platform for this recommendation
2. which platform-specific page will open when the user clicks the CTA
3. how users can open the other contributing platforms if they want deeper detail

KEEP THE CURRENT PAGE CONTENT AND STRUCTURE, BUT MAKE THESE CHANGES

==================================================
1) ADD A “PRIMARY PLATFORM” LABEL TO EACH DECISION CARD
==================================================

For each Priority Decision Card, add a small but visible row between the platform chips and the AI Recommendation section:

Label:
PRIMARY PLATFORM

Value:
- Card 1: Creator to Commerce ROI Engine
- Card 2: Brand-Safe Promotions Lab
- Card 3: Media Influencer Platform

Visual treatment:
- compact inline label
- subtle but clear
- use a small icon and a bordered pill or text tag
- align with the current clean enterprise UI
- do not make it flashy

Purpose:
Users should immediately understand which platform is the main driver of the recommendation.

==================================================
2) RENAME THE “OPEN PLATFORM DETAIL” BUTTON
==================================================

Replace the generic CTA with a specific CTA based on the primary platform for each card.

Card 1:
Replace “Open Platform Detail”
With:
“Open Creator ROI Detail”

Card 2:
Replace “Open Platform Detail”
With:
“Open Promotions Lab Detail”

Card 3:
Replace “Open Platform Detail”
With:
“Open Media Platform Detail”

Button style:
- keep current button system
- preserve size, border, spacing, and visual weight
- only improve label clarity

Purpose:
The CTA must clearly tell the user where the click will go.

==================================================
3) MAKE PLATFORM CHIPS CLICKABLE AND EXPLICIT
==================================================

The contributing platform chips should become clear navigation elements.

For each chip:
- hover state
- active state
- tooltip or helper text on hover:
  “Open [platform name] detail”

Example chip tooltips:
- Integrated Media Intelligence → “Open Integrated Media Intelligence detail”
- Creator ROI → “Open Creator to Commerce ROI Engine detail”
- Media → “Open Media Influencer Platform detail”
- Demand → “Open Trend-to-Plan Demand Sensing detail”
- Promotions → “Open Brand-Safe Promotions Lab detail”

Visual behavior:
- chips should look slightly more interactive without breaking the clean design
- subtle hover border or background tint
- cursor pointer
- optional external-link or arrow icon on hover only

Purpose:
Users should understand that they can open any platform directly, not only the primary one.

==================================================
4) ADD A SMALL EXPLANATION UNDER THE PRIMARY PLATFORM LABEL
==================================================

Under the “Primary Platform” row, add one short supporting line in muted text:

Example for Card 1:
“This platform is the main source behind the recommendation.”

Example for Card 2:
“This platform defines the key business constraint driving this action.”

Example for Card 3:
“This platform is the main execution layer for this recommendation.”

Keep this line very short and unobtrusive.

Purpose:
Explain why this platform is primary.

==================================================
5) OPTIONAL SECONDARY CTA MENU
==================================================

Add a small secondary link or icon-only menu beside the main platform CTA:

Label:
“More platform details”

When expanded, show:
- Open IMI Detail
- Open Creator ROI Detail
- Open Demand Detail
- Open Promotions Lab Detail
- Open Media Platform Detail

Keep this compact.
This should not compete with the main CTA.
This can be a small dropdown, overflow menu, or inline text link.

Purpose:
Allow deeper exploration without cluttering the card.

==================================================
6) IMPROVE CARD INFORMATION HIERARCHY
==================================================

Preserve the current layout, but slightly improve hierarchy so this order is easier to scan:

1. Decision title + status + impact
2. Short recommendation summary
3. Contributing platform chips
4. Primary Platform row
5. AI Recommendation
6. Contributing platform signals
7. Action buttons

Do not make the cards taller unless necessary.
Keep the design compact and executive-friendly.

==================================================
7) APPLY THE PLATFORM MAPPING RULES CONSISTENTLY
==================================================

Use this exact mapping:

Card 1:
Decision = Accelerate creator-led support for Génifique
Primary Platform = Creator to Commerce ROI Engine
Main CTA = Open Creator ROI Detail

Card 2:
Decision = Delay promotion in DACH to protect margin
Primary Platform = Brand-Safe Promotions Lab
Main CTA = Open Promotions Lab Detail

Card 3:
Decision = Reallocate media budget to creator-supported conversion path
Primary Platform = Media Influencer Platform
Main CTA = Open Media Platform Detail

==================================================
8) KEEP THE REST OF THE PAGE INTACT
==================================================

Do not remove:
- executive summary cards
- priority decision cards
- signal alignment section
- conflicts, risks, and guardrails
- right-side AI Recommendation Layer
- current nav structure

Only improve clarity and interaction logic related to platform detail navigation.

==================================================
9) INTERACTION BEHAVIOR TO MOCK
==================================================

Mock these interactions in the design:

- Clicking the main platform CTA opens the primary platform detail page
- Clicking a platform chip opens that platform’s detail page
- Hovering a chip shows its tooltip
- Clicking the overflow / more details menu shows all connected platform destinations
- Maintain current expand/collapse behavior for decision cards

==================================================
10) DELIVERABLE
==================================================

Create an updated high-fidelity version of the Shared Decision Workspace screen that:
- preserves the current visual design
- fixes the ambiguity around “Open Platform Detail”
- makes the primary source platform obvious
- makes platform drill-down paths clear and intuitive
- remains premium, minimal, and enterprise-ready