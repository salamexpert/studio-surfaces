import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";
import blog6 from "@/assets/blog-6.jpg";
import blog7 from "@/assets/blog-7.jpg";
import blog8 from "@/assets/blog-8.jpg";
import blog9 from "@/assets/blog-9.jpg";
import blog10 from "@/assets/blog-10.jpg";

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  cover: string;
  content: { type: "p" | "h2" | "h3" | "quote" | "ul"; text?: string; items?: string[] }[];
  faq?: { question: string; answer: string }[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "how-modern-ceramic-surfaces-are-changing-interior-design",
    title: "How Modern Ceramic Surfaces Are Changing Interior Design",
    excerpt:
      "From hand-glazed feature walls to slab-format porcelain, ceramics have moved from utility to the centerpiece of contemporary interiors.",
    category: "Surfaces",
    author: "Elena Marchetti",
    date: "January 14, 2026",
    readingTime: "8 min read",
    cover: blog1,
    content: [
      { type: "p", text: "For more than a century, ceramic tile sat quietly in the background of architectural conversation — a hardworking surface confined to bathrooms, splashbacks and the occasional kitchen floor. In 2026, the conversation has changed entirely. Ceramics have stepped out of the service rooms and onto the centre stage of contemporary interior design, where they now define entire moods, materials palettes and architectural gestures." },
      { type: "p", text: "What changed is partly technical. Slab-format porcelain now reaches dimensions of 1600 by 3200 millimetres with thicknesses of just six. Digital printing has made it possible to render onyx, travertine, fluted oak and lime plaster in convincingly tactile surfaces that wear better than the originals. But the deeper shift is cultural — designers are searching for materials that age well, photograph beautifully, and respond to natural light, and ceramics are quietly outperforming nearly every alternative." },
      { type: "h2", text: "From Background Material to Architectural Gesture" },
      { type: "p", text: "The defining move in contemporary residential design is the seamless surface. Floors flow into walls, walls fold up into ceilings, and the eye is invited to read a room as a single sculpted volume rather than a collection of finishes. Large-format porcelain makes this possible at a price point that natural stone simply cannot match." },
      { type: "quote", text: "A surface is no longer something you specify last. It is the first decision you make — everything else negotiates around it." },
      { type: "p", text: "Walk through any project published in the last twelve months and you will find ceramic surfaces playing roles that would have been unthinkable a decade ago: bookmatched feature walls behind floating beds, monolithic kitchen islands carved from a single porcelain slab, even ceiling planes finished in matte clay-toned tile that absorbs light like fresco." },
      { type: "h2", text: "The Quiet Revolution in Texture" },
      { type: "p", text: "If 2024 belonged to terrazzo and 2025 to lime plaster, 2026 is unmistakably the year of textured ceramic. Three-dimensional surfaces — fluted, ribbed, scalloped, hand-pressed — are appearing on feature walls in showrooms from Milan to Brooklyn. Designers are gravitating toward tactile materials that invite touch and reward close inspection." },
      { type: "ul", items: [
        "Vertical fluted ceramics that catch directional light and dissolve into shadow",
        "Hand-glazed zellige with deliberate imperfections that read as quiet luxury",
        "3D wave-pattern wall tiles that double as acoustic dampening",
        "Lime-look porcelains with the soft chalkiness of fresco but none of the maintenance",
      ]},
      { type: "h2", text: "Color Returns, Carefully" },
      { type: "p", text: "After nearly a decade of beige-on-beige restraint, color is finally returning to the ceramic conversation — but with a maturity that feels new. Today's accent tones are drawn from the earth: ochre, terracotta, mineral green, ash blue, smoked clay. They are deployed sparingly, often as a single bookmatched panel or a saturated bathroom volume, and they almost always sit beside warm neutrals that let them breathe." },
      { type: "h3", text: "What This Means for Your Next Project" },
      { type: "p", text: "If you are renovating, planning, or specifying right now, treat ceramic surfaces as architectural decisions rather than finishing touches. Ask what your floor wants to do — extend, dissolve, ground, divide. Consider whether your walls want to be neutral canvases or sculptural moments. The best contemporary interiors are not those with the most expensive materials but those whose surfaces have been chosen with intention." },
      { type: "p", text: "Ceramics in 2026 are no longer the safe choice. They are, increasingly, the most expressive one." },
    ],
  },
  {
    slug: "luxury-bathroom-tile-trends-defining-2026",
    title: "Luxury Bathroom Tile Trends Defining 2026",
    excerpt: "Hotel-quality bathrooms are moving toward monolithic stone-look surfaces, sculptural fixtures, and a softer, more residential warmth.",
    category: "Bathrooms",
    author: "Joaquim Reyes",
    date: "January 22, 2026",
    readingTime: "7 min read",
    cover: blog2,
    content: [
      { type: "p", text: "The luxury bathroom has always been a barometer for where residential design is heading. Spend an afternoon in any well-appointed hotel suite that opened this year and you will see the future of the home bathroom about three seasons ahead of schedule. The signals are unusually consistent in 2026: warmer palettes, larger formats, fewer materials, and an obvious shift away from the cold spa minimalism that dominated the late 2010s." },
      { type: "h2", text: "The Monolithic Bathroom" },
      { type: "p", text: "The single biggest move is what designers are quietly calling the monolithic bathroom — a space where one ceramic or stone-look porcelain wraps the floor, walls and sometimes the ceiling, with grout joints reduced to almost nothing. The effect is sculptural, calming, and unexpectedly forgiving on the eye." },
      { type: "quote", text: "We are designing bathrooms now the way we used to design libraries — as rooms with character, not as collections of fixtures." },
      { type: "h2", text: "Material Palettes That Are Defining the Year" },
      { type: "ul", items: [
        "Honed travertine-look porcelain in warm cream and soft grey",
        "Bookmatched calacatta slabs as a single feature wall behind the vanity",
        "Smoked lava stone for grounding lower volumes",
        "Hand-glazed micro-mosaics in the shower zone for tactile contrast",
      ]},
      { type: "h2", text: "Sculptural Fixtures, Restrained Hardware" },
      { type: "p", text: "Where the surfaces have grown bolder, the fixtures have grown calmer. Freestanding stone-resin tubs in matte taupe, brushed brass tapware with squared edges, and oversized round mirrors framed in walnut or burnished bronze are all signs of the same impulse: let the architecture do the talking." },
      { type: "h3", text: "Lighting the New Bathroom" },
      { type: "p", text: "Layered lighting has become non-negotiable. Expect to see linear LEDs grazing textured walls, recessed wall washers above vanities, and at least one warm-pendant moment over the freestanding tub. The bathroom is no longer a utility room with task lighting — it is a room that earns the same lighting plan as a living space." },
      { type: "p", text: "If you are planning a renovation this year, the single best investment is in fewer, larger, better materials. One generous porcelain, one beautiful stone, one warm metal. The luxury is in the restraint." },
    ],
  },
  {
    slug: "minimalist-surface-design-for-modern-homes",
    title: "Minimalist Surface Design for Modern Homes",
    excerpt: "Minimalism in 2026 is warmer, softer, and far more material-forward than the cool white interiors of a decade ago.",
    category: "Surfaces",
    author: "Saoirse Bennett",
    date: "February 02, 2026",
    readingTime: "6 min read",
    cover: blog3,
    content: [
      { type: "p", text: "Minimalism, as a residential aesthetic, has matured. The cold, gallery-white spaces that defined the early 2010s have given way to something altogether more livable: warm whites, off-creams, soft taupes and the quiet luxury of a perfectly executed seamless floor. The discipline remains, but the temperature has changed entirely." },
      { type: "h2", text: "Less Is Still More — But Warmer" },
      { type: "p", text: "Modern minimalism leans on material restraint rather than colour restraint. A single floor finish carried through every room, a continuous wall plane uninterrupted by trims, and lighting that washes rather than spotlights — these are the moves that make minimalist interiors feel calm rather than clinical." },
      { type: "quote", text: "True minimalism is not the absence of things. It is the absence of distractions." },
      { type: "h2", text: "The Surfaces Doing the Heavy Lifting" },
      { type: "ul", items: [
        "Microcement floors in warm bone, poured seamlessly across living zones",
        "Lime-look porcelain walls that breathe like plaster but resist daily wear",
        "Honed limestone-effect floor tiles in 1200x1200 formats with minimal grout",
        "Vertical stack-bond ceramics in soft cream for understated bathroom volumes",
      ]},
      { type: "h2", text: "Designing Negative Space" },
      { type: "p", text: "The most underrated tool in the minimalist palette is empty space. A wall that holds nothing. A floor that meets the wall without a skirting. A window that frames a single tree. The discipline is choosing what to leave out — and trusting that the result will feel more, not less." },
      { type: "h3", text: "A Practical Note on Specification" },
      { type: "p", text: "Minimalist surfaces are unforgiving. Order ten percent more than you think you need, insist on consistent shade batching, and have your installer do a dry layout before any adhesive comes out. The aesthetic depends entirely on the precision of the execution." },
    ],
  },
  {
    slug: "the-rise-of-textured-wall-finishes-in-contemporary-interiors",
    title: "The Rise of Textured Wall Finishes in Contemporary Interiors",
    excerpt: "Three-dimensional ceramics, fluted panels and hand-troweled plasters are reshaping how we think about the most overlooked surface in the room.",
    category: "Surfaces",
    author: "Mira Vannier",
    date: "February 11, 2026",
    readingTime: "7 min read",
    cover: blog4,
    content: [
      { type: "p", text: "For most of the last two decades, the interior wall existed primarily as a backdrop — a flat plane painted in a carefully chosen neutral, designed to disappear behind the furniture and art it supported. That assumption has quietly collapsed. The wall, in 2026, is a surface that does work." },
      { type: "h2", text: "Why Texture Is Suddenly Everywhere" },
      { type: "p", text: "Three forces are driving the textured-wall revival simultaneously. First, advances in ceramic manufacturing have made dimensional surfaces achievable at residential price points. Second, the post-pandemic interior has rewarded materials that feel alive under raking light. Third, designers are tired of flat sheetrock and the cool perfection of paint." },
      { type: "quote", text: "A textured wall is a wall that earns its place. Every grazing beam of light gives it back to you again." },
      { type: "h2", text: "The Categories Defining the Conversation" },
      { type: "ul", items: [
        "Fluted vertical panels in ceramic, oak veneer and acoustic felt",
        "3D wave and ridge tiles that read as sculpture from across the room",
        "Hand-troweled lime plaster with deliberate brush marks",
        "Tactile zellige with the irregularities of the human hand",
      ]},
      { type: "h2", text: "Lighting Is the Other Half of the Equation" },
      { type: "p", text: "A textured surface is only as compelling as the light that grazes it. Wall washers set close to the surface, low-angle floor uplights, and warm linear LEDs concealed in shadow gaps are all part of the toolkit. Get the light wrong and a beautiful texture will read as a flat photograph of itself." },
      { type: "h3", text: "Where to Use Texture, and Where Not To" },
      { type: "p", text: "Reserve dimensional surfaces for one or two moments per room. A single feature wall behind a bed, a fluted volume around a bar, a textured niche in a bathroom. Used everywhere, the effect collapses; used sparingly, it carries the entire space." },
    ],
  },
  {
    slug: "how-to-design-a-premium-modern-kitchen-space",
    title: "How to Design a Premium Modern Kitchen Space",
    excerpt: "The contemporary luxury kitchen is restrained, monumental and material-forward — and the surfaces you choose matter more than the appliances.",
    category: "Kitchens",
    author: "Ines Aldana",
    date: "February 19, 2026",
    readingTime: "9 min read",
    cover: blog5,
    content: [
      { type: "p", text: "The premium modern kitchen has shed almost everything that defined the kitchens of the previous decade. Gone are the open shelves stacked with curated ceramics, the contrasting island colours, the visible appliance brands that once telegraphed status. In their place: monumental volumes, full-height stone, a single dominant material gesture, and an almost ceremonial quietness." },
      { type: "h2", text: "Start With the Architecture, Not the Cabinetry" },
      { type: "p", text: "The first decision in any premium kitchen is volumetric. How does the room read as architecture? Is the island a pedestal or a counterweight? Does the run of cabinetry want to read as a continuous wall or as a piece of furniture? The cabinetry, hardware and material choices all flow from those answers — never the other way around." },
      { type: "quote", text: "A great kitchen is a great room first and a kitchen second. The cooking should feel like a privilege of the architecture." },
      { type: "h2", text: "The Material Hierarchy That Works" },
      { type: "ul", items: [
        "One dominant stone or porcelain — used on the island, the splashback and ideally the floor",
        "One quiet cabinet finish — matte black, fumed oak, or hand-painted bone",
        "One warm metal — unlacquered brass, brushed bronze, blackened steel",
        "One sculptural light — a single statement pendant over the island",
      ]},
      { type: "h2", text: "The Island Is the Room" },
      { type: "p", text: "Every premium kitchen now revolves around its island. Waterfall edges in bookmatched calacatta, monolithic blocks of honed limestone-look porcelain, or even sculpted curved islands in hand-glazed ceramic — the move is to treat the island as the most important piece of furniture in the home." },
      { type: "h3", text: "Restrain the Hardware" },
      { type: "p", text: "Touch-latch cabinets, push-to-open drawers, and integrated appliances let the architecture speak. When hardware does appear, it should feel intentional and few — long horizontal pulls in a single warm metal, repeated with discipline." },
      { type: "p", text: "Done well, the result is a kitchen that disappears when not in use and commands attention when it is." },
    ],
  },
  {
    slug: "scandinavian-interiors-and-natural-material-harmony",
    title: "Scandinavian Interiors and Natural Material Harmony",
    excerpt: "The new Scandinavian palette pairs pale woods and lime plasters with hand-crafted ceramics for interiors that feel both modern and ancient.",
    category: "Architecture",
    author: "Annika Holm",
    date: "February 27, 2026",
    readingTime: "6 min read",
    cover: blog6,
    content: [
      { type: "p", text: "Scandinavian design has always been more than a style — it is a philosophy of living that prioritises light, material honesty and quiet craft. The 2026 iteration has loosened slightly. The whites are warmer, the woods darker than the bleached pine of a decade ago, and the surfaces are unmistakably tactile." },
      { type: "h2", text: "The New Scandinavian Palette" },
      { type: "ul", items: [
        "Pale ash floors with visible grain and matte oil finish",
        "Lime-plaster walls in cream and soft taupe",
        "Hand-glazed stoneware ceramics on shelves, walls and floors",
        "Natural linen drapery in warm oat and oyster",
      ]},
      { type: "quote", text: "Scandinavian interiors succeed because nothing in them is trying to impress you. Every object is allowed to simply be itself." },
      { type: "h2", text: "Material Harmony Over Material Contrast" },
      { type: "p", text: "Where many contemporary interiors lean on contrast — light against dark, smooth against rough — the Scandinavian approach is the opposite. Surfaces are chosen so that they harmonise across temperature and texture. A pale ash floor, a lime-washed wall, an oatmeal sofa, a ceramic vase: they all sit within a single tonal family, and the calm that results is unmistakable." },
      { type: "h3", text: "What to Take Away, Even If You Live Elsewhere" },
      { type: "p", text: "You do not need to live in Copenhagen to apply the lessons. Choose materials that age, prefer matte to glossy, embrace handmade variation, and let your rooms hold less. The result will read as Scandinavian whether or not the address suggests it." },
    ],
  },
  {
    slug: "the-future-of-architectural-surface-design",
    title: "The Future of Architectural Surface Design",
    excerpt: "Parametric ceramics, bio-based finishes and ultra-thin slabs are reshaping what a surface can be — and what it can do for a building.",
    category: "Architecture",
    author: "Theo Castellan",
    date: "March 06, 2026",
    readingTime: "8 min read",
    cover: blog7,
    content: [
      { type: "p", text: "If the last decade in surface design was about scale — bigger slabs, fewer joints, larger formats — the next decade will be about behaviour. Surfaces are becoming responsive, performative, and in some cases nearly alive. The building envelope, both inside and out, is being reimagined." },
      { type: "h2", text: "Parametric Ceramics" },
      { type: "p", text: "Robotic press technology now makes it economical to manufacture ceramic panels with continuously varying surface geometry. Walk past a recently completed cultural building and look closely: that gently undulating ceramic façade is not assembled from repeated tiles but from a sequence of unique panels, each pressed to a parametric design." },
      { type: "quote", text: "We are entering an era where every panel can be different, and the cost of difference has finally collapsed." },
      { type: "h2", text: "Materials That Carry Their Story" },
      { type: "ul", items: [
        "Recycled-content porcelains using up to 40% reclaimed material",
        "Bio-based lime plasters with measurable carbon sequestration",
        "Thin-slab ceramics half the weight of conventional tile, halving transport emissions",
        "Modular surface systems designed for disassembly and reuse",
      ]},
      { type: "h3", text: "What Architects Are Specifying Now" },
      { type: "p", text: "The forward-looking specification today is rarely about the surface alone. It is about the surface as part of a system — its weight, its installation method, its end-of-life path, its embodied carbon. The aesthetic conversation has finally caught up with the environmental one." },
    ],
  },
  {
    slug: "how-lighting-transforms-modern-interior-materials",
    title: "How Lighting Transforms Modern Interior Materials",
    excerpt: "The same surface can read three completely different ways depending on how it is lit. Here is how the best designers approach the problem.",
    category: "Architecture",
    author: "Pavel Krasnov",
    date: "March 14, 2026",
    readingTime: "7 min read",
    cover: blog8,
    content: [
      { type: "p", text: "Material and light are inseparable. A travertine wall under cool downlighting reads as cold and clinical; the same wall under a warm grazing source becomes a quiet, sculpted plane. Specifying a beautiful material without considering its lighting is, in practice, specifying nothing at all." },
      { type: "h2", text: "The Three Lighting Moves That Define a Room" },
      { type: "ul", items: [
        "Grazing — light placed close to a textured surface to reveal depth",
        "Washing — even light spread across a flat plane to dissolve it visually",
        "Pooling — small, warm sources that gather attention and create intimacy",
      ]},
      { type: "quote", text: "Light is the other half of the material. Specify the surface and the source together or specify neither well." },
      { type: "h2", text: "Color Temperature Is Not Optional" },
      { type: "p", text: "The single most overlooked variable in residential lighting is colour temperature. Warm-white sources around 2700K make ceramics, plasters and timbers look the way the designer intended. Anything above 3000K shifts the same surfaces toward a colder, more retail register. Get this wrong and an expensive material will look cheap." },
      { type: "h3", text: "Layer, Always" },
      { type: "p", text: "No room should rely on a single lighting source. Combine an architectural layer (concealed coves, wall washes), a task layer (pendants, wall sconces) and an accent layer (table lamps, floor lamps) — and dim everything." },
    ],
  },
  {
    slug: "creating-spa-inspired-bathrooms-with-modern-tiles",
    title: "Creating Spa-Inspired Bathrooms With Modern Tiles",
    excerpt: "The home spa has matured beyond pebbles and bamboo. Here is how the modern wellness bathroom is built around quiet, tactile surfaces.",
    category: "Bathrooms",
    author: "Lior Avnet",
    date: "March 23, 2026",
    readingTime: "6 min read",
    cover: blog9,
    content: [
      { type: "p", text: "The first wave of spa-inspired bathrooms leaned heavily on the obvious: river stones underfoot, bamboo accents, candles arranged with conspicuous care. The second wave is quieter, more architectural, and more honest about what actually makes a bathroom feel restorative." },
      { type: "h2", text: "What Actually Makes a Bathroom Feel Like a Spa" },
      { type: "ul", items: [
        "A continuous, easy-on-the-eye floor surface — no abrupt transitions, no busy patterns",
        "Warm, layered lighting on dimmers, with at least one source at low body height",
        "A generous walk-in shower zone with a single linear drain",
        "Real ventilation that keeps the room dry without sounding like a hairdryer",
        "One natural element — stone, timber, plant — rather than a forest of them",
      ]},
      { type: "quote", text: "The best spa bathrooms feel inevitable. Nothing in them announces itself. Everything in them invites you to slow down." },
      { type: "h2", text: "Surfaces That Set the Tone" },
      { type: "p", text: "Soft-touch porcelains in warm sand, honed limestone-effect tiles, micro-mosaics in oatmeal and pebble — the modern wellness palette favours surfaces with subtle variation rather than bold pattern. The eye should rest, not work." },
      { type: "h3", text: "Don't Forget the Bench" },
      { type: "p", text: "A teak or stone bench inside the shower is the single most spa-feeling addition you can make to a bathroom. It signals slowness, ritual, and care — without saying any of those words out loud." },
    ],
  },
  {
    slug: "spa-like-experience-at-home-without-renovation",
    title: "How to Create a Spa-Like Experience at Home Without Renovation",
    seoTitle: "Spa-Like Experience at Home Without Renovation",
    excerpt: "How to create a spa-like experience at home without renovation: sensory routine, lighting, scent, textiles, and a 30-minute reset.",
    category: "Bathrooms",
    author: "Ava Romano",
    date: "April 10, 2026",
    readingTime: "8 min read",
    cover: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    content: [
      { type: "p", text: "You don't need to remodel your bathroom to make it feel like a spa. The four things that decide \"spa or not spa\" are scent, sound, light, and texture and you can change all four for under $150. A real spa-like experience at home comes from a 30-minute sensory routine repeated weekly, not from new fixtures. Below is the no-renovation playbook, room by room." },
      { type: "h2", text: "Why scent does most of the work" },
      { type: "p", text: "Smell is the only sense wired directly to the limbic system, the part of the brain that handles emotion and memory. That's why spas all smell the same eucalyptus, lavender, cedar, or a blend of all three. Recreate the cue at home and your body relaxes before your mind catches up." },
      { type: "ul", items: [
          "Hang a small eucalyptus bundle from your showerhead. Steam releases the oil. Lasts about two weeks.",
          "Run a reed diffuser 24/7 in the bathroom; lavender for evening, citrus or rosemary for morning.",
          "Skip plug-in air fresheners. They smell synthetic and undo the effect.",
      ]},
      { type: "h2", text: "Fix the lighting before anything else" },
      { type: "p", text: "Bright overhead lighting is the single biggest reason a bathroom feels clinical. The cheapest spa fix is a $15 dimmer switch (any electrician can swap it in 20 minutes) plus warm-temperature bulbs at 2,700K. If you can't dim, add a small lamp on a side counter and a battery-operated candle. Multiple low light sources beat one bright one every time." },
      { type: "h2", text: "Upgrade what you touch" },
      { type: "p", text: "Spas feel expensive because everything you touch is heavier than you expect. Replicate the cue:" },
      { type: "ul", items: [
          "Oversized cotton bath towels - 700+ GSM.",
          "A real bath mat, not a thin one. Tufted cotton or chenille.",
          "A waffle robe hanging on the back of the door, even if you don't use it daily. Visual cue alone signals \"slow down.\"",
          "Replace any plastic bottles you can see with refillable amber or frosted glass. The visual noise of branded plastic is what most kills the spa feeling.",
      ]},
      { type: "h2", text: "Add ambient sound" },
      { type: "p", text: "Silence in a bathroom amplifies plumbing noise. A small Bluetooth speaker playing a spa playlist, ocean waves, or pink noise covers it and signals to your nervous system that you're off-duty. Most people find 50–60dB ideal quiet but present." },
      { type: "h2", text: "The 30-minute reset" },
      { type: "p", text: "Run this once a week. It's the part that turns a bathroom into a spa rather than a bathroom with candles in it." },
      { type: "ul", items: [
          "0–5 min: dim the lights, start the music, light a candle, run the diffuser.",
          "5–10 min: dry-brush the body before showering. Improves circulation, takes 60 seconds.",
          "10–20 min: shower with the eucalyptus bundle, or soak with magnesium flakes (cheaper and gentler than Epsom salt).",
          "20–25 min: a 5-minute facial massage with any oil you already own.",
          "25–30 min: robe, water, breathing. Don't pick up your phone yet.",
      ]},
      { type: "h2", text: "Extend the spa feeling beyond the bathroom" },
      { type: "p", text: "The spa cue should follow you out of the bathroom. A linen quilt on the bed, a tray with a glass carafe, plants near a window, and the same scent in both rooms keeps the parasympathetic state going. If you ever do decide to renovate down the line, surface materials are what most define a spa bathroom; natural stone-look tile, large-format porcelain, soft matte finishes, and warm neutrals all read instantly as luxury. Curated tile retailers like [Mineral Tiles](https://www.mineraltiles.com/) carry the spa-bathroom looks people pin without the showroom markup. But you do not need any of it for the experience itself; the four senses do the work. If you're interested in creating a more permanent spa aesthetic later, [spa bathroom looks](https://marinoceramictile.com/blog/creating-spa-inspired-bathrooms-with-modern-tiles) can be achieved with natural stone-look tile, large-format porcelain, soft matte finishes, and warm neutrals.",
      },
    ],
    faq: [
      {
        question: "Can you really get a spa-like experience at home without renovation?",
        answer: "Yes, most of what makes a spa feel like a spa is sensory: scent, sound, light, and texture. None of those require renovation. People often confuse the look of a spa bathroom with the feeling of one; the feeling is what matters and it's almost free to recreate.",
      },
      {
        question: "What's the cheapest way to make my bathroom feel like a spa?",
        answer: "Three things, total cost under $50: a dimmable bulb or a battery candle, a eucalyptus bundle in the shower, and one oversized white towel. Run a relaxation playlist on your phone. That's a spa.",
      },
      {
        question: "Are essential oils safe in the bathroom?",
        answer: "Diffuser oils are generally safe at low concentrations. Don't apply undiluted oils directly to skin, keep diffusers out of reach of pets (especially cats with tea tree or eucalyptus), and ventilate the room well.",
      },
      {
        question: "How often should I do an at-home spa routine?",
        answer: "Once a week is plenty for a long routine. The light-and-scent setup, though, should be on every day; it's what makes the bathroom feel different from the rest of the house even when you're not formally doing a spa session.",
      },
      {
        question: "What single change would make the biggest spa-like difference?",
        answer: "A dimmer switch with warm 2,700K bulbs. Lighting controls how a space feels more than any other single element, and most homes have bathroom lighting set to a level that's good for cleaning, not for unwinding.",
      },
    ],
  },
  {
    slug: "the-art-of-combining-stone-textures-and-modern-ceramics",
    title: "The Art of Combining Stone Textures and Modern Ceramics",
    excerpt: "Mixing natural stone with contemporary porcelain takes a careful eye — but done well, the contrast can carry an entire interior.",
    category: "Surfaces",
    author: "Cosima Lindqvist",
    date: "April 02, 2026",
    readingTime: "8 min read",
    cover: blog10,
    content: [
      { type: "p", text: "Pairing real stone with engineered ceramic used to feel like a contradiction. Stone was the honest, expensive, irreplaceable material; ceramic was the affordable substitute. That hierarchy has dissolved. The most thoughtful contemporary interiors now use both, deliberately, for what each does best." },
      { type: "h2", text: "Why Mix Them at All" },
      { type: "p", text: "Real stone carries a tactile irregularity that no manufactured surface can fully replicate. Modern porcelain offers consistency, scale, performance and price points that stone cannot match. Used together, the combination gives a room both gravity and discipline." },
      { type: "quote", text: "Stone gives a room its history. Ceramic gives it its grammar. The two together can speak in full sentences." },
      { type: "h2", text: "Three Combinations That Always Work" },
      { type: "ul", items: [
        "Rough hewn limestone wall meeting a smooth honed porcelain floor — a study in scale and texture",
        "Bookmatched marble feature surface set against quiet matte ceramic floors and walls",
        "Travertine threshold or bench detail framing a continuous large-format porcelain expanse",
      ]},
      { type: "h3", text: "Rules of Restraint" },
      { type: "p", text: "Mixing materials is easier to do badly than well. Limit yourself to two stones at most per room. Keep the ceramic palette tonally adjacent to the stone, never competing with it. And resolve every transition — threshold, edge, corner — with as much care as the surfaces themselves." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
export const otherPosts = (slug: string, n = 4) =>
  POSTS.filter((p) => p.slug !== slug).slice(0, n);
