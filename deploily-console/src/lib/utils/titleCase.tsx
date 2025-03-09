/**
* © 2024 CliniQuery. All rights reserved.
*
* This file is part of CliniQuery, developed using Next.js and incorporates Material-UI components.
* All content within this file, including but not limited to code, text, graphics, logos, icons, and images, is the property of CliniQuery or its content suppliers and is protected by international copyright laws.
*
* Unauthorized copying, reproduction, distribution, modification, or use of this material, in whole or in part, without explicit, written permission from CliniQuery is strictly prohibited.
*
*/

export default function titleCase(s: string) { return s.replace(/^_*(.)|_+(.)/g, (s, c, d) => c ? c.toUpperCase() : ' ' + d.toUpperCase()) }