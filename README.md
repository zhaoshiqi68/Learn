# Harness Engineering 交互课程

按 [paper-to-course](https://github.com/ZeroxZhang/paper-to-course) 的流程，把预印本做成一门可交互的中文课。

**Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents**

Paul Barbaste、Tristan Darrigol、Germain Vu、Tom Wiltberger，arXiv:[2609.00006](https://arxiv.org/abs/2609.00006)（2026 年 7 月）。

课程在 `public/learn/`。前七个模块是概论：公式步进、伪代码逐行、对照条、拖放、测验。后五个模块是精读，对着短引文标出承诺、证据和限定语。样式和交互引擎来自该技能的 `references/`。`main.js` 只改了一处：侧边栏节点在首次进度计算之前声明，否则测验函数不会挂上。课程解释论文，不转载全文。

原文：[HTML](https://arxiv.org/html/2609.00006) · [PDF](https://arxiv.org/pdf/2609.00006)

逐节笔记在 `/guide`。

## 本地运行

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 38471
```

打开 [http://127.0.0.1:38471](http://127.0.0.1:38471)，首页会进入课程。手机浏览器可以直接看，目录在右下角。

长期地址不要用临时隧道。把 `main` 推到 GitHub 之后，在仓库 Settings → Pages 里把源选成 `main` 分支的 `/docs`。页面会在 `https://<用户名>.github.io/<仓库>/`，不会过期。`docs/` 由 `public/learn/build.sh` 同步。

改完模块后重新打包：

```bash
cd public/learn && bash build.sh
```
