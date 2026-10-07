# Replaceable image assets

Generated using the built-in image_gen tool for this project. Served locally as WebP, quality 88. Full resolution source generations remain outside the repository. No permanent dependency on external image hosting or third-party photography.

- `public/images/studio.webp`: homepage studio scene. The supplied concept was the visual reference. The clock digits are rendered separately in `StudioClock.tsx`, never baked into the photograph.
- `public/images/quick-navigation.webp`: five equal-width cinematic panels reused as navigation artwork. Background positions in `QuickNavigation.tsx` select each panel. Future independent artwork can replace this atlas by changing the content model and card image property.

## Studio generation prompt

Use case: photorealistic-natural. Asset type: wide website hero background photograph, 1536x1024. Reference image: supplied No Sleep concept board, specifically its upper-left homepage studio scene, NOT the other UI panels. Recreate that studio atmosphere as a single cinematic photograph with no UI, no lettering, no logos. A dark expensive underground music production studio at night, rear view of a producer wearing black hoodie and black baseball cap seated in a leather studio chair on the RIGHT half of frame, mixing console and monitor with subtle audio session interface, black studio speakers, high window with blinds and silver volumetric light above center. Left 45 percent is shadowed nearly-black studio wall and subtle plant silhouette, clean negative space for large white brand typography. Upper right wall has small horizontal black rectangular digital clock housing with blank dark glass face (digits will be implemented on website). Restrained charcoal black and desaturated cool silver tones, tiny warm hardware LEDs, deep film shadows but readable chair and studio hardware. Match reference composition faithfully. No crowns, no text, no watermarks. This is only the background photograph, not a screenshot of a website.

## Genre generation prompt

Generate a wide cinematic contact sheet asset for a dark cyber-noir music producer website. Exactly five equal-width vertical panels side by side, no gaps, no borders, no typography. Panel 1: hooded producer in wet silver-lit urban alley, monochrome. Panel 2: black-clad man in cap in cool cyan studio profile, dark. Panel 3: faceless dark hooded figure in concrete corridor with very faint red edge light. Panel 4: close-up black speaker cone with warm tiny amber reflections, abstract. Panel 5: producer standing behind mixing console in large expensive black recording studio, silver overhead lights. Ultra photorealistic, deep charcoal blacks, restrained silver highlights, expensive underground mood matching a late-night music studio. All five panels equally wide, each independently usable as a genre card background. No letters, no logos, no watermarks. Overall image wide landscape 3:1.

## Fonts

Inter and Barlow Condensed are self-hosted Fontsource packages; their SIL Open Font License files are distributed in the respective npm packages. Latin subsets are imported to avoid unused language assets. The original logo PNG is rendered with meaningful alternative text through the shared Brand component.

## Authoritative logo

`public/images/no-sleep-logo.png` is an unchanged copy of the artist-supplied PNG (1774 × 887, RGBA). Navbar and hero share this single file. No image processing, recoloring, cropping or lettering modifications were performed.
