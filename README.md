# 引越しのマツイ Webサイト

静的サイト（HTML / CSS / JS、ビルド不要）。GitHub Pages（main ブランチ / ルート）で公開。

## 構成
- `index.html` … 全セクション（HEADER〜FOOTER）
- `css/style.css` … CSS変数・共通パーツ・セクション別スタイル（PC → タブレット 〜1199px → スマホ 〜767px）
- `js/main.js` … ハンバーガーメニュー、ヘッダーの影
- `images/` … 仮画像（SVG）

## 画像の差し替え
仮画像と同じ縦横比の写真を用意し、`index.html` の `src` を差し替えてください（表示は `object-fit: cover` のため多少比率が違っても崩れません）。

| ファイル | 場所 | 推奨比率 |
|---|---|---|
| fv-main.jpg | FV メイン写真（差し替え済み） | 4:3 |
| reason-01〜04 | 選ばれる理由 | 16:10 |
| service-01〜05 | サービス | 3:2 |
| works-0X-before / after | 引越し事例 | 4:3 |
| about-01 / about-02 | マツイについて | 4:3 / 1:1 |
| logo.png | FV・CTAのキャラクター（ロゴ画像・差し替え済み） | — |
| cat.svg（未使用） / logo-mark.svg / truck.svg / map.svg | キャラクター・ロゴ・トラック・地図（仮イラスト） | — |

## 仮の値（要差し替え）
- 電話番号 `tel:0000000000` / `000-0000-0000`
- LINEのリンク `href="#"`
- よくある質問の回答文、フッターの住所・受付時間
