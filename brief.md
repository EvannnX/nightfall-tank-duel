# First Playable Web Game Brief

> This summary and the accompanying system graph are the two primary development references. Build from both. If they conflict, preserve the learning goal and ask the student before changing the core design.

## 1. Project Identity
- Student / Team: Evan
- Project Title: Pocket Artillery Lab
- Domain: 二维回合制弹道炮战：角度、力度、风力与地形判断
- Tool / AI Agent: Codex + HTML5 Canvas / JavaScript

## 2. Design Summary
**Domain and real experience:** 我选择的领域是二维回合制弹道炮战：玩家在有重力、风力和可破坏地形的环境中，通过角度、力度与武器特性来预测炮弹轨迹并命中对手。项目受 Pocket Tanks 的核心乐趣启发，但使用原创名称、界面、美术和武器设计。

我接触过 Pocket Tanks、Worms 等炮战游戏，也想理解为什么简单的两个输入会产生丰富判断。真实场景是和朋友轮流对战：第一次射击通常只是试探，之后根据落点不断修正，逐渐形成对抛物线、风力和地形的直觉。

**Novice misconception:** 最常见的误解是把每一发当成独立猜测，或认为存在固定的万能角度。实际上上一发的落点是最重要的数据，参数需要相对修正。

**Most important domain challenge:** 最重要的挑战是信息不完全下的弹道估算：风力、高低差和遮挡会共同改变轨迹，不同武器又有不同速度、重量、散射和爆炸方式。

新手最容易在一发落空后同时大幅改变角度、力度和武器，导致无法判断哪项修改有效；也常忽略风向或让炮弹过早撞上近处地形。

**Core learning shift:** 核心学习转变：从“凭感觉把炮弹射向敌人”，转变为“把每次落点当作证据，只调整关键变量，逐步校准一条可靠弹道”。

## 3. Core Player Learning Loop
**Observe:** 玩家需要观察双方位置、水平距离和高低差、炮管朝向、当前角度与力度、风向风速、地形轮廓、武器图标与剩余数量，以及上一发的完整轨迹和落点。

**Judge:** 玩家需要判断弹道是否能越过地形、风会把炮弹推向哪里、应使用高抛还是低抛、需要多大修正量，以及本回合追求直接伤害、地形破坏还是限制对手。

**Act:** 玩家可以选择武器，调节炮管角度与发射力度，发射或取消瞄准；发射后可查看轨迹与落点。进阶版可加入有限次数的移动或使用护盾，但第一版聚焦瞄准与射击。

**Read feedback:** 系统实时显示角度、力度和风；发射时用可见轨迹、风粒子、飞行音调、撞击特效、伤害数字和地形凹坑反馈结果。回合结束显示落点相对目标的方向与距离，但不直接给出正确答案。

**Adjust:** 玩家先保留上一发的大部分参数：若炮弹短落，增加力度或降低过高角度；若越过目标，反向微调；若撞山，增大角度；若风变化，则先补偿水平偏移，并选择更适合当前地形的武器。

**Ability improved through repetition:** 重复几次后，玩家会更擅长估算抛物线、区分角度与力度的作用、利用一次试射建立基准，并在风、地形和武器变化下快速做出小幅有效修正。

## 4. Data Model for the System Graph

### Environment Data
- 重力：固定向下加速度
- 风向与风速：系统每回合提供，玩家不可直接控制
- 地形高度图：决定遮挡、碰撞与坦克高低差
- 双方位置与生命值：构成当前战局
- 武器库存与回合数：限制可选策略

### Player-Controlled Data
- 【角度】0–180°：改变发射方向与弹道高度
- 【力度】0–100：改变初速度、射程与飞行时间
- 【武器选择】：改变弹速、爆炸半径和地形效果
- 【发射】：锁定本回合参数并消耗所选武器

### System-Calculated Results
- 炮弹逐帧位置与完整轨迹
- 最高点、飞行时间和首次碰撞位置
- 落点相对目标的方向与距离
- 爆炸覆盖、伤害衰减与坦克生命值
- 地形凹坑、通路变化和胜负状态

### Feedback Translation
- 风粒子方向与速度 → 当前风向/风强
- 明亮尾迹与最高点标记 → 这组角度力度产生的真实弹道
- 落点箭头与距离刻度 → 下一发应往哪个方向修正多少
- 撞山火花 → 越障高度不足
- 爆炸冲击波与凹坑 → 爆炸范围、伤害衰减与地形破坏
- 飞行音调与镜头轻震 → 炮弹速度与爆炸力度

## 5. Challenge Space
**Challenge factors (affecting player-controlled data):** 发射角 ← 高低差、近处山体、目标掩体；发射力度 ← 水平距离、风速、武器初速度；武器选择 ← 地形厚度、目标暴露程度、库存与对手生命值。这些环境因素决定玩家必须怎样调整可操作数据。

**Factors that force a new judgment:** 风向或风速改变时必须重新补偿力度/角度；目标高低差改变时需要切换高抛或低抛思路；地形被炸出通道后可从越障改为直射；武器库存变化会迫使玩家从高伤害转向地形或范围策略。

**Perceivable vs inferred factors:** 玩家可直接感知：地形轮廓、双方位置、角度、力度、武器、风向箭头。需要通过反馈推断：某武器的实际弹速与风敏感度、爆炸边缘伤害、一次参数改动对应的偏移量，以及地形破坏后的新线路。

**Challenge dimension table:** 因素1 风：简单为无风或恒定弱风，学习基础角度/力度；困难为强风且回合间变化，学习用上一发估算补偿。
因素2 地形：简单为开阔缓坡，学习射程；困难为高墙、窄缝和脆弱支撑，学习越障与改造路线。
因素3 武器：简单为标准弹，轨迹稳定；困难为重弹、分裂弹等不同弹速与效果，学习迁移而非死记参数。

**2-3 progressive challenge combinations:** 挑战1“校准靶场”：无风、平地、标准弹，目标逐步变远；训练用落点修正力度。
挑战2“翻过山脊”：弱恒风+单个高障碍+目标高低差；训练在角度、力度间做取舍。
挑战3“风蚀峡谷”：强变风+可破坏复杂地形+有限多种武器；先试射或开路，再在限定回合内命中，训练综合判断与资源选择。

**Simple-to-complex sequence:** 有明确的简单到复杂顺序：先固定环境中掌握单变量修正，再加入一个可见干扰因素，最后组合变风、复杂地形和武器差异。每关仍重复同一“观察—判断—发射—反馈—修正”循环。

**What failure teaches next:** 可以。失败后保留上一发尾迹，标出撞击点、最高点及相对目标的偏差，并给出中性提示如“短落18米”或“轨迹被近坡阻挡”。玩家由此知道下一回合应观察风、越障高度或射程，只调整对应变量。

## 6. Visual & Camera
**Camera perspective:** 采用固定单屏横版侧视视角，展示两辆坦克、完整地形轮廓和炮弹飞行区域；炮弹接近屏幕上缘时镜头仅做轻微上移或缩放，始终保持双方位置关系可读。

**Why this perspective fits the learning shift:** 横版侧视最适合直接读出抛物线、水平距离、高低差、障碍和风造成的偏移；玩家可以把上一发轨迹与下一次瞄准进行视觉比较，这正是核心学习转变。

**2D / 2.5D / 3D:** 画面采用2D。地形使用可变形的高度图或蒙版，炮弹与坦克使用二维物理/自定义弹道计算；这样能以较低实现成本保证轨迹清晰、反馈稳定和网页性能。

**Visual style:** 视觉风格为原创的极简几何+轻微玩具质感：圆角坦克、清晰剪影、分层山丘、彩色武器图标和明亮尾迹。避免复制 Pocket Tanks 的界面、素材和具体武器造型。

**Color tone:** 整体明亮、略偏暖，天空用柔和蓝紫渐变，地形用暖土色，双方坦克用高对比青色与橙红色。友好色调降低失败挫败，危险与爆炸则用短促高饱和色突出。

**Sound:** 需要炮管机械转动声、力度蓄积声、不同武器的发射声、炮弹随速度变化的飞行声、材质碰撞与分层爆炸声。音乐轻快、有节奏但不过度紧张；瞄准时压低音乐，让风声和反馈更清晰。

## 7. AI Collaboration Boundary
**Student-owned decisions (AI must not change):** 我保留且 AI 不得擅自修改：双人回合制、角度+力度+武器选择的核心机制；风和可破坏地形；以落点证据做单变量修正的学习转变；生命值胜负；核心数据分类；原创、不复制原作素材与专有武器。

**AI-autonomous decisions:** 允许 AI 自主决定代码架构、Canvas 渲染与碰撞实现、响应式布局、粒子和音效的细节、数值初始值与性能优化。AI 可提出平衡调整，但涉及核心循环、胜负条件或新增复杂系统前必须先说明理由。

**How to detect and pull back a generic game:** 如果游戏只剩“按按钮随机发炮”或只有分数，而上一发轨迹不能帮助下一发判断，就说明已变成普通换皮小游戏。纠偏方式是用验收问题检查：玩家能否观察风/地形、控制角度力度、看到可解释轨迹、依据偏差只改一个变量，并在三档挑战中迁移这套判断；缺一项就回到核心循环修正。

## 8. Rules, Boundaries, and Outcomes
**Important states:** 可转化为状态的内容包括玩家回合/对手回合、瞄准/飞行/结算、炮弹飞行中/已碰撞、坦克安全/暴露、直线路径畅通/被遮挡、地形完整/被破坏、武器可用/耗尽、胜利/失败。

**How player actions change the system:** 调角改变发射方向；调力度改变初速度；选武器改变弹速、弹道、爆炸半径和地形效果；发射把瞄准状态变为飞行并消耗武器；爆炸改变生命值与地形网格。

**Success condition:** 单局中，在自己生命值归零前把对手生命值降到零即胜利。挑战关中还可用“限定回合内命中目标”或“以指定武器完成命中”作为成功条件。

**Failure conditions:** 生命值归零即失败；挑战关中，超过回合限制、耗尽指定武器仍未命中，或炮弹飞出边界也计为失败/失误。失败必须保留轨迹与偏差信息，支持下一次修正。

**Just-right ranges and thresholds:** 存在“刚刚好”的校准范围：力度过低会短落，过高会越过；角度太低可能撞山，太高会延长飞行并放大风偏。理想值不是固定点，而是能让爆炸半径覆盖目标的容错区间。

## 9. Feedback Priorities
**Immediate feedback:** 即时反馈包括调节角度时的炮管旋转、力度条变化、风向粒子；发射后的轨迹、碰撞火花、爆炸范围、伤害数字和地形变形也应立即出现。

**Feedback discovered over time:** 延迟反馈包括多回合后形成的射击基准、地形被逐步挖穿、位置优势改变、武器库存消耗，以及对手从玩家习惯中作出的反制。这些应通过连续局势让玩家自己发现。

**Feedback that must be visual, spatial, audible, or state-based:** 弹道形状、炮弹速度、风的方向感、撞击材质、爆炸力度与地形稳定性不能只用分数表示；应通过尾迹、动画节奏、粒子、镜头轻震、分层音效和状态变化来表现。

## 10. First Playable Version Scope
- Build a small desktop-browser game that validates one complete observe → judge → act → feedback → adjust loop.
- Use the accompanying system graph to implement 2-3 challenge presets when they are clearly defined. Each challenge should change system variables or relationships, not only visual decoration.
- Keep graphics simple and readable. Prioritize interaction, feedback, and learning over polish.
- Do not add realistic simulation, complex menus, accounts, online multiplayer, large asset pipelines, or unrelated features in the first version.
- Do not convert the project into a generic mini-game that only uses the domain as a theme.

## 11. Web Game Technical Dependencies and GitHub Pages

This project is published as a GitHub Pages site. The published site IS the exhibition. There is no ZIP packaging step and no separate offline build.

### GitHub Pages Publishing Rules
- The site is served from the repository root on the `main` branch, at `https://<username>.github.io/<repository-name>/`.
- Because GitHub Pages serves the site from a subpath, **every internal link and every asset path must be relative**. Root-absolute paths beginning with `/` will break on the published site even when they work locally.
- Store all required models, textures, audio, fonts, and libraries inside the repository. Do not load them from a CDN or another remote service.
- The repository is public. Never commit passwords, tokens, API keys, or personal information the student has not agreed to publish.
- After every push, the site republishes automatically. Verify the live URL, not only the local server.

### Choose the Lowest Necessary Dependency Track
1. **Track A - No build step:** Prefer HTML, CSS, plain JavaScript, and Canvas 2D for simple 2D games. This is the default choice and needs no extra configuration.
2. **Track B - Local vendored library:** For one small browser library, pin its version and store it under `assets/vendor/`.
3. **Track C - npm + build tool:** Use npm and Vite only for Three.js, multiple ES Modules, loaders, or other complex dependency graphs.

### Three.js and Vite Rules
- Three.js is allowed when 3D is important to the designed experience; do not replace meaningful 3D interaction only to avoid npm.
- Pin dependency versions in `package.json` and preserve `package-lock.json`.
- Configure Vite with a relative base such as `base: './'` so built assets work under the Pages subpath.
- Run `npm run build`, then copy the verified static output into the repository root so GitHub Pages serves it.
- Add a `.gitignore` that excludes `node_modules`. Never commit `node_modules`.
- Record dependency names, exact versions, licenses, build command, and output directory in `README.md`.

### Expected Repository Structure
```text
repository/
├── index.html                 # Project home: designer statement, system graph, play link
├── game.html                  # Playable game (or game/index.html)
├── process.html               # Human-AI development timeline
├── assets/                    # JS/CSS, system graph image, models, textures, audio, fonts
├── development-log/
│   └── agent-development-log.md
├── brief.md                   # This design and development specification
├── system-graph.png
├── ratings.csv                # Exported question-clarity ratings (teaching feedback)
├── README.md                  # How to run, controls, dependency track, main variables
└── source/                    # Track C only: src/, package.json, package-lock.json
```

## 12. Integrated Project Website Requirements
The website is the project space, not a final report and not a separate marketing page. It must exist from the first milestone and stay current as development progresses.

### Website From Day One
- Create the first version of `index.html` in the same pass as the first playable demo. Do not defer the website to the end of the project.
- The website is the exhibition surface: classmates and visitors will read it before or instead of playing, so it carries the designer statement, the system graph, and the play link.
- When the design changes, the website changes with it. A website that describes an older version of the game is worse than no website.

### Required Website Content
- **Game Idea:** project title, short concept, player goal, and core learning shift.
- **Domain Knowledge:** explain the real-world domain, novice misconception, expert judgment, and why this knowledge becomes playable.
- **System Design:** show the system graph and summarize environment data, player-controlled data, calculated results, feedback, success, failure, and challenge presets.
- **Development Process:** present a concise chronological timeline based on `agent-development-log.md`, including important changes, failures, tests, student decisions, and AI influence.
- **Play the Game:** the current playable version must be accessible from clear navigation and run directly in the website.

### Website Update Rules
- Create clear navigation among Home, Domain Knowledge / System Design, Development Process, and Play Game.
- Use only information supported by this brief, the system graph, the actual game, and the development log. Do not invent a smoother or more complete process.
- After every meaningful milestone, update the relevant website content and the development timeline.
- Keep the game idea and domain-learning explanation readable by classmates who have not seen the project before.
- Keep styling coherent across the informational pages and playable game, but prioritize clarity and function over decorative effects.
- Make the website usable on a typical student laptop. Mobile support is helpful but is not the first-version priority.
- Use relative links and asset paths. GitHub Pages serves the site from `https://<username>.github.io/<repository-name>/`, so root-absolute paths beginning with `/` will fail.
- Support a clean 1920×1080 exhibition view for display on an iMac. Important controls and text must fit without overlap.

## 13. Automatic Human-AI Development Log Protocol
In addition to building the website and game, maintain one Markdown file named `agent-development-log.md`. This file documents how the project develops through human-AI collaboration.

### Initialize the Log
At the beginning of development, create the file with:

```markdown
# Agent Development Log

- Project Title: Pocket Artillery Lab
- Student / Team: Evan
- Domain: 二维回合制弹道炮战：角度、力度、风力与地形判断
- Core Learning Shift: 核心学习转变：从“凭感觉把炮弹射向敌人”，转变为“把每次落点当作证据，只调整关键变量，逐步校准一条可靠弹道”。
- Current Game Idea: 我接触过 Pocket Tanks、Worms 等炮战游戏，也想理解为什么简单的两个输入会产生丰富判断。真实场景是和朋友轮流对战：第一次射击通常只是试探，之后根据落点不断修正，逐渐形成对抛物线、风力和地形的直觉。
- AI Agent Used: Codex + HTML5 Canvas / JavaScript
- System Graph: add the image file or Canva link when available
- Development Period: add start and end dates
```

### Two Entry Types in One Timeline
Keep Raw Interaction Logs and Stage Reflections in chronological order in the same file. Do not separate them into two large sections.

#### A. Raw Interaction Log — Create Automatically
After every meaningful development interaction, append a short factual entry. A meaningful interaction includes implementation, debugging, code explanation that changes the project, mechanic or level changes, visual or audio changes, website updates, playtesting, or an AI suggestion that affects direction. Do not log casual clarification that produces no development change.

Use this format:

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## Interaction 01 — Raw Interaction Log

**Time:**
**Development Stage:**
**Current Goal:**

### Student Request
What the student asked the AI Agent to do.

### Agent Response Summary
What the Agent suggested, generated, explained, or changed.

### Development Action
What was actually implemented, modified, tested, or removed.

### Website Update
Which website section changed, or why no website update was needed.

### Files / Systems Changed
List files, mechanics, assets, data, UI, or challenge settings changed.

### Test and Immediate Result
What was tested and whether it worked, failed, partially worked, or remains uncertain.

### Student Decision / Follow-up
What the student accepted, rejected, modified, did not understand, or decided to try next.
```

#### B. Stage Reflection — Prompt the Student at Milestones
Do not fabricate student reflection. At a meaningful milestone—such as finishing the first playable loop, changing design direction, completing a challenge, or finishing a playtest stage—create a Reflection entry with factual fields, then explicitly ask the student to answer the Required Student Reflection.

Use this format:

```markdown
════════════════════════════════════
## Reflection 01 — Stage Reflection

**Time:**
**Covered Interactions:** Interaction 01–04
**Development Stage:**

### Goal of This Stage
### What Changed in the Playable Game and Website
### How AI Helped
### Student Decisions
### AI Influence on Design Direction
### Relationship to the Core Learning Shift
### Problems / Open Questions
### Next Step

### Required Student Reflection
Does the current game still help the player experience the intended domain-learning shift? What became stronger, weaker, or different? Which AI suggestion did you accept, reject, or change, and why?

> The AI Agent must ask the student to answer this section and must not answer it for them.
```

### Logging Rules
- Append new entries to the end of `agent-development-log.md` and continue Interaction and Reflection numbering.
- Be honest and specific. Record failures, partial results, misunderstandings, abandoned directions, and unresolved questions.
- Record when AI introduces a design direction, when the student rejects or modifies it, and when the student accepts code without fully understanding it.
- Separate factual development events from student reflection. Never invent student opinions or decisions.
- After milestone reflections, update the Development Process section of the website with a concise, truthful timeline summary.

## 14. GitHub Pages Exhibition

The exhibition is the published Pages site. No archive is packaged and nothing is uploaded to a shared drive.

### Enable GitHub Pages
1. Open the repository on GitHub.
2. `Settings` -> `Pages`.
3. Under Build and deployment, set Source to `Deploy from a branch`.
4. Branch: `main`, Folder: `/ (root)`. Save.
5. Wait a few minutes, then open `https://<username>.github.io/<repository-name>/`.

Every later push to `main` republishes the site automatically.

### Pre-Publish Audit
- Run the project through a local static HTTP server and test every navigation link, the playable game, controls, challenge selection, success, failure, and restart.
- Confirm every internal link and asset path is relative. Root-absolute paths are the most common cause of a Pages site that loads but shows nothing.
- Test the layout at 1920x1080 for exhibition display; text, controls, canvas, and navigation must not overlap.
- Confirm `node_modules`, caches, temporary files, passwords, tokens, and API keys are not committed.
- Push, then open the live Pages URL and repeat the navigation and gameplay test.

### What the Student Submits
- The GitHub Pages URL: the playable exhibition link.
- The repository URL.
- Nothing else. The repository is already public, so there is no upload step.

### Public Display
- The repository and the published site are public, because GitHub Pages requires a public repository on the free plan.
- Anything the student does not want published simply stays out of the repository.
- The student must confirm before publishing that `brief.md`, `ratings.csv`, and `development-log/agent-development-log.md` may be publicly visible.

## 15. Instructions for the AI Agent

1. **Index the workspace before planning anything.** List every file in the project folder, then read `brief.md` and `system-graph.png`. Report what you found: which files exist, what the brief specifies, and what is missing or contradictory. Do not write code before this step.
2. Restate the core learning shift, core loop, main variables, feedback mappings, and challenge presets in a short implementation plan.
3. Identify missing or contradictory information. Ask only questions that block the first playable version.
4. Propose the repository structure, then create the website skeleton (`index.html`, `game.html`, `process.html`, `assets/`) and initialize `development-log/agent-development-log.md`.
5. Implement the smallest complete game loop first, then add the defined challenge presets.
6. Keep variable names clear, and keep environment data, player-controlled data, and calculated results visibly separated in the code.
7. Add short comments only where a high-school student needs help understanding a rule.
8. **The first milestone must ship the playable demo and the first version of `index.html` together.** Never let the website fall behind the game, and never leave the site to the end of the project.
9. Start a local static server, test navigation and gameplay, and give the student the local URL and simple controls.
10. Automatically append a Raw Interaction Log after meaningful development work, and request student reflection at milestones.
11. After every milestone, update the website so its Development Process page matches the actual log.
12. Before the exhibition, run the pre-publish audit and confirm the live GitHub Pages URL works.

## 16. Acceptance Checklist
- [ ] The player can take a meaningful action within 30 seconds.
- [ ] Player actions visibly change system data or state.
- [ ] Important invisible data is translated into readable feedback.
- [ ] Success and failure conditions work and can be understood.
- [ ] A second attempt can improve because the player learned from feedback.
- [ ] Challenge presets differ through variables, relationships, information, or constraints.
- [ ] The game runs in a browser without a complex installation process.
- [ ] README.md identifies the dependency track and explains how to run, the controls, and the main variables.
- [ ] `index.html` existed from the first milestone and was kept current, not added at the end.
- [ ] The site clearly presents the game idea, domain knowledge, system design, development process, and playable game.
- [ ] `development-log/agent-development-log.md` contains chronological Interaction and Reflection entries.
- [ ] The Development Process page matches the actual log and does not hide failures or unfinished work.
- [ ] All internal links and assets use relative paths, because Pages serves from a subpath.
- [ ] The published GitHub Pages URL has been opened and tested at 1920x1080.
- [ ] No passwords, API keys, tokens, or `node_modules` are committed.
- [ ] The student has confirmed the brief, ratings, and development log may be publicly visible.
