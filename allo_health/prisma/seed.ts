import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");
  const existing = await prisma.warehouse.count();
  if (existing > 0) {
    console.log(" Already seeded, skipping.");
    return;
  }

  // ── Warehouses ────────────────────────────────────────────────────────────
  const mumbai    = await prisma.warehouse.create({ data: { name: "Mumbai Central",   location: "Mumbai, MH"    } });
  const delhi     = await prisma.warehouse.create({ data: { name: "Delhi Hub",        location: "Delhi, DL"     } });
  const bangalore = await prisma.warehouse.create({ data: { name: "Bangalore South",  location: "Bangalore, KA" } });

  // ── Products ──────────────────────────────────────────────────────────────
  // Audio
  const p1  = await prisma.product.create({ data: { name: "Wireless Noise-Cancelling Headphones",  description: "Premium ANC headphones with 30 hr battery life",                imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" } });
  const p2  = await prisma.product.create({ data: { name: "True Wireless Earbuds Pro",             description: "IPX5 earbuds with active noise cancellation and 28 hr total",   imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" } });
  const p3  = await prisma.product.create({ data: { name: "Over-Ear Studio Headphones",            description: "Flat-response studio cans for mixing and mastering",              imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400" } });
  const p4  = await prisma.product.create({ data: { name: "Portable Bluetooth Speaker",            description: "360° sound, waterproof, 20 hr playtime",                         imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" } });
  const p5  = await prisma.product.create({ data: { name: "Soundbar 2.1 with Subwoofer",           description: "Cinematic audio for TVs up to 75 inches",                        imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400" } });

  // Keyboards & Input
  const p6  = await prisma.product.create({ data: { name: "Mechanical Keyboard TKL",              description: "Tenkeyless mechanical keyboard with RGB backlighting",           imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" } });
  const p7  = await prisma.product.create({ data: { name: "Full-Size Wireless Mechanical Keyboard",description: "Bluetooth + 2.4 GHz dual-mode, hot-swappable switches",         imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400" } });
  const p8  = await prisma.product.create({ data: { name: "Compact 60% Gaming Keyboard",          description: "Ultra-portable 60% layout with per-key RGB and linear switches", imageUrl: "https://images.unsplash.com/photo-1561112078-7d24e04c3407?w=400" } });
  const p9  = await prisma.product.create({ data: { name: "Ergonomic Split Keyboard",             description: "Split layout reduces wrist strain; wireless, rechargeable",       imageUrl: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400" } });
  const p10 = await prisma.product.create({ data: { name: "Wireless Numeric Keypad",              description: "Slim aluminium numpad, Bluetooth 5.0, pairs with 3 devices",     imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400" } });

  // Mice
  const p11 = await prisma.product.create({ data: { name: "Ergonomic Vertical Mouse",             description: "Vertical ergonomic mouse for all-day comfort",                    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400" } });
  const p12 = await prisma.product.create({ data: { name: "Ultra-Light Gaming Mouse",             description: "58 g honeycomb shell, 25 600 DPI optical sensor",                 imageUrl: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400" } });
  const p13 = await prisma.product.create({ data: { name: "Wireless Trackball Mouse",             description: "Ergonomic trackball, no-desk-space required, Bluetooth",          imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400" } });
  const p14 = await prisma.product.create({ data: { name: "Silent Click Wireless Mouse",          description: "Near-silent clicks, 18-month battery, slim profile",              imageUrl: "https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=400" } });

  // Webcams & Cameras
  const p15 = await prisma.product.create({ data: { name: "4K Webcam Pro",                        description: "Ultra HD webcam with autofocus and built-in stereo mic",          imageUrl: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400" } });
  const p16 = await prisma.product.create({ data: { name: "1080p Streaming Webcam",               description: "Full HD 60 fps, wide-angle lens, plug-and-play",                  imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400" } });
  const p17 = await prisma.product.create({ data: { name: "Action Camera 4K Waterproof",          description: "4K/60fps, waterproof to 10 m, 2-inch touch screen",               imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" } });
  const p18 = await prisma.product.create({ data: { name: "Ring Light 18-inch with Stand",        description: "Dimmable ring light for content creators and video calls",         imageUrl: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400" } });

  // Hubs & Adapters
  const p19 = await prisma.product.create({ data: { name: "USB-C Hub 7-in-1",                     description: "Compact hub: HDMI 4K, 3× USB-A, SD, microSD, USB-C PD",          imageUrl: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=400" } });
  const p20 = await prisma.product.create({ data: { name: "Thunderbolt 4 Dock 12-in-1",           description: "Single-cable docking: dual 4K, 96W charging, 2.5G Ethernet",      imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400" } });
  const p21 = await prisma.product.create({ data: { name: "HDMI 2.1 Switch 4-Port",               description: "4K 120Hz, auto-switch, supports eARC",                           imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p22 = await prisma.product.create({ data: { name: "USB-A to USB-C Adapter 3-Pack",        description: "USB 3.2 Gen 2, 10 Gbps, backwards compatible",                    imageUrl: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=400" } });

  // Monitors
  const p23 = await prisma.product.create({ data: { name: '27" 4K IPS Monitor',                   description: "3840×2160, 144Hz, HDR600, USB-C 65W PD, factory calibrated",     imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" } });
  const p24 = await prisma.product.create({ data: { name: '32" Curved Gaming Monitor',            description: "QHD 165Hz VA panel, 1ms MPRT, FreeSync Premium Pro",              imageUrl: "https://images.unsplash.com/photo-1593640408182-31c228f28673?w=400" } });
  const p25 = await prisma.product.create({ data: { name: '24" Portable USB-C Monitor',           description: "Full HD IPS, touch-screen, bus-powered, 1.8 kg",                  imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400" } });

  // Storage
  const p26 = await prisma.product.create({ data: { name: "Portable SSD 1TB",                    description: "USB 3.2 Gen 2, 1 050 MB/s read, shock-resistant aluminium case",  imageUrl: "https://images.unsplash.com/photo-1601737487795-dab272f52420?w=400" } });
  const p27 = await prisma.product.create({ data: { name: "Portable SSD 2TB",                    description: "2 TB, USB-C, 2 000 MB/s read via NVMe over USB",                  imageUrl: "https://images.unsplash.com/photo-1601737487795-dab272f52420?w=400" } });
  const p28 = await prisma.product.create({ data: { name: "USB Flash Drive 256GB",               description: "USB 3.2, retractable connector, read 400 MB/s",                   imageUrl: "https://images.unsplash.com/photo-1617727553252-65863c156eb5?w=400" } });
  const p29 = await prisma.product.create({ data: { name: "NAS Hard Drive 4TB",                  description: "CMR, 7200 RPM, NAS-optimised firmware, 3-year warranty",           imageUrl: "https://images.unsplash.com/photo-1544411047-bab96d0c9c40?w=400" } });
  const p30 = await prisma.product.create({ data: { name: "SD Card 256GB V30",                   description: "UHS-I V30 A2, 170 MB/s read, for 4K cameras and drones",          imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" } });

  // Charging & Power
  const p31 = await prisma.product.create({ data: { name: "65W GaN USB-C Charger",               description: "Single-port GaN charger, charges laptops at full speed, foldable", imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" } });
  const p32 = await prisma.product.create({ data: { name: "4-Port 100W GaN Desktop Charger",     description: "2× USB-C + 2× USB-A, charges 4 devices simultaneously",           imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" } });
  const p33 = await prisma.product.create({ data: { name: "20 000 mAh Power Bank",               description: "USB-C PD 65W, dual USB-A, LED indicator, airline approved",        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400" } });
  const p34 = await prisma.product.create({ data: { name: "10 000 mAh Slim Power Bank",          description: "Pocket-size, 22.5W fast charge, USB-C in/out",                    imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400" } });
  const p35 = await prisma.product.create({ data: { name: "Wireless Charging Pad 15W",           description: "Qi2 certified, compatible with iPhone, Android and AirPods",       imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" } });
  const p36 = await prisma.product.create({ data: { name: "3-in-1 Wireless Charging Station",    description: "Charges phone, watch and earbuds simultaneously",                  imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" } });

  // Networking
  const p37 = await prisma.product.create({ data: { name: "Wi-Fi 6E Mesh Router 3-Pack",         description: "Tri-band AXE7800, covers 6 500 sq ft, 160 MHz channels",          imageUrl: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400" } });
  const p38 = await prisma.product.create({ data: { name: "Wi-Fi 6 Router AX3000",               description: "Dual-band AX3000, OFDMA, MU-MIMO, works with all ISPs",           imageUrl: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400" } });
  const p39 = await prisma.product.create({ data: { name: "2.5G Ethernet Switch 8-Port",         description: "Unmanaged 2.5 Gbps switch, plug-and-play, fanless",                imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p40 = await prisma.product.create({ data: { name: "USB Wi-Fi 6 Adapter",                 description: "AX1800 dual-band, USB 3.0, includes magnetic base antenna",       imageUrl: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=400" } });

  // Laptops & Tablets
  const p41 = await prisma.product.create({ data: { name: "14-inch Ultrabook Laptop",            description: "Intel Core Ultra 7, 16 GB LPDDR5, 512 GB NVMe, 1.2 kg",          imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400" } });
  const p42 = await prisma.product.create({ data: { name: "16-inch Creator Laptop",              description: "OLED display, RTX 4070, 32 GB RAM, 1 TB SSD",                    imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400" } });
  const p43 = await prisma.product.create({ data: { name: "11-inch Android Tablet",              description: "2K display, Snapdragon 8 Gen 2, 12 GB RAM, S-Pen included",      imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400" } });
  const p44 = await prisma.product.create({ data: { name: "Laptop Stand Adjustable Aluminium",   description: "6-angle adjustable, fits 10–17 inch laptops, foldable",           imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400" } });
  const p45 = await prisma.product.create({ data: { name: "Laptop Sleeve 15-inch Neoprene",      description: "Water-resistant, fleece-lined interior, accessory pocket",         imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" } });

  // Smart Home
  const p46 = await prisma.product.create({ data: { name: "Smart LED Bulb E27 RGB",              description: "16M colours, 800 lm, works with Alexa & Google Home",             imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p47 = await prisma.product.create({ data: { name: "Smart Plug with Energy Monitor",      description: "Wi-Fi, 16 A, real-time power monitoring, voice control",          imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p48 = await prisma.product.create({ data: { name: "Smart Door Lock Fingerprint",         description: "Fingerprint + PIN + app + key, auto-lock, tamper alerts",         imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p49 = await prisma.product.create({ data: { name: "Indoor Security Camera 2K",           description: "2K Pan-Tilt, colour night vision, two-way audio, local storage",  imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p50 = await prisma.product.create({ data: { name: "Smart Thermostat with Display",       description: "AI learning schedule, energy reports, works with heat pumps",      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });

  // Wearables
  const p51 = await prisma.product.create({ data: { name: "Smartwatch AMOLED 1.43-inch",         description: "Blood oxygen, ECG, GPS, 5 ATM waterproof, 14-day battery",       imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" } });
  const p52 = await prisma.product.create({ data: { name: "Fitness Tracker Slim Band",           description: "24/7 heart rate, SpO2, sleep stages, 14-day battery",            imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400" } });
  const p53 = await prisma.product.create({ data: { name: "Sports Earbuds Bone Conduction",      description: "Open-ear design, IP68, ideal for outdoor sports",                 imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400" } });

  // Phones & Accessories
  const p54 = await prisma.product.create({ data: { name: "Tempered Glass Screen Protector",     description: "9H hardness, oleophobic coating, case-friendly, 2-pack",          imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" } });
  const p55 = await prisma.product.create({ data: { name: "MagSafe-Compatible Phone Case",       description: "Military drop-tested, raised edges, Qi2 pass-through",            imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" } });
  const p56 = await prisma.product.create({ data: { name: "Car Phone Mount Magnetic",            description: "360° rotation, dashboard + vent clip included, universal",        imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400" } });
  const p57 = await prisma.product.create({ data: { name: "Selfie Stick Tripod Bluetooth",       description: "Extends to 105 cm, built-in remote, folds to 20 cm",             imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" } });

  // Cables
  const p58 = await prisma.product.create({ data: { name: "Braided USB-C to USB-C Cable 2m",     description: "240W PD, 40 Gbps, 8K video, Thunderbolt 4 certified",            imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p59 = await prisma.product.create({ data: { name: "Lightning to USB-C Cable 1m",         description: "MFi certified, 30W fast charge, braided nylon, 3-pack",           imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p60 = await prisma.product.create({ data: { name: "HDMI 2.1 Cable 3m",                   description: "8K 60Hz / 4K 144Hz, eARC, ultra-high speed 48 Gbps",            imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });
  const p61 = await prisma.product.create({ data: { name: "Cable Management Box Large",          description: "Hides power strips and cables, wood-grain finish, 40×16×13 cm",  imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" } });

  // Printers & Scanners
  const p62 = await prisma.product.create({ data: { name: "Inkjet All-in-One Printer",           description: "Print, scan, copy; wireless, auto-duplex, 22 ppm",               imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400" } });
  const p63 = await prisma.product.create({ data: { name: "Photo Printer 4×6 Compact",           description: "Dye-sub, smudge/water/fade resistant prints, 0.5 kg",            imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400" } });
  const p64 = await prisma.product.create({ data: { name: "Portable Document Scanner A4",        description: "600 DPI, scan to PDF/JPG, USB bus-powered, fits in a bag",       imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=400" } });

  // Gaming
  const p65 = await prisma.product.create({ data: { name: "Game Controller Wireless Pro",        description: "Hall-effect thumbsticks, 40 hr battery, PC + console compatible", imageUrl: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400" } });
  const p66 = await prisma.product.create({ data: { name: "Gaming Headset 7.1 Surround",         description: "Virtual 7.1, 50 mm drivers, detachable noise-cancel mic",         imageUrl: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=400" } });
  const p67 = await prisma.product.create({ data: { name: "XXL Gaming Mouse Pad",                description: "900×400 mm, stitched edges, micro-textured surface",              imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400" } });
  const p68 = await prisma.product.create({ data: { name: "Capture Card USB 4K",                 description: "4K30 passthrough, 1080p60 capture, zero-latency preview",         imageUrl: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=400" } });

  // Microphones & Audio Interfaces
  const p69 = await prisma.product.create({ data: { name: "USB Condenser Microphone Cardioid",   description: "Plug-and-play, 24-bit/192 kHz, pop filter + shock mount included", imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400" } });
  const p70 = await prisma.product.create({ data: { name: "XLR Dynamic Broadcast Microphone",    description: "Cardioid dynamic, SM7-inspired, internal pop filter",              imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400" } });
  const p71 = await prisma.product.create({ data: { name: "2-Channel USB Audio Interface",       description: "48V phantom power, 24-bit/192 kHz, ultra-low latency ASIO",       imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400" } });
  const p72 = await prisma.product.create({ data: { name: "Podcast Mixer 4-Channel USB",         description: "4 mic inputs, EQ per channel, USB streaming output",              imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400" } });

  // Desk & Ergonomics
  const p73 = await prisma.product.create({ data: { name: "Electric Sit-Stand Desk Frame",       description: "Dual motor, 3-memory heights, collision detection, whisper-quiet", imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400" } });
  const p74 = await prisma.product.create({ data: { name: "Monitor Arm Single VESA",             description: "Full-motion arm, holds up to 9 kg, cable management channel",     imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400" } });
  const p75 = await prisma.product.create({ data: { name: "Ergonomic Lumbar Support Cushion",    description: "Memory foam, adjustable strap, fits all office chairs",           imageUrl: "https://images.unsplash.com/photo-1598550476439-6847ef35ce5d?w=400" } });

  // ── Stock entries ─────────────────────────────────────────────────────────
  // Format: { productId, warehouseId, total }
  // Not every product needs stock in every warehouse — realistic distribution
  const stocks = [
    // Audio
    { productId: p1.id,  warehouseId: mumbai.id,    total: 12 },
    { productId: p1.id,  warehouseId: delhi.id,     total: 5  },
    { productId: p1.id,  warehouseId: bangalore.id, total: 3  },
    { productId: p2.id,  warehouseId: mumbai.id,    total: 20 },
    { productId: p2.id,  warehouseId: delhi.id,     total: 14 },
    { productId: p2.id,  warehouseId: bangalore.id, total: 9  },
    { productId: p3.id,  warehouseId: mumbai.id,    total: 6  },
    { productId: p3.id,  warehouseId: bangalore.id, total: 4  },
    { productId: p4.id,  warehouseId: delhi.id,     total: 18 },
    { productId: p4.id,  warehouseId: bangalore.id, total: 11 },
    { productId: p5.id,  warehouseId: mumbai.id,    total: 3  },
    { productId: p5.id,  warehouseId: delhi.id,     total: 2  },

    // Keyboards
    { productId: p6.id,  warehouseId: mumbai.id,    total: 25 },
    { productId: p6.id,  warehouseId: delhi.id,     total: 10 },
    { productId: p6.id,  warehouseId: bangalore.id, total: 15 },
    { productId: p7.id,  warehouseId: mumbai.id,    total: 8  },
    { productId: p7.id,  warehouseId: bangalore.id, total: 12 },
    { productId: p8.id,  warehouseId: delhi.id,     total: 30 },
    { productId: p8.id,  warehouseId: bangalore.id, total: 20 },
    { productId: p9.id,  warehouseId: mumbai.id,    total: 4  },
    { productId: p9.id,  warehouseId: delhi.id,     total: 3  },
    { productId: p10.id, warehouseId: bangalore.id, total: 22 },

    // Mice
    { productId: p11.id, warehouseId: mumbai.id,    total: 17 },
    { productId: p11.id, warehouseId: delhi.id,     total: 9  },
    { productId: p12.id, warehouseId: mumbai.id,    total: 14 },
    { productId: p12.id, warehouseId: bangalore.id, total: 8  },
    { productId: p13.id, warehouseId: delhi.id,     total: 6  },
    { productId: p14.id, warehouseId: mumbai.id,    total: 35 },
    { productId: p14.id, warehouseId: delhi.id,     total: 28 },
    { productId: p14.id, warehouseId: bangalore.id, total: 19 },

    // Webcams & Cameras
    { productId: p15.id, warehouseId: mumbai.id,    total: 7  },
    { productId: p15.id, warehouseId: bangalore.id, total: 5  },
    { productId: p16.id, warehouseId: mumbai.id,    total: 22 },
    { productId: p16.id, warehouseId: delhi.id,     total: 15 },
    { productId: p17.id, warehouseId: delhi.id,     total: 9  },
    { productId: p17.id, warehouseId: bangalore.id, total: 6  },
    { productId: p18.id, warehouseId: mumbai.id,    total: 11 },
    { productId: p18.id, warehouseId: bangalore.id, total: 8  },

    // Hubs & Adapters
    { productId: p19.id, warehouseId: mumbai.id,    total: 40 },
    { productId: p19.id, warehouseId: delhi.id,     total: 25 },
    { productId: p19.id, warehouseId: bangalore.id, total: 30 },
    { productId: p20.id, warehouseId: mumbai.id,    total: 5  },
    { productId: p20.id, warehouseId: bangalore.id, total: 4  },
    { productId: p21.id, warehouseId: delhi.id,     total: 13 },
    { productId: p22.id, warehouseId: mumbai.id,    total: 50 },
    { productId: p22.id, warehouseId: delhi.id,     total: 35 },
    { productId: p22.id, warehouseId: bangalore.id, total: 45 },

    // Monitors
    { productId: p23.id, warehouseId: mumbai.id,    total: 6  },
    { productId: p23.id, warehouseId: delhi.id,     total: 4  },
    { productId: p24.id, warehouseId: bangalore.id, total: 3  },
    { productId: p25.id, warehouseId: mumbai.id,    total: 8  },
    { productId: p25.id, warehouseId: delhi.id,     total: 5  },

    // Storage
    { productId: p26.id, warehouseId: mumbai.id,    total: 18 },
    { productId: p26.id, warehouseId: delhi.id,     total: 12 },
    { productId: p26.id, warehouseId: bangalore.id, total: 10 },
    { productId: p27.id, warehouseId: mumbai.id,    total: 9  },
    { productId: p27.id, warehouseId: bangalore.id, total: 6  },
    { productId: p28.id, warehouseId: mumbai.id,    total: 60 },
    { productId: p28.id, warehouseId: delhi.id,     total: 45 },
    { productId: p28.id, warehouseId: bangalore.id, total: 50 },
    { productId: p29.id, warehouseId: delhi.id,     total: 7  },
    { productId: p29.id, warehouseId: bangalore.id, total: 5  },
    { productId: p30.id, warehouseId: mumbai.id,    total: 30 },
    { productId: p30.id, warehouseId: delhi.id,     total: 20 },

    // Charging & Power
    { productId: p31.id, warehouseId: mumbai.id,    total: 25 },
    { productId: p31.id, warehouseId: delhi.id,     total: 18 },
    { productId: p31.id, warehouseId: bangalore.id, total: 22 },
    { productId: p32.id, warehouseId: mumbai.id,    total: 10 },
    { productId: p32.id, warehouseId: bangalore.id, total: 8  },
    { productId: p33.id, warehouseId: mumbai.id,    total: 15 },
    { productId: p33.id, warehouseId: delhi.id,     total: 12 },
    { productId: p33.id, warehouseId: bangalore.id, total: 10 },
    { productId: p34.id, warehouseId: mumbai.id,    total: 28 },
    { productId: p34.id, warehouseId: delhi.id,     total: 20 },
    { productId: p34.id, warehouseId: bangalore.id, total: 16 },
    { productId: p35.id, warehouseId: mumbai.id,    total: 20 },
    { productId: p35.id, warehouseId: delhi.id,     total: 15 },
    { productId: p35.id, warehouseId: bangalore.id, total: 18 },
    { productId: p36.id, warehouseId: mumbai.id,    total: 9  },
    { productId: p36.id, warehouseId: bangalore.id, total: 7  },

    // Networking
    { productId: p37.id, warehouseId: mumbai.id,    total: 4  },
    { productId: p37.id, warehouseId: delhi.id,     total: 3  },
    { productId: p38.id, warehouseId: mumbai.id,    total: 11 },
    { productId: p38.id, warehouseId: delhi.id,     total: 8  },
    { productId: p38.id, warehouseId: bangalore.id, total: 9  },
    { productId: p39.id, warehouseId: bangalore.id, total: 14 },
    { productId: p40.id, warehouseId: mumbai.id,    total: 20 },
    { productId: p40.id, warehouseId: delhi.id,     total: 16 },

    // Laptops & Tablets
    { productId: p41.id, warehouseId: mumbai.id,    total: 5  },
    { productId: p41.id, warehouseId: delhi.id,     total: 3  },
    { productId: p42.id, warehouseId: mumbai.id,    total: 2  },
    { productId: p42.id, warehouseId: bangalore.id, total: 2  },
    { productId: p43.id, warehouseId: mumbai.id,    total: 8  },
    { productId: p43.id, warehouseId: delhi.id,     total: 6  },
    { productId: p43.id, warehouseId: bangalore.id, total: 5  },
    { productId: p44.id, warehouseId: mumbai.id,    total: 16 },
    { productId: p44.id, warehouseId: delhi.id,     total: 12 },
    { productId: p44.id, warehouseId: bangalore.id, total: 14 },
    { productId: p45.id, warehouseId: mumbai.id,    total: 22 },
    { productId: p45.id, warehouseId: delhi.id,     total: 18 },
    { productId: p45.id, warehouseId: bangalore.id, total: 20 },

    // Smart Home
    { productId: p46.id, warehouseId: mumbai.id,    total: 40 },
    { productId: p46.id, warehouseId: delhi.id,     total: 30 },
    { productId: p46.id, warehouseId: bangalore.id, total: 35 },
    { productId: p47.id, warehouseId: mumbai.id,    total: 50 },
    { productId: p47.id, warehouseId: delhi.id,     total: 38 },
    { productId: p47.id, warehouseId: bangalore.id, total: 42 },
    { productId: p48.id, warehouseId: mumbai.id,    total: 7  },
    { productId: p48.id, warehouseId: bangalore.id, total: 5  },
    { productId: p49.id, warehouseId: mumbai.id,    total: 14 },
    { productId: p49.id, warehouseId: delhi.id,     total: 10 },
    { productId: p49.id, warehouseId: bangalore.id, total: 12 },
    { productId: p50.id, warehouseId: mumbai.id,    total: 6  },
    { productId: p50.id, warehouseId: delhi.id,     total: 4  },

    // Wearables
    { productId: p51.id, warehouseId: mumbai.id,    total: 10 },
    { productId: p51.id, warehouseId: delhi.id,     total: 8  },
    { productId: p51.id, warehouseId: bangalore.id, total: 6  },
    { productId: p52.id, warehouseId: mumbai.id,    total: 18 },
    { productId: p52.id, warehouseId: delhi.id,     total: 15 },
    { productId: p52.id, warehouseId: bangalore.id, total: 13 },
    { productId: p53.id, warehouseId: mumbai.id,    total: 9  },
    { productId: p53.id, warehouseId: bangalore.id, total: 7  },

    // Phones & Accessories
    { productId: p54.id, warehouseId: mumbai.id,    total: 80 },
    { productId: p54.id, warehouseId: delhi.id,     total: 65 },
    { productId: p54.id, warehouseId: bangalore.id, total: 70 },
    { productId: p55.id, warehouseId: mumbai.id,    total: 30 },
    { productId: p55.id, warehouseId: delhi.id,     total: 25 },
    { productId: p55.id, warehouseId: bangalore.id, total: 28 },
    { productId: p56.id, warehouseId: mumbai.id,    total: 22 },
    { productId: p56.id, warehouseId: delhi.id,     total: 18 },
    { productId: p57.id, warehouseId: mumbai.id,    total: 12 },
    { productId: p57.id, warehouseId: bangalore.id, total: 9  },

    // Cables
    { productId: p58.id, warehouseId: mumbai.id,    total: 35 },
    { productId: p58.id, warehouseId: delhi.id,     total: 28 },
    { productId: p58.id, warehouseId: bangalore.id, total: 30 },
    { productId: p59.id, warehouseId: mumbai.id,    total: 40 },
    { productId: p59.id, warehouseId: delhi.id,     total: 33 },
    { productId: p59.id, warehouseId: bangalore.id, total: 36 },
    { productId: p60.id, warehouseId: mumbai.id,    total: 20 },
    { productId: p60.id, warehouseId: delhi.id,     total: 15 },
    { productId: p60.id, warehouseId: bangalore.id, total: 18 },
    { productId: p61.id, warehouseId: mumbai.id,    total: 14 },
    { productId: p61.id, warehouseId: delhi.id,     total: 10 },

    // Printers & Scanners
    { productId: p62.id, warehouseId: mumbai.id,    total: 5  },
    { productId: p62.id, warehouseId: delhi.id,     total: 4  },
    { productId: p63.id, warehouseId: mumbai.id,    total: 8  },
    { productId: p63.id, warehouseId: bangalore.id, total: 6  },
    { productId: p64.id, warehouseId: delhi.id,     total: 7  },
    { productId: p64.id, warehouseId: bangalore.id, total: 5  },

    // Gaming
    { productId: p65.id, warehouseId: mumbai.id,    total: 13 },
    { productId: p65.id, warehouseId: delhi.id,     total: 10 },
    { productId: p65.id, warehouseId: bangalore.id, total: 8  },
    { productId: p66.id, warehouseId: mumbai.id,    total: 9  },
    { productId: p66.id, warehouseId: bangalore.id, total: 7  },
    { productId: p67.id, warehouseId: mumbai.id,    total: 25 },
    { productId: p67.id, warehouseId: delhi.id,     total: 20 },
    { productId: p67.id, warehouseId: bangalore.id, total: 22 },
    { productId: p68.id, warehouseId: mumbai.id,    total: 6  },
    { productId: p68.id, warehouseId: delhi.id,     total: 4  },

    // Microphones & Audio Interfaces
    { productId: p69.id, warehouseId: mumbai.id,    total: 12 },
    { productId: p69.id, warehouseId: delhi.id,     total: 9  },
    { productId: p69.id, warehouseId: bangalore.id, total: 8  },
    { productId: p70.id, warehouseId: mumbai.id,    total: 7  },
    { productId: p70.id, warehouseId: bangalore.id, total: 5  },
    { productId: p71.id, warehouseId: mumbai.id,    total: 10 },
    { productId: p71.id, warehouseId: delhi.id,     total: 8  },
    { productId: p72.id, warehouseId: delhi.id,     total: 4  },
    { productId: p72.id, warehouseId: bangalore.id, total: 3  },

    // Desk & Ergonomics
    { productId: p73.id, warehouseId: mumbai.id,    total: 3  },
    { productId: p73.id, warehouseId: delhi.id,     total: 2  },
    { productId: p73.id, warehouseId: bangalore.id, total: 2  },
    { productId: p74.id, warehouseId: mumbai.id,    total: 11 },
    { productId: p74.id, warehouseId: delhi.id,     total: 8  },
    { productId: p74.id, warehouseId: bangalore.id, total: 9  },
    { productId: p75.id, warehouseId: mumbai.id,    total: 20 },
    { productId: p75.id, warehouseId: delhi.id,     total: 16 },
    { productId: p75.id, warehouseId: bangalore.id, total: 18 },
  ];

  for (const s of stocks) await prisma.stock.create({ data: s });
  console.log(`✅ Seed complete!  (${stocks.length} stock entries).`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
