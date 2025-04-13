"use client";

import React, { useState, useMemo } from 'react';
import { ApplicationCard } from './ApplicationCard';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const sampleApplications = [
    {
        id: 'hitachi',
        companyName: 'Hitachi Social Information Services, Ltd.', 
        companyLogoUrl: null, 
        jobTitle: 'システムエンジニア (SE)',
        jobUrl: '#',
        stages: ['応募', '書類選考', '一次面接', '二次面接', '内定', '内定承諾'],
        currentStageIndex: 5,
        documents: [
            { name: '会社概要・事業内容_2026採用...', url: '#' },
            { name: '制度編_2026採用.pptx', url: '#' },
        ],
        video: { title: '株式会社日立社会情報サービス様 会社説明会', thumbnailUrl: '/placeholder-video-thumbnail.jpg' },
        status: '選考終了',
        statusMessage: '選考を辞退しましたので、選考が終了しました。',
        isBookmarked: true,
        currentProcessNotes: '',
        userActionNotes: '',
        法人名: "株式会社日立社会情報サービス\nHitachi Social Information Services, Ltd.", 
        本社: "東京都品川区南大井6丁目26番3号　大森ベルポートD 館 17 階",
        電話番号: "03-5471-2345",
        設立: "1986/04/01",
        法人代表者: {
            "役職": "代表取締役　取締役社長",
            "氏名": "北川 高維"
        },
        ベトナム法人: "なし",
        事業内容: `■3つの事業において幅広い事業領域の社会イノベーションに貢献
　当社の事業は「システムインテグレーション事業」「システム運用サービス事業」「パッケージ・ソリューション事業」です。
　私たちはこの3つの事業を公共・通信・金融・産業・流通・ヘルスケアなどの幅広い事業領域で展開しています。

　当社の強みは、創業以来携わってきた事業者向けの業務システム開発に基づく技術と経験、そしてその多彩な事業領域でお客さまに貢献することによって培われた適応力の高さです。
　当社はこの強みを生かし、目まぐるしく変化するIT市場において時代とともに成長し、モバイル・クラウド時代に対応する柔軟なソリューションとサービスを提供していきます。

〇システムインテグレーション事業：
　　大規模システム開発で培った幅広い業務知識と先端技術により、お客さまの課題を解決します
　＜主な事業内容＞
　　・業種別システム構築サービス（公共、通信、金融、産業、流通、交通、ヘルスケア）
　　・業務別システム構築サービス（人事、財務、販売、生産管理、物流）
　　・ITプラットフォーム構築サービス　など

〇システム運用サービス事業：
　　お客さまとともにITサービスマネジメント（ITSM）を確立・改善し、運用現場の課題解決を支援します
　＜主な事業内容＞
　　・運用診断サービス
　　・運用管理設計サービス
　　・運用管理サービス／システムオペレーションサービス　など

〇パッケージ・ソリューション事業：
　お客さまニーズに対応する多彩なパッケージ製品と、業務に特化したソリューションを提供します
　＜主な事業内容＞
　　・データ分析利活用サービス
　　・クラウド・ネットワークサービス
　　・セキュリティサービス
　　・マイグレーションサービス
　　・デジタルコミュニケーション
　　・企業年金システムソリューション
　　・知的財産管理
　　・システム開発・運用サービス　など

■当社には揺るぎないベースを作る環境があります
　チームとしての連携だけでなく、一人ひとりの技術力が高いことが日立社会情報サービスの強み。
　各種会社制度や評価の仕組みによって、柔軟な技術力を磨ける環境が整っています。
　さまざまな教育体系により、ITスキルだけでなくビジネススキルまで、それぞれの役割や期待に応じて成長することができます。
　また教育熱心な上司や先輩が多いことも特徴のひとつ。入社1年間はチューター制度もあり、安心して仕事に集中できます。

　主要事業であるシステムインテグレーションに加え、今後はクラウド、分析ソリューション、IoTといった新たな事業の拡大も進めていきます。
　若手のエンジニアがリーダーとして活躍できる場があります。

■新しい価値は、つながりを大切にする風通しのいい場所から生まれる
　お客さまのニーズに応え、新しい価値を生み出すために私たちが最も大切にしていることは、人と人とのつながりです。
　なかでも、上司・先輩・後輩という縦のつながりが強いのは、変わることがない当社の伝統と言えます。
　信頼できる上司・先輩がいつもそばにいて、どんなに些細なことも真剣に聞く。それが社風として根付いており、そこに役員が加わることも珍しくありません。
　だからこそ配属先やプロジェクトの規模を問わず、存分に力を発揮できます。
　またお客さま企業の担当者や、一緒にチームを組んだ他社のエンジニアとつながっている社員が多いのも当社の特徴です。`,
        プログラミング言語: "AWS,COBOL,Java",
        勤務時間: "08:50 ~ 17:20",
        フレックスタイム: "あり",
        コアタイム: "なし",
        実働時間: "7.75 時間/日",
        時間外労働実績: "※ 昨年度時間外労働実績: 24.5 時間/月",
        アピールポイント: `■業務内容
　・社会貢献性の高い大規模案件に従事できる
　・上流工程から下流工程まで幅広い経験が可能(企画・設計・構築・テスト・移行・運用)

■教育制度
　・技術面で指導する指導員とメンタル面のサポートをするメンターによる育成制度あり
　・研修制度が豊富（階層別教育、技術教育、ビジネススキル教育等）
　・自己啓発支援制度あり（資格取得報奨金制度、語学学習サポート）

■会社制度
　・初年度より有給24日(平均消化日数約19日)付与
　・「DX認定取得事業者」として認定
　・女性活躍推進活動の実施状況が優良な企業に認定されるえるぼしが最高の「★3つ」獲得
　・健康推進活動の実施状況が優良な法人を顕彰する健康経営優良法人を獲得`,
        その他: `■勤務先
　・勤務先は日本国内　当社の本社または都内勤務がメインとなります。
　(社員の内訳：本社勤務4割、日立グループ拠点ビル6割)

■職場紹介
・ビル17階に本社を構え、景色のいい中で仕事ができる
・敬称を略して「〇〇さん」と呼ぶことで気軽な会話ができる風土
・アドレスフリーな自由な席で仕事ができる
・ちょこっと相談TIMEを設定し、相談しやすい環境がある`,
        ホームページ: "https://www.hitachi-sis.co.jp/",
        ビデオ: "no-video" 
    },
    {
        id: 'circlace',
        companyName: 'circlace Inc.',
        companyLogoUrl: '/placeholder-circlace-logo.png',
        jobTitle: 'ソフトウェアエンジニア',
        jobUrl: '#',
        stages: ['応募', '書類選考', '一次面接', '二次面接', '内定', '内定承諾'],
        currentStageIndex: 2,
        documents: [
            { name: '26新卒向け：説明会用資料...', url: '#' },
            { name: 'VN - 26新卒向け：説明会用...', url: '#' },
        ],
        video: { title: 'Circlace Inc. 説明会', thumbnailUrl: '/placeholder-video-thumbnail-2.jpg' },
        status: '選考中',
        statusMessage: '一次面接の日程調整中です。',
        isBookmarked: false,
        currentProcessNotes: '書類選考通過。',
        userActionNotes: '面接希望日を返信。',
    },
];


export const ApplicationListPage = () => {
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredApplications = useMemo(() => {
        if (filterStatus === 'all') {
            return sampleApplications;
        }
        return sampleApplications.filter(app => app.status === filterStatus);
    }, [filterStatus]);

    return (
        <div className="w-full space-y-6">
             <div className="flex justify-end">
                 <ToggleGroup
                     type="single"
                     defaultValue="all"
                     value={filterStatus}
                     onValueChange={(value) => {
                         if (value) setFilterStatus(value);
                         else setFilterStatus('all'); 
                     }}
                     className=" border rounded-md p-1"
                 >
                     <ToggleGroupItem value="all" aria-label="すべて表示" size="sm" variant="outline" className="data-[state=on]:bg-[#3A6B4C] data-[state=on]:text-white">
                         すべて
                     </ToggleGroupItem>
                     <ToggleGroupItem value="選考中" aria-label="選考中のみ表示" size="sm" variant="outline" className="data-[state=on]:bg-[#3A6B4C] data-[state=on]:text-white">
                         選考中
                     </ToggleGroupItem>
                     <ToggleGroupItem value="選考終了" aria-label="選考終了のみ表示" size="sm" variant="outline" className="data-[state=on]:bg-[#3A6B4C] data-[state=on]:text-white">
                         選考終了
                     </ToggleGroupItem>
                 </ToggleGroup>
            </div>

            {filteredApplications.length > 0 ? (
                 filteredApplications.map(app => (
                    <ApplicationCard key={app.id} application={app} />
                 ))
            ) : (
                 <div className="text-center text-slate-500 py-10">
                    該当する応募情報はありません。
                 </div>
            )}
        </div>
    );
};