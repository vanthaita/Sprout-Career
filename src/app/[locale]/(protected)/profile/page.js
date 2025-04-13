"use client";

import React, { useState, useEffect } from 'react';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileContentTabs } from '@/components/profile/ProfileContentTabs';
import { ApplicationListPage } from '@/components/application/ApplicationListPage';
import { useRef } from 'react';
const profileData = {
    user: { // Data mainly for the header
        name: 'Ta Van Thai',
        scpId: '01234567892', // Placeholder SCP ID from image mock-up
        expectedGraduation: '2026/08',
        github: 'https://github.com/vanthaita',
        imageUrl: '/path-to-actual-profile-pic.jpg' // Replace with actual image path
    },
    basicInfo: {
        name: 'ター・ヴァン・タイ / Ta Van Thai',
        dob: '2004 / 08 / 30',
        gender: '男性',
        phone: '0302957160',
        email: '22521377@gm.uit.edu.vn',
        country: 'ベトナム',
        github: 'https://github.com/vanthaita',
        viblo: '', // Add link if available from original source
        facebook: 'https://www.facebook.com/profile.php?id=100091639259957',
        slack: '', // Add handle if available
        chatwork: '', // Add handle if available
    },
    education: {
        university: 'ベトナム国家大学ホーチミン市情報技術大学 (ホーチミン)',
        faculty: 'OEP', // Assuming OEP is faculty/department
        studentId: '22521377',
        year: '3年生',
        expectedGraduation: '2026/08',
        // gpa: '3.19' // GPA wasn't explicitly in the education section, add if needed
    },
    qualifications: [
        { name: 'Hackerrank - 「React(基礎)」証明書', date: '2024 / 09 / 07' },
        { name: 'Hackerrank - 「中級」証明書', date: '2024 / 09 / 11' },
        { name: 'Google - 「AI基礎」コースを完了証明書', date: '2024 / 09 / 25' },
        { name: 'Hackerrank - 「Python基礎」証明書', date: '2024 / 10 / 09' },
        { name: 'Coursera - 「経営者とビジネスリーダーのための生成的AI」', date: '2024 / 09 / 22' },
        { name: 'SimpleLearn - 「PHP入門」証明書', date: '2025 / 03 / 30' }, // Note: Date is in the future
    ],
    awards: [], // Explicitly stating no awards were listed in that section
    appealPoint: {
        main: "私の強みは、新しい技術を迅速に習得し、それを実際の開発プロジェクトに応用できる点です。例えば、Next.jsを初めて学んだ際、わずか一ヶ月で独学し、Webアプリケーションの開発に成功しました。この経験から、自ら学び、実践に活かす能力の高さを実感しています。\n\nまた、チームでの協力を大切にし、複雑な問題に直面した際には、チームメンバーと積極的に意見交換を行い、最適な解決策を見つけ出すことを心がけています。これにより、プロジェクトの効率性と品質の向上に貢献してきました。\n\n変化の激しいIT業界において、私は常に最新の技術動向をキャッチアップし、新しい課題に挑戦することを楽しみにしています。柔軟な対応力と責任感を持ち、貴社の開発プロジェクトに貢献し、会社全体の成功に貢献できるよう努めてまいります。",
        strengths: "貴社のミッションと私のスキルが一致し、共に成長できることを楽しみにしています。", // Added based on "貴社で活かせる経験・能力" field, simplified
        motivation: "登録されていません。" // Based on "経験談能力" field
    },
    skills: {
        programming: [
            { name: 'C++', duration: '8 か月' },
            { name: 'JavaScript', duration: '12 か月' },
            { name: 'HTML', duration: '12 か月' },
            { name: 'CSS', duration: '12 か月' },
            { name: 'SQL', duration: '12 か月' },
            { name: 'TypeScript', duration: '12 か月' },
            { name: 'Rust', duration: '4 か月' },
            { name: 'NoSQL', duration: '6 か月' },
            { name: 'Move Language', duration: '3 か月' },
        ],
        frameworks: [
            { name: 'Expo', duration: '3 か月' },
            { name: 'Node.JS', duration: '10 か月' },
            { name: 'Expressjs', duration: '10 か月' },
            { name: 'ReactJS', duration: '8 か月' },
            { name: 'NextJs', duration: '8 か月' },
            { name: 'Vue.Js', duration: '4 か月' },
            { name: 'NestJs', duration: '5 か月' },
            { name: 'TailwindCSS', duration: '6 か月' },
            { name: 'Prisma', duration: '8 か月' },
            { name: 'MVC', duration: '8 か月' }, // MVC listed as framework here
            { name: 'TypeORM', duration: '3 か月' },
        ],
        os: [
            { name: 'Linux', duration: '3 か月' },
            { name: 'Windows', duration: '24 か月' },
            { name: 'Ubuntu', duration: '6 か月' },
        ],
        db: [
            { name: 'Microsoft SQL Server', duration: '12 か月' },
            { name: 'PostgreSQL', duration: '8 か月' },
            { name: 'MongoDB', duration: '6 か月' },
        ],
        platform: [
            { name: 'Docker', duration: '3 か月' },
        ],
        versionControl: [
            { name: 'Git', duration: '8 か月' },
        ],
        devTools: [
            { name: 'Slack', duration: '24 か月' },
        ],
    },
    projects: [
        {
            title: "Pirate Social V2",
            url: "https://github.com/TDevUiT/piratesocial-v2",
            purpose: "創造性と自由を重んじる「海賊精神」を持つ人々をつなげるプラットフォームを構築すること。クリエイティブなプロジェクトを共有し、協力して新しい価値を生み出すことを目的とする。",
            description: "リアルタイム通信、投稿、フォロー、コメントなどのソーシャル機能を備えた次世代型プラットフォーム。ユーザーが自由かつ迅速にコミュニケーションできる環境を提供する。",
            points: [
                "リアルタイム通信： Socket.ioでスムーズなチャット体験を実現。",
                "スケーラビリティ： RedisとPostgreSQLで大規模ユーザーに対応可能な設計。",
                "セキュリティ： JWT認証でユーザーデータを安全に保護。",
                "モダンなUI/UX： Next.jsとTailwindCSSで直感的で洗練されたUIを構築。",
                "クラウドインフラ： AWS S3で効率的なメディア管理。"
            ],
            tech: "HTML, CSS, PostgreSQL, git, TypeScript, NextJs, NestJs, TailwindCSS, Docker, Prisma, MVC",
            team: "3人, チームの役割：フルスタック開発者",
            duration: "3か月",
        },
        {
            title: "Kaichain",
            url: "https://kaichin.vercel.app", // Corrected typo from original image analysis if needed
            purpose: "Sui Vietnam Hackathon 2023 参加 - Web3決済ゲートウェイの開発に焦点を当てて実現\n企業や開発者ののシームレスで効率的なWeb3決済ゲートウェイを提供すること。\n複数のブロックチェーンにわたる暗号通貨決済の受け入れと実行の簡素化を推進すること。",
            description: "オンラインストア、SaaSプラットフォーム、デジタルビジネス向けの、将来性の高い支払い方法を迅速、安全、費用対効果の高い代替手段を提供すること。\nKaichinは、暗号通貨決済を合理化するために設計されたWeb3決済ゲートウェイです。企業の開発者が、低手数料、迅速なトランザクション、安全な方法で暗号通貨決済をプラットフォームに簡単に統合できるようにします。Kaichinの複数のブロックチェーンと暗号通貨をサポートしており、短期間で支払いネットワークに反応を従います。また、支払いリクエストや支払いコンテンツなどの機能も提供します。",
            points: [
                "Web3決済ゲートウェイ: オンラインストアやデジタルビジネス向けの暗号通貨決済を促進します。",
                "マルチブロックチェーンサポート: 複数のブロックチェーンネットワーク (Startosお勧め) で動作するように設計されています。",
                "簡略化された暗号通貨決済: 暗号通貨の受け入れと実行を誰にとっても容易にします。",
                "低手数料と高速トランザクション: 費用対効果が高く、高速な決済処理ソリューションを提供します。",
                "開発者に優しい統合: さまざまなプラットフォームとのシームレスな統合のためにAPIと開発者SDKを提供します。",
                "決済機能: 支払いリクエスト、QRコード決済、安全なエスクロー、支払いインテントが含まれます。"
            ],
            tech: "HTML, CSS, git, TypeScript, NextJs, TailwindCSS, Docker, Move Language",
            team: "1人, チームの役割：フロントエンド開発者",
            duration: "登録されていません。", // Explicitly mentioned as not registered
        },
        {
            title: "Kapi - Language Learning App",
            url: "https://github.com/TDevUiT/kapi",
            purpose: "楽しく効果的な日本語学習体験を提供すること。\n語彙、文法、会話能力を向上させるためのパーソナライズされた学習ツールを開発すること。",
            description: "学習者のモチベーションを維持し、学習進捗を可視化すること。\nKapiは、モバイル学習に特化した日本語学習アプリケーションです。フラッシュカード、文法解説、インタラクティブな演習、進捗追跡、リーダーボードなどの機能を通じて、学習者の日本語能力向上をサポートします。また、ビデオ学習やスマートリマインダー機能も備えており、学習体験をより豊かなものにしています。",
            points: [
                "パーソナライズ学習: 学習進捗に合わせて内容を調整。",
                "インタラクティブ: 楽しい演習で学習を促進。",
                "動画学習: Cloudinaryでシームレスな動画体験。",
                "継続的なモチベーション: リーダーボードとスマートリマインダーで学習を促進。",
                "直感的なUI/UX: 学習体験を快適に。"
            ],
            tech: "HTML, CSS, SQL, PostgreSQL, TypeScript, NextJs, NestJs, TailwindCSS, Prisma, MVC, Expo",
            team: "3人, チームの役割：フルスタック開発者3人", // Clarified role/number
            duration: "3か月",
        },
        {
            title: "Cinevie - Online Cinema Booking",
            url: "https://cinevie-piet.vercel.app",
            purpose: "映画、映画館、チケット予約を探索するためのシームレスで便利なオンラインプラットフォームを提供すること。\nユーザーが映画館、時間、プロモーションを簡単に見つけることができるユーザーフレンドリーなインターフェースを作成すること。",
            description: "映画ファンが予約、設定、支払い情報を管理するための包括的なプラットフォームを提供すること。\nCinevieは、Next.jsを使用して構築されたWebアプリケーションで、完全なオンライン映画予約エクスペリエンスを提供するように設計されています。ユーザーは上映時間を検索したり、映画館の場所を表示したり、プロモーションを検索したり、ニュースを読んだり、チケットを予約したりできます。このプラットフォームは、注文履歴、設定、支払いカード管理、パスワード変更などのユーザーアカウント管理機能も提供します。",
            points: [
                "包括的な映画プラットフォーム：映画館の検索、予約、アカウント管理のためのオールインワンソリューション。",
                "ユーザー中心のUI/UX：ポジティブなユーザーエクスペリエンスのための直感的なデザイン、明確な情報アーキテクチャ、シームレスなナビゲーション。",
                "チケット予約システム：映画館、上映時間、座席を選択するための簡単なプロセス。",
                "アカウント管理：予約、設定、支払い方法を管理するためのユーザーフレンドリーな機能。",
                 "レスポンシブデザイン：さまざまなデバイスで最適に動作するように構築されています。"
            ],
            tech: "JavaScript, HTML, CSS, NestJs, TailwindCSS", 
            team: "1人, チームの役割：フルスタック開発者",
            duration: "1か月",
        }
    ],
    internship: {
        company: "Sun Asterisk",
        duration: "2024/07/15 - 2024/09/23",
        environment: {
            language: "TypeScript",
            framework: "VUE, WXT, NestJs", 
            os: "Ubuntu",
            db: "PostgreSQL",
            platform: "Docker",
            versionControl: "git",
            devTools: "Slack"
        },
        responsibilities: [
            "データベースの設計と管理: データベースの構築、維持、最適化。",
            "バックエンドAPIの作成: RESTfulAPIの設計と実装。",
            "タスク要求に基づいた機能開発: 要求されたタスクに基づいてバックエンドとフロントエンドの機能を開発。",
            "フロントエンドタスクの実行: フロントエンドのタスクも含め、全体的な機能開発を担当。",
        ],
        mainRole: "フルスタック開発者"
    },
    selfIntro: [
        {
            q: "1. 学生時代に最も力を入れて取り組んだことは？「学び続けること」と「実践的な経験を積むこと」でした。特に、大学2年生でインターンシップの機会を得たことを目標に、早い段階から行動を起こしました。",
            a: "大学1年生の時から、ウェブプログラミングの独学を始め、授業外で試行錯誤を重ねました。オンラインコースや最新技術を積極的に学び、個人的なプロジェクトに応用することで、技術力を高めました。また、業界関係者とのネットワーク構築にも力を入れ、主体性や粘り強さを身につけました。\n\nその結果、Sun Asteriskでの夏季インターンシップに合格し、実務経験を積むことができました。この経験を通じて、テクノロジー業界で成功するためには、自律学習の精神と諦めない力が不可欠であることを学びました。この経験は、私のキャリアの方向性を定める重要な転機となりました。",
            date: "2025/01/21 17:59"
        },
        {
            q: "2. 将来の目標",
            a: "私の目標は、高い技術力と創造的な問題解決能力を持ち、チームを率いることができるフルスタックエンジニアになることです。専門知識だけでなく、リーダーシップ能力やチームワークスキルも兼ね備えた、総合的な成長を目指しています。\n\n具体的には、以下のステップで目標を達成していきます：\n\n卒業前：SNSプロジェクトの完了、日本語能力試験N2、AWS認定資格の取得。\n\n卒業後1年目：入社後は、会社で使用されている技術スタックを迅速に習得し、実際のプロジェクトに貢献します。新しい技術やツールに対する適応力を活かし、チームの一員として価値を提供できるよう努めます。\n\n2年後：日本語能力試験N1を取得し、より高度な技術力とコミュニケーション能力を身につけます。\n\n3～5年後：専門知識を深め、管理能力とリーダーシップ能力を向上させ、製品の改善や会社への価値提供に貢献します。\n\n最終的には、革新的な技術ソリューションを提供し、会社の発展に貢献できるエンジニアになることを目指しています。",
            date: "2025/02/27 07:39"
        },
        {
            q: "3. あなたをプログラミング言語に例えると何ですか？その理由は？",
            a: "私をプログラミング言語に例えるなら、TypeScriptを選びます。\n\nTypeScriptは、型安全性に優れており、開発プロセス中のエラーを減らすことができます。これは、私の慎重で几帳面な性格を反映しています。私は、仕事においても正確さと安定性を常に優先します。\n\nまた、TypeScriptは柔軟性が高く、JavaScriptや他のライブラリとの統合が容易です。これは、私の学習意欲と適応力を示しています。新しい技術を積極的に学び、変化を恐れない姿勢は、TypeScriptの柔軟性に通じるものがあります。\n\nさらに、TypeScriptはコミュニティ志向の言語であり、チームでの開発をサポートします。私も、チームの信頼できる一員として、共通の目標達成に貢献することを常に心がけています。",
            date: "2025/01/21 17:59"
        },
        {
            q: "4. 興味のあるIT技術（内容と理由）",
            a: "私は、私たちの生活や働き方を変える可能性を持つ技術に魅了されています。特に、テキスト、画像、音声、さらにはコードを生成できるGenerative AIに強く惹かれています。しかし、AIが最大の能力を発揮するためには、堅牢で柔軟なプラットフォームが必要です。だからこそ、私はクラウドベースのWebフルスタック開発に注力し、サーバーレスアーキテクチャやコンテナ技術（AWS, Azure, GCP）を使用して、スケーラブルでコスト最適化された、AIとの統合が容易なシステムを構築しています。\n\nAIの力とクラウドの柔軟性の組み合わせが、さまざまな分野で革新的な解決策を生み出すと信じています。学び続け、最先端の技術を追い求める情熱を持って、私は常に新しい挑戦を受け入れ、生活にポジティブな影響を与える製品を作り出す準備ができています。",
            date: "2025/02/19 22:34"
        },
    ],
    media: {
        slides: [
            { url: "#", name: "ター・タイバン..." },
            { url: "#", name: "ター・タイバン..." },
        ],
        video: {
            thumbnailUrl: "/placeholder-video-thumbnail.jpg",
            title: "ター・タヴァン・タイの自己紹介",
            url: "#"
        }
    },
    personality: {
        jobExpectations: ['法人顧客向けサービスの開発', '自社サービスの開発', '職場の一体感'],
        strengthsTags: ['最後までやり抜く責任感', '前向きな向上心', '部下・メンバーへのサポート'],
        interests: ['Web', '生成AI', '研究開発'],
        diagnosis: [
            { title: '親切心 / Kindness', description: '人に親切し、人のためによいことをする。他人を助け、面倒を見てあげる。親切心を強みとするあなたは、他の人に対して親切で寛大で、尽し過ぎるからといって人に親切にできないということはない人です。見知らぬ人も相手に対してしても、喜んで手伝いができる人です。' },
            { title: '好奇心 / Curiosity', description: '今起きているあらゆる経験それ自体に興味を持ち、主題やテーマに対して興味深いと感じる。探求心を発揮して新しいことを発見することを好む。好奇心を強みとするあなたは、何事にも好奇心を抱きます。常に問いを持ち、あらゆる主題やテーマについて興味深く感じます。あなたは探求と発見を好む人です。' },
            { title: '向学心 / Love of Learning', description: '新しいスキルや知識体系を身につけることは、独学でも正式な教育による場合でも何らかの形で熱心に関心しているが、好奇心の特性に留まらず、既存の知識についても体系的に理解を深める傾向がある。向学心を強みとするあなたは、授業でも、あるいは独学でも、新しいことを学ぶのが大好きです。あなたは学校や博物館あるいは読書など、いつでもどこでも学ぶ機会を得るのが大好きな人です。' },
            { title: 'チームワーク / Teamwork', description: '...' }, 
            { title: '誠実さ / Honesty', description: '...' }, 
        ],
        viaResultsLink: '#'
    }
};
export const sectionIds = {
    basicInfo: 'basic-info',
    education: 'education',
    qualifications: 'qualifications',
    awards: 'awards',
    appealPoint: 'appeal-point',
    skills: 'skills',
    projects: 'achievements', 
    internship: 'internship',
    selfIntro: 'self-introduction',
    media: 'media',
    personality: 'personality',
};
const sectionsForSidebar = [
    { id: sectionIds.basicInfo, title: '基本情報' },
    { id: sectionIds.education, title: '学歴' },
    { id: sectionIds.qualifications, title: '資格' },
    { id: sectionIds.awards, title: '表彰歴' },
    { id: sectionIds.appealPoint, title: 'アピールポイント' },
    { id: sectionIds.skills, title: '技術' },
    { id: sectionIds.projects, title: '成果物' },
    { id: sectionIds.internship, title: 'インターン経験' },
    { id: sectionIds.selfIntro, title: '自己紹介' },
    { id: sectionIds.media, title: 'メディア' },
    { id: sectionIds.personality, title: '人物像' },
];
const Page = () => {
    const [currentView, setCurrentView] = useState('profile');
    const [activeSection, setActiveSection] = useState(sectionsForSidebar[0]?.id || sectionIds.basicInfo);
    const handleNavigate = (view) => {
        setCurrentView(view);
        if(view !== 'profile') {
            history.replaceState(null, window.location.pathname);
        }
    };

    const headerRef = useRef(null);
    const [showSidebarAvatar, setShowSidebarAvatar] = useState(false);
    const sectionRefs = useRef({});
    const isScrollingRef = useRef(null);
    
    
    useEffect(() => {
        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        };

        const handleScroll = () => {
            if (headerRef.current) {
                const headerBottom = headerRef.current.getBoundingClientRect().bottom;
                setShowSidebarAvatar(headerBottom < 0);
            }

            if (currentView !== 'profile') return;

            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const offset = viewportHeight * 0.2; 

            let newActiveSection = sectionsForSidebar[0]?.id || sectionIds.basicInfo;

            for (let i = sectionsForSidebar.length - 1; i >= 0; i--) {
                const section = sectionsForSidebar[i];
                const element = sectionRefs.current[section.id];

                if (element) {
                    const elementTop = element.offsetTop;
                    if (scrollPosition >= elementTop - offset) {
                        newActiveSection = section.id;
                        break;
                    }
                }
            }

            setActiveSection(prevActiveSection => {
                if (prevActiveSection !== newActiveSection) {
                    return newActiveSection;
                }
                return prevActiveSection;
            });

             clearTimeout(isScrollingRef.current);
             isScrollingRef.current = setTimeout(() => {
             }, 150);
        };

        const debouncedScrollHandler = debounce(handleScroll, 50); 
        handleScroll();

        window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
             clearTimeout(isScrollingRef.current);
        };
    }, [currentView, sectionRefs, headerRef]);

    useEffect(() => {
        if (currentView === 'profile' && activeSection) {
            const newUrl = `${window.location.pathname}#${activeSection}`;
            const currentHash = window.location.hash;

             if (currentHash !== `#${activeSection}`) {
                history.replaceState(null, '', newUrl);
             }
        }
    }, [activeSection, currentView]); 



    return (
        <div className="min-h-screen font-sans"> 
        <ProfileHeader user={profileData.user} onNavigate={handleNavigate} ref={headerRef} />
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            {currentView === 'profile' && (
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-grow lg:w-3/4 order-2 lg:order-1">
                        <ProfileContentTabs profileData={profileData} sectionRefs={sectionRefs}/>
                    </div>
                    <aside className="w-full lg:w-1/4 order-1 lg:order-2 lg:sticky lg:top-6 self-start">
                        <ProfileSidebar activeSection={activeSection} showAvatar={showSidebarAvatar}  sections={sectionsForSidebar}/>
                    </aside>
                </div>
            )}

            {currentView === 'applications' && (
                <div>
                    <ApplicationListPage />
                </div>
            )}
        </div>
    </div>
    );
};

export default Page;