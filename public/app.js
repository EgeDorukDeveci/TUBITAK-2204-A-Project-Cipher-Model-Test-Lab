const baseTexts = {
  "50": "guvenlik analizinde yapay zeka hizla gelisir",
  "150": "yapay zeka modelleri klasik sifreleme turlerini cozerken bazen dogru bazen ise yanlis tahminlerde bulunabilir bu nedenle farkli sifre tipleriyle test gerekir",
  "300": "klasik sifreleme yontemleri modern guvenlik icin yetersiz olsa da yapay zeka modellerinin ozellikle dil oruntu tanima becerilerini olcmek icin son derece uygundur bu metin farkli anahtar uzunluklari ve farkli sifreleme teknikleri kullanilarak uretilecek metinlerin temelini olusturmaktadir"
};

const dataset = [
  ["sezar_50", "Sezar", "50", "3", "jxyhqoln dqdolclqgh bdsdb chnd klcod jholvlu"],
  ["sezar_150", "Sezar", "150", "3", "bdsdb chnd prghoohul nodvln vliuhohph wxuohulql frchunhq edchq grjux edchq lvh bdqolv wdkplqohugh exoxqdelolu ex qhghqoh idunol vliuh wlsohulboh whvw jhuhnlu"],
  ["sezar_300", "Sezar", "300", "3", "nodvln vliuhohph brqwhpohul prghuq jxyhqoln lflq bhwhuvlc rovd gd bdsdb chnd prghoohulqlq rchoolnoh glo ruxqwx wdqlpd ehfhulohulql rofphn lflq vrq ghuhfh xbjxqgxu ex phwlq idunol dqdkwdu xcxqoxnodul yh idunol vliuhohph whnqlnohul nxoodqlodudn xuhwlohfhn phwlqohulq whpholql roxvwxupdnwdglu"],
  ["atbash_50", "Atbash", "50", "N/A", "tfevmorp zmzorarmwv bzkzb avpz sraoz tvorhri"],
  ["atbash_150", "Atbash", "150", "N/A", "bzkzb avpz nlwvoovir pozhrp hruivovnv gfiovirmr xlavipvm yzavm wltif yzavm rhv bzmorh gzsnrmoviwv yfofmzyrori yf mvwvmov uzipor hruiv grkovirbov gvhg tvivpri"],
  ["atbash_300", "Atbash", "300", "N/A", "pozhrp hruivovnv blmgvnovir nlwvim tfevmorp rxrm bvgvihra lohz wz bzkzb avpz nlwvoovirmrm lavoorpov wro lifmgf gzmrnz yvxvirovirmr loxnvp rxrm hlm wvivxv fbtfmwfi yf nvgrm uzipor zmzsgzi fafmofpozir ev uzipor hruivovnv gvpmrpovir pfoozmrozizp fivgrovxvp nvgrmovirm gvnvormr lofhgfinzpgzwri"],
  ["vigenere_50", "Vigenere", "50", "KEY", "qytorjso yxejsdgxhc ienkc xooy rmxve eopgcmp"],
  ["vigenere_150", "Vigenere", "150", "KEY", "ienkc xooy wsbopjovg upycmi cmdbijoqc dypvipsrg msxovior zkdcx hmqvs lexor gci wkrjsw rklksrjovbo fsvylkfgvmp ly lohcxpc pepupg cmdbi rstjovgipc diqd kcbiisv"],
  ["vigenere_300", "Vigenere", "300", "KEY", "upycmi cmdbijoqc isldikvips qmnipx ksfilvmi sggx ccdipcmx ypqk hy ienkc xooy wsbopjovgxml ydcvpgupc nmj yvsxxs delsqy liaovgvipsrg ypawii sggx wmx hcbiao ywqylnyp ly koxgx jybojs elklrkv sjylvyiveps zc pepupg cmdbijoqc diixmivips osvpyxmjkvyu ypoxgviaoo koxgxpcbml dikopgxm mvyqdypweidebsv"],
  ["playfair_50", "Playfair", "50", "KEYWORD", "neuysgfwdpchlxgqgdahvhovyehplxhcndflqlbt"],
  ["playfair_150", "Playfair", "150", "KEYWORD", "ahvhovyerpecoggobfofcpfwqlmfogknkutdgobfqglcuofrducbuougeldtcbuoqgnoahsglqvrfpgqgodawdzgeubclffbdxudgdsgkgbdoflqlgdkxfshkdhwgoukmznddkwfbt"],
  ["playfair_300", "Playfair", "300", "KEYWORD", "ofcpfwqlmfogknywesuksfkdfqeckdunvxduflwfblpekukdqlocszbahahvhauoyrskgdizgobfqgseuoizflofdglfkceuuvvrqgprdwdobfgobfqgcsrsyelbgqzcugkdoddeeheugedctnkugqhrfrfldphpvrdttvsgtehcbfuyhrfrflqlmfogknkuyeqgofkdfwzghcqghcdbetdkxfgodortkugqgobfmuknoggqlwgzmztdprrkbafb"],
  ["autokey_50", "Autokey", "50", "KEY", "qytkhgmx lvklvztvcm ldtyy oeiz lszsi fplowtz"],
  ["autokey_150", "Autokey", "150", "KEY", "ienyy oeiz qydqzoict ocictk kqpjmqvqp xgveyitrz kbhgfjie lemfn cstui hrtfn hwr gsrjif eizfiuxmeoi sxpvhlvvljz mc efxrroi slvplz ctnjm yztemgtccm rpwm kwkkozv"],
  ["autokey_300", "Autokey", "300", "KEY", "upyctk kqpjmqvqp carrszeidt qflqfq klikhgmx tksv amgcvlmq gtro os ydpyy oeiz qydqzoictrzv bhrzkmvwm ntp rzfbko gthbmn jqcfvkpvztrz wykapm ugsv uwa vsehgv yakoljoe eo dfnur yieplz kyihgay nzlhkoxwubt vv nvvplz ctnjmqvqp xqogmuymbt oltvuytlnzlk lronzpxkpo oiduremetr kmzxpurt wycgeojfubfanbr"],
  ["hill_50", "Hill", "50", "3,3;2,5", "aixku dconn hdvll dvauw terrq gvjvl hwegf kayqt"],
  ["hill_150", "Hill", "150", "3,3;2,5", "uwter rqgki zrtlt qxwlx cmcoa yortl wqrzh vtqxw lowwj sdgzv dcjsw pighe dcjsl ooeuw udacf mfwld tqixp nprvb dfftx xlyzu vaudb hzhlx acnpl cdaah lpsgt qrghb eglcc iqt"],
  ["hill_300", "Hill", "300", "3,3;2,5", "lxcmc oayor tlwqg ydprg rblpi yzrlp fetpz vfkci eshqr zlpay nqjij puqtx uqjse uaqva ozlpl dldnx tlfkl xvxft pjvbn ifmlo kypws yxwtq xwlox fqmqg ealds cwplp ssuem avbrc cnswr zldpk dgfkn nvjfm hefuu dmmhw xwxkp kdgfk ayort lwqrz qglol xlpco prhwl ohwzi mqlcd atqsy ocrzl dtqxw srwqt lldoi pshbh vkyjl jpxx"]
].map(([cipher, method, length, key, cipherText]) => ({
  cipher,
  method,
  length,
  key,
  cipherText,
  expected: baseTexts[length]
}));

const models = [
  { id: "google/gemini-3-pro-preview", label: "Gemini 3 Pro Preview", capability: 99, speed: 820, specialty: ["Hill", "Playfair", "Vigenere"], generation: "legacy", provider: "vercel" },
  { id: "google/gemini-3-flash", label: "Gemini 3 Flash", capability: 98, speed: 430, specialty: ["Sezar", "Atbash", "Vigenere"], generation: "legacy", provider: "vercel" },
  { id: "openai/gpt-5.1-thinking", label: "GPT-5.1 Thinking", capability: 58, speed: 610, specialty: ["Sezar"], generation: "legacy", provider: "vercel" },
  { id: "xai/grok-4-fast-reasoning", label: "Grok 4 Fast Reasoning", capability: 82, speed: 690, specialty: ["Sezar", "Atbash", "Vigenere"], generation: "legacy", provider: "vercel" },
  { id: "xai/grok-4.1-fast-reasoning", label: "Grok 4.1 Fast Reasoning", capability: 93, speed: 720, specialty: ["Sezar", "Atbash", "Vigenere", "Playfair"], generation: "legacy", provider: "vercel" },
  { id: "anthropic/claude-opus-4.5", label: "Claude Opus 4.5", capability: 72, speed: 760, specialty: ["Sezar", "Atbash"], generation: "legacy", provider: "vercel" },
  { id: "anthropic/claude-sonnet-4.5", label: "Claude Sonnet 4.5", capability: 55, speed: 540, specialty: ["Sezar"], generation: "legacy", provider: "vercel" },
  { id: "deepseek/deepseek-v3.1", label: "DeepSeek V3.1", capability: 48, speed: 520, specialty: ["Sezar"], generation: "legacy", provider: "vercel" },
  { id: "openai/gpt-5.5", label: "OpenAI GPT-5.5", capability: 99, speed: 980, specialty: ["Hill", "Playfair", "Autokey"], provider: "vercel", freeCredit: true },
  { id: "openai/gpt-5.3-codex", label: "OpenAI GPT-5.3 Codex", capability: 96, speed: 780, specialty: ["Vigenere", "Autokey", "Hill"], provider: "vercel", freeCredit: false },
  { id: "google/gemini-3.1-pro-preview", label: "Gemini 3.1 Pro Preview", capability: 97, speed: 840, specialty: ["Hill", "Playfair", "Vigenere"], provider: "vercel", freeCredit: false },
  { id: "google/gemini-3.1-flash-lite", label: "Gemini 3.1 Flash Lite", capability: 89, speed: 360, specialty: ["Sezar", "Atbash", "Vigenere"], provider: "vercel", freeCredit: true },
  { id: "anthropic/claude-opus-4.7", label: "Claude Opus 4.7", capability: 98, speed: 930, specialty: ["Hill", "Playfair", "Autokey"], provider: "vercel", freeCredit: false },
  { id: "anthropic/claude-sonnet-4.6", label: "Claude Sonnet 4.6", capability: 94, speed: 610, specialty: ["Playfair", "Vigenere", "Hill"], provider: "vercel", freeCredit: true },
  { id: "deepseek/deepseek-v4-flash", label: "DeepSeek V4 Flash", capability: 91, speed: 430, specialty: ["Sezar", "Atbash", "Vigenere"], provider: "vercel", freeCredit: true },
  { id: "deepseek/deepseek-v4-pro", label: "DeepSeek V4 Pro", capability: 94, speed: 690, specialty: ["Vigenere", "Playfair", "Hill"], provider: "vercel", freeCredit: true },
  { id: "xai/grok-4.3", label: "xAI Grok 4.3", capability: 94, speed: 690, specialty: ["Sezar", "Atbash", "Autokey"], provider: "vercel", freeCredit: true },
  { id: "xai/grok-4.20-reasoning", label: "xAI Grok 4.20 Reasoning", capability: 96, speed: 870, specialty: ["Hill", "Vigenere", "Playfair"], provider: "vercel", freeCredit: true },
  { id: "google/gemma-4-26b-a4b-it:free", label: "Gemma 4 26B A4B", capability: 83, speed: 380, specialty: ["Sezar", "Atbash", "Vigenere"], provider: "openrouter", free: true },
  { id: "nvidia/nemotron-3-super-120b-a12b:free", label: "Nemotron 3 Super 120B", capability: 92, speed: 650, specialty: ["Hill", "Playfair", "Vigenere"], provider: "openrouter", free: true },
  { id: "openai/gpt-oss-120b:free", label: "OpenAI GPT-OSS 120B", capability: 90, speed: 620, specialty: ["Vigenere", "Autokey", "Hill"], provider: "openrouter", free: true },
  { id: "openai/gpt-oss-20b:free", label: "OpenAI GPT-OSS 20B", capability: 84, speed: 430, specialty: ["Sezar", "Atbash", "Vigenere"], provider: "openrouter", free: true },
  { id: "qwen/qwen3-coder:free", label: "Qwen3 Coder 480B", capability: 91, speed: 610, specialty: ["Vigenere", "Autokey", "Hill"], provider: "openrouter", free: true },
  { id: "deepseek/deepseek-v4-flash:free", label: "DeepSeek V4 Flash", capability: 88, speed: 410, specialty: ["Sezar", "Atbash", "Vigenere"], provider: "openrouter", free: true },
  { id: "google/gemma-4-31b-it:free", label: "Gemma 4 31B", capability: 84, speed: 390, specialty: ["Sezar", "Atbash", "Playfair"], provider: "openrouter", free: true },
  { id: "arcee-ai/trinity-large-thinking:free", label: "Trinity Large Thinking", capability: 89, speed: 540, specialty: ["Playfair", "Vigenere", "Hill"], provider: "openrouter", free: true },
  { id: "minimax/minimax-m2.5:free", label: "MiniMax M2.5", capability: 87, speed: 460, specialty: ["Playfair", "Vigenere", "Autokey"], provider: "openrouter", free: true },
  { id: "meta-llama/llama-3.3-70b-instruct:free", label: "Llama 3.3 70B Instruct", capability: 86, speed: 470, specialty: ["Sezar", "Atbash", "Vigenere"], provider: "openrouter", free: true }
];

const knownResults = [
  { model: "Gemini 3 Pro Preview", modelId: "google/gemini-3-pro-preview", charScore: 99.87, tests: 15, full: 15, partial: 0, failed: 0, source: "known" },
  { model: "Gemini 3 Flash Preview", modelId: "google/gemini-3-flash", charScore: 99.67, tests: 15, full: 15, partial: 0, failed: 0, source: "known" },
  { model: "Grok 4.1 Fast Reasoning", modelId: "xai/grok-4.1-fast-reasoning", charScore: 91.57, tests: 15, full: 12, partial: 2, failed: 1, source: "known" },
  { model: "Grok 4 Fast Reasoning", modelId: "xai/grok-4-fast-reasoning", charScore: 76.53, tests: 15, full: 10, partial: 1, failed: 4, source: "known" },
  { model: "Claude Opus 4.5", modelId: "anthropic/claude-opus-4.5", charScore: 36.93, tests: 15, full: 6, partial: 2, failed: 7, source: "known" },
  { model: "Claude Sonnet 4.5", modelId: "anthropic/claude-sonnet-4.5", charScore: 27.8, tests: 15, full: 2, partial: 2, failed: 11, source: "known" },
  { model: "DeepSeek V3.1", modelId: "deepseek/deepseek-v3.1", charScore: 20.4, tests: 15, full: 0, partial: 3, failed: 12, source: "known" },
  { model: "GPT-5.1 Thinking", modelId: "openai/gpt-5.1-thinking", charScore: 18, tests: 15, full: 0, partial: 3, failed: 12, source: "known" },
];

const methodFilter = document.querySelector("#methodFilter");
const lengthFilter = document.querySelector("#lengthFilter");
const resultRows = document.querySelector("#resultRows");
const newResultRows = document.querySelector("#newResultRows");
const compareRows = document.querySelector("#compareRows");
const datasetRows = document.querySelector("#datasetRows");
const viewTitle = document.querySelector("#viewTitle");
const modelSelect = document.querySelector("#modelSelect");
const simMethod = document.querySelector("#simMethod");
const simLength = document.querySelector("#simLength");
const scenarioSelect = document.querySelector("#scenarioSelect");
const simForm = document.querySelector("#simForm");
const runAllTestsButton = document.querySelector("#runAllTests");
const retryFailedTestsButton = document.querySelector("#retryFailedTests");
const batchStatus = document.querySelector("#batchStatus");
const exportCsvButton = document.querySelector("#exportCsv");
const exportJsonButton = document.querySelector("#exportJson");
const clearSavedResultsButton = document.querySelector("#clearSavedResults");
const languageSelect = document.querySelector("#languageSelect");
const testModeButtons = document.querySelectorAll(".mode-button");
const providerSwitch = document.querySelector("#providerSwitch");
const providerModeButtons = document.querySelectorAll(".provider-button");
const apiKeyForm = document.querySelector("#apiKeyForm");
const apiKeyInput = document.querySelector("#apiKeyInput");
const openRouterApiKeyInput = document.querySelector("#openRouterApiKeyInput");
const apiKeyStatus = document.querySelector("#apiKeyStatus");
const openRouterApiKeyStatus = document.querySelector("#openRouterApiKeyStatus");
const toggleApiKey = document.querySelector("#toggleApiKey");
const toggleOpenRouterApiKey = document.querySelector("#toggleOpenRouterApiKey");
const clearApiKey = document.querySelector("#clearApiKey");
const clearOpenRouterApiKey = document.querySelector("#clearOpenRouterApiKey");
const purposeAcknowledge = document.querySelector("#purposeAcknowledge");
const purposeContinue = document.querySelector("#purposeContinue");
const purposeTryGpt55 = document.querySelector("#purposeTryGpt55");
const purposeStatus = document.querySelector("#purposeStatus");

const translations = {
  tr: {
    pageTitle: "Şifre Modeli Test Laboratuvarı",
    projectSummary: "Proje özeti",
    tasks: "Test",
    methods: "Yöntem",
    knownMarker: "bilinen",
    freeCreditMarker: "ücretsiz kredi çalışıyor",
    notFreeCreditMarker: "ücretsiz kredi olmayabilir",
    newCipherMarker: "yeni, özgün projede sonuç yok",
    ready: "Hazır",
    dashboardViews: "Panel görünümleri",
    tabPurpose: "Proje Amacı",
    tabSimulate: "Test Et",
    tabResults: "Bilinen Sonuçlar",
    tabNewResults: "Yeni Testler",
    tabCompare: "Karşılaştırma",
    tabDataset: "Veri Seti",
    tabApiKey: "API Anahtarı",
    filters: "Filtreler",
    language: "Dil",
    method: "Yöntem",
    length: "Uzunluk",
    allMethods: "Tüm yöntemler",
    allLengths: "Tüm uzunluklar",
    testModel: "Test modeli",
    cipherMethod: "Şifre yöntemi",
    textLength: "Metin uzunluğu",
    testScenario: "Senaryo",
    scenarioGuided: "Şifre türü + anahtar biliniyor",
    scenarioBlind: "Şifre türü + anahtar bilinmiyor",
    knownModels: "Bilinen Modeller",
    newModels: "Yeni Modeller",
    providerVercel: "Vercel",
    providerOpenRouter: "OpenRouter Ücretsiz",
    modelAvailabilityNote: "Vercel sekmesinde ücretsiz krediyle çalışan modeller etiketlenmiştir. OpenRouter modelleri ayrı ücretsiz varyantlardır.",
    knownResultsNote: "Özgün proje sonuçları: 5 şifre yöntemi, 3 metin uzunluğu, Hill hariç 15 test.",
    rank: "Sıra",
    averageScore: "Ortalama",
    solved: "Tam",
    partial: "Kısmi",
    failedShort: "Hata",
    testSet: "Test seti",
    originalKnownSet: "Özgün bilinen set",
    noHillInKnown: "Hill sonucu yok",
    apiKeyEyebrow: "API sağlayıcıları",
    apiKeyTitle: "API anahtarı",
    apiKeyHelp: "Vercel ve OpenRouter anahtarlarını buraya yapıştır. Anahtarlar yalnızca bu tarayıcıda kaydedilir ve gerçek API testlerinde yerel test sunucusuna gönderilir.",
    apiKeyLabel: "Vercel API anahtarı",
    openRouterApiKeyLabel: "OpenRouter API anahtarı",
    saveApiKey: "Anahtarı Kaydet",
    showApiKey: "Göster",
    hideApiKey: "Gizle",
    showVercelApiKey: "Vercel'i Göster",
    hideVercelApiKey: "Vercel'i Gizle",
    showOpenRouterApiKey: "OpenRouter'ı Göster",
    hideOpenRouterApiKey: "OpenRouter'ı Gizle",
    clearApiKey: "Temizle",
    apiKeySaved: "Vercel API anahtarı bu tarayıcıda kayıtlı.",
    apiKeyNotSaved: "Kayıtlı Vercel anahtarı yok.",
    openRouterApiKeySaved: "OpenRouter API anahtarı bu tarayıcıda kayıtlı.",
    openRouterApiKeyNotSaved: "Kayıtlı OpenRouter anahtarı yok.",
    runTest: "Testi Çalıştır",
    runAllTests: "Model İçin Hepsini Çalıştır",
    retryFailedTests: "Sadece Hatalıları Tekrar Dene",
    batchIdle: "Seçili model için uygun tüm şifre testlerini çalıştırır.",
    batchRunning: "Toplu test çalışıyor",
    batchComplete: "Toplu test tamamlandı",
    exportCsv: "CSV Dışa Aktar",
    exportJson: "JSON Dışa Aktar",
    clearSavedResults: "Kayıtlı Sonuçları Temizle",
    noExportRows: "Dışa aktarılacak yeni sonuç yok.",
    savedResultsLoaded: "Kayıtlı sonuçlar yüklendi.",
    savedResultsCleared: "Kayıtlı sonuçlar temizlendi.",
    failedRetryReady: "Hatalı testler tekrar denenebilir.",
    cipherBreakdown: "Şifre kırılımı",
    noRun: "Henüz test çalışmadı",
    model: "Model",
    cipher: "Şifre",
    latency: "Süre",
    status: "Durum",
    evaluator: "Hakem",
    ciphertext: "Şifreli Metin",
    chooseSettings: "Ayarları seçip testi çalıştır.",
    modelOutput: "Model Çıktısı",
    modelOutputEmpty: "Seçilen modelin çıktısı burada görünecek.",
    expectedPlaintext: "Beklenen Düz Metin",
    expectedEmpty: "Her çalışmadan sonra doğru cevap burada gösterilir.",
    evaluationReasoning: "GPT-5.4 Nano Değerlendirmesi",
    evaluationEmpty: "Değerlendirme sonucu burada görünecek.",
    key: "Anahtar",
    codeSafety: "Güvenlik",
    codeMetrics: "Metrikler",
    codeRunner: "Çalıştırıcı",
    titleSimulate: "Test Konsolu",
    titlePurpose: "Proje Amacı",
    titleResults: "Bilinen Sonuçlar",
    titleNewResults: "Yeni Testler",
    titleCompare: "Karşılaştırma",
    titleDataset: "Şifre Veri Seti",
    titleApiKey: "API Anahtarı",
    chars: "karakter",
    chartLabel: "Karakter benzerliği (%)",
    callingApi: "API çağrılıyor...",
    sourceApi: "API",
    sourceOpenRouter: "OpenRouter API",
    apiFailed: "API çağrısı başarısız",
    error: "Hata",
    checkKey: "API anahtarını veya kredileri kontrol et",
    fullSolve: "Tam çözüm",
    partialSolve: "Kısmi çözüm",
    failed: "Başarısız",
    apiRequestFailed: "API isteği başarısız."
    ,
    compareIntro: "Özgün proje sonuçları ile bu oturumda gerçek API ile çalıştırılan yeni sonuçlar karşılaştırılır.",
    compareOldGroup: "Eski bilinen sonuçlar",
    compareNewGroup: "Yeni test sonuçları",
    compareBestOld: "En iyi eski model",
    compareBestNew: "En iyi yeni model",
    compareAverageDelta: "Ortalama fark",
    compareCoverage: "Kapsam",
    compareNoNew: "Henüz yeni sonuç yok. Test Konsolu'nda bir model çalıştırınca burası ayrıntılı karşılaştırmayı gösterecek.",
    compareModel: "Model karşılaştırması",
    compareCases: "Vaka",
    compareBestCase: "En iyi vaka",
    compareWeakCase: "En zayıf vaka",
    compareProvider: "Sağlayıcı",
    compareScenario: "Senaryo",
    compareKnownBaseline: "Bilinen temel",
    compareLiveAverage: "Canlı ortalama",
    compareMethodsCovered: "Yöntemler",
    compareLengthsCovered: "Uzunluklar",
    aiComparisonTitle: "AI yorumu",
    aiComparisonEmpty: "OpenRouter ücretsiz modeliyle kısa bir yorum üretmek için düğmeye bas.",
    generateAiComparison: "AI Yorumu Üret",
    generatingAiComparison: "AI yorumu üretiliyor...",
    aiComparisonModel: "Yorum modeli",
    aiComparisonFailed: "AI yorumu oluşturulamadı.",
    purposeEyebrow: "Ana çalışma",
    purposeTitle: "Yapay zeka modellerinin klasik şifreleri çözme başarısını ölçmek",
    purposeIntro: "Bu proje, güncel büyük dil modellerinin klasik şifreleme sistemlerinden Türkçe düz metni ne kadar doğru geri kazanabildiğini inceler. Çalışma; şifre türü, metin uzunluğu, anahtar görünürlüğü ve model ailesi değiştikçe doğruluğu karşılaştırır.",
    purposeQuestionLabel: "Araştırma sorusu",
    purposeQuestion: "Modern yapay zeka modelleri klasik şifreleri güvenilir biçimde çözebilir mi; şifre yöntemi, anahtar veya metin uzunluğu değiştiğinde nerede hata yaparlar?",
    purposeStudyLabel: "Özgün çalışma",
    purposeStudy: "Özgün çalışma, Caesar, Atbash, Vigenere, Playfair ve Autokey sonuçlarını karşılaştırmak için sabit şifre veri setleri ve bilinen model çıktıları kullanır. Hill şifresi bu web sitesinde yeni bir genişletme olarak eklenmiştir.",
    purposeWebsiteLabel: "Web sitesinin rolü",
    purposeWebsite: "Bu web sitesi çalışmayı canlı bir laboratuvara dönüştürür. Yeni modelleri API çağrılarıyla çalıştırabilir, taze sonuçları saklayabilir, özgün temel sonuçlarla karşılaştırabilir ve şifre türü ile anahtarın gizlendiği daha zor senaryoları test edebilir.",
    purposeDevelopmentLabel: "Projeyi nasıl geliştirir",
    purposeDevelopment: "Tekrarlanabilir testler, model ailesi karşılaştırmaları, dışa aktarılabilir sonuçlar ve çok dilli açıklamalar sayesinde web sitesi projeyi statik bir rapordan sürekli güncellenebilen bir ölçüte taşır.",
    purposeCheckLabel: "Proje amacını okudum ve web sitesinin neyi test ettiğini anladım.",
    purposeLocked: "Diğer sekmeleri açmak için bu sayfayı bir kez onayla.",
    purposeUnlocked: "Diğer sekmeler açıldı.",
    purposeContinue: "Test Konsoluna Geç",
    purposeRequired: "Devam etmek için önce proje amacını onayla.",
    purposeFlowLabel: "Web sitesi nasıl çalışır",
    purposeFlowTitle: "Şifreli metinden ölçüt sonucuna",
    purposeFlowIntro: "Bir test, veri setinden bir şifreli satır seçer, seçilen API sağlayıcısı üzerinden modeli çağırır, modelden düz metni geri kazanmasını ister ve ardından cevabı değerlendirme için GPT-5.4 Nano'ya gönderir.",
    purposeStep1Title: "Model seç",
    purposeStep1Text: "ChatGPT 5.5 gibi bir Vercel veya OpenRouter modeli seçilir.",
    purposeStep2Title: "Şifre testini seç",
    purposeStep2Text: "Şifre türü, metin uzunluğu ve modelin anahtarı görüp görmeyeceği belirlenir.",
    purposeStep3Title: "API çağrısını çalıştır",
    purposeStep3Text: "Web sitesi promptu modele gönderir ve model çıktısını kaydeder.",
    purposeStep4Title: "Değerlendir ve karşılaştır",
    purposeStep4Text: "GPT-5.4 Nano çıktıyı puanlar; sonuç Yeni Testler ve Karşılaştırma sekmelerinde görünür.",
    purposeTryGpt55: "ChatGPT 5.5 Testi Dene",
    purposeGpt55Ready: "ChatGPT 5.5 için Atbash 50 testi hazır. Testi Çalıştır düğmesine bas."
  },
  en: {
    pageTitle: "Cipher Model Test Lab",
    projectSummary: "Project summary",
    tasks: "Tasks",
    methods: "Methods",
    knownMarker: "known",
    freeCreditMarker: "free credits work",
    notFreeCreditMarker: "free credits may not work",
    newCipherMarker: "new, no original project result",
    ready: "Ready",
    dashboardViews: "Dashboard views",
    tabPurpose: "Project Purpose",
    tabSimulate: "Run Test",
    tabResults: "Known Results",
    tabNewResults: "New Tests",
    tabCompare: "Comparison",
    tabDataset: "Dataset",
    tabApiKey: "API Key",
    filters: "Filters",
    language: "Language",
    method: "Method",
    length: "Length",
    allMethods: "All methods",
    allLengths: "All lengths",
    testModel: "Test model",
    cipherMethod: "Cipher method",
    textLength: "Text length",
    testScenario: "Scenario",
    scenarioGuided: "Known cipher + key",
    scenarioBlind: "Unknown cipher + key",
    knownModels: "Known Models",
    newModels: "New Models",
    providerVercel: "Vercel",
    providerOpenRouter: "OpenRouter Free",
    modelAvailabilityNote: "The Vercel tab labels which models currently work with free credits. OpenRouter models are separate free variants.",
    knownResultsNote: "Original project results: 5 cipher methods, 3 text lengths, 15 tests excluding Hill.",
    rank: "Rank",
    averageScore: "Average",
    solved: "Full",
    partial: "Partial",
    failedShort: "Failed",
    testSet: "Test set",
    originalKnownSet: "Original known set",
    noHillInKnown: "No Hill result",
    apiKeyEyebrow: "API providers",
    apiKeyTitle: "API key",
    apiKeyHelp: "Paste your Vercel and OpenRouter keys here. They are saved in this browser only and sent to the local test server when you run actual API tests.",
    apiKeyLabel: "Vercel API key",
    openRouterApiKeyLabel: "OpenRouter API key",
    saveApiKey: "Save Key",
    showApiKey: "Show",
    hideApiKey: "Hide",
    showVercelApiKey: "Show Vercel",
    hideVercelApiKey: "Hide Vercel",
    showOpenRouterApiKey: "Show OpenRouter",
    hideOpenRouterApiKey: "Hide OpenRouter",
    clearApiKey: "Clear",
    apiKeySaved: "Vercel API key is saved in this browser.",
    apiKeyNotSaved: "No Vercel key saved.",
    openRouterApiKeySaved: "OpenRouter API key is saved in this browser.",
    openRouterApiKeyNotSaved: "No OpenRouter key saved.",
    runTest: "Run Test",
    runAllTests: "Run All For Model",
    retryFailedTests: "Retry Failed Only",
    batchIdle: "Runs every available cipher test for the selected model.",
    batchRunning: "Running batch",
    batchComplete: "Batch complete",
    exportCsv: "Export CSV",
    exportJson: "Export JSON",
    clearSavedResults: "Clear Saved Results",
    noExportRows: "No new results to export.",
    savedResultsLoaded: "Saved results loaded.",
    savedResultsCleared: "Saved results cleared.",
    failedRetryReady: "Failed tests are ready to retry.",
    cipherBreakdown: "Cipher breakdown",
    noRun: "No test has run yet",
    model: "Model",
    cipher: "Cipher",
    latency: "Latency",
    status: "Status",
    evaluator: "Evaluator",
    ciphertext: "Ciphertext",
    chooseSettings: "Choose settings and run the test.",
    modelOutput: "Model Output",
    modelOutputEmpty: "The selected model output will appear here.",
    expectedPlaintext: "Expected Plaintext",
    expectedEmpty: "The answer key appears after each run.",
    evaluationReasoning: "GPT-5.4 Nano Evaluation",
    evaluationEmpty: "The evaluation result will appear here.",
    key: "Key",
    codeSafety: "Safety",
    codeMetrics: "Metrics",
    codeRunner: "Runner",
    titleSimulate: "Test Console",
    titlePurpose: "Project Purpose",
    titleResults: "Known Results",
    titleNewResults: "New Tests",
    titleCompare: "Comparison",
    titleDataset: "Cipher Dataset",
    titleApiKey: "API Key",
    chars: "chars",
    chartLabel: "Character similarity (%)",
    callingApi: "Calling API...",
    sourceApi: "API",
    sourceOpenRouter: "OpenRouter API",
    apiFailed: "API call failed",
    error: "Error",
    checkKey: "Check API key or credits",
    fullSolve: "Full solve",
    partialSolve: "Partial solve",
    failed: "Failed",
    apiRequestFailed: "API request failed.",
    compareIntro: "Compares the original project results with the new real-API results from this session.",
    compareOldGroup: "Old known results",
    compareNewGroup: "New test results",
    compareBestOld: "Best old model",
    compareBestNew: "Best new model",
    compareAverageDelta: "Average delta",
    compareCoverage: "Coverage",
    compareNoNew: "No new results yet. Run a model in the Test Console and this view will show a detailed comparison.",
    compareModel: "Model comparison",
    compareCases: "Cases",
    compareBestCase: "Best case",
    compareWeakCase: "Weakest case",
    compareProvider: "Provider",
    compareScenario: "Scenario",
    compareKnownBaseline: "Known baseline",
    compareLiveAverage: "Live average",
    compareMethodsCovered: "Methods",
    compareLengthsCovered: "Lengths",
    aiComparisonTitle: "AI explanation",
    aiComparisonEmpty: "Press the button to generate a short explanation with a free OpenRouter model.",
    generateAiComparison: "Generate AI Explanation",
    generatingAiComparison: "Generating AI explanation...",
    aiComparisonModel: "Explanation model",
    aiComparisonFailed: "Could not generate AI explanation.",
    purposeEyebrow: "Main study",
    purposeTitle: "Measuring how AI models solve classical ciphers",
    purposeIntro: "This project investigates how well current large language models can recover Turkish plaintext from classical cipher systems. The study compares model accuracy across cipher type, text length, key visibility, and model family.",
    purposeQuestionLabel: "Research question",
    purposeQuestion: "Can modern AI models solve classical ciphers reliably, and where do they fail when the cipher method, key, or text length changes?",
    purposeStudyLabel: "Original study",
    purposeStudy: "The original work uses fixed cipher datasets and known model outputs to compare Caesar, Atbash, Vigenere, Playfair, and Autokey results. Hill cipher tests are added as a new extension in this website.",
    purposeWebsiteLabel: "Website role",
    purposeWebsite: "This website turns the study into a live laboratory. It can run newer models through API calls, save fresh results, compare them with the original baseline, and test harder scenarios where the cipher type and key are hidden.",
    purposeDevelopmentLabel: "How it develops the project",
    purposeDevelopment: "By adding repeatable tests, model-family comparisons, exportable results, and multilingual explanations, the website helps the project move from a static report toward a continuously updatable benchmark.",
    purposeCheckLabel: "I read the project purpose and understand what the website is testing.",
    purposeLocked: "Confirm this page once to unlock the other tabs.",
    purposeUnlocked: "Other tabs are unlocked.",
    purposeContinue: "Continue to Test Console",
    purposeRequired: "Confirm the project purpose before continuing.",
    purposeFlowLabel: "How the website works",
    purposeFlowTitle: "From cipher text to benchmark result",
    purposeFlowIntro: "A test selects one encrypted dataset row, sends it to the chosen model through the selected API provider, asks the model to recover the plaintext, then sends the answer to GPT-5.4 Nano for evaluation.",
    purposeStep1Title: "Choose a model",
    purposeStep1Text: "Pick a Vercel or OpenRouter model, such as ChatGPT 5.5.",
    purposeStep2Title: "Choose a cipher test",
    purposeStep2Text: "Select cipher type, text length, and whether the model sees the key.",
    purposeStep3Title: "Run the API call",
    purposeStep3Text: "The website sends the prompt to the model and records the model output.",
    purposeStep4Title: "Evaluate and compare",
    purposeStep4Text: "GPT-5.4 Nano scores the output, then the result appears in New Tests and Comparison.",
    purposeTryGpt55: "Try a ChatGPT 5.5 Test",
    purposeGpt55Ready: "ChatGPT 5.5 is set up with the Atbash 50 test. Press Run Test."
  },
  de: {
    pageTitle: "Chiffrenmodell-Testlabor",
    projectSummary: "Projektübersicht",
    tasks: "Tests",
    methods: "Methoden",
    knownMarker: "bekannt",
    freeCreditMarker: "Gratisguthaben funktioniert",
    notFreeCreditMarker: "Gratisguthaben evtl. nicht",
    newCipherMarker: "neu, kein Original-Projektergebnis",
    ready: "Bereit",
    dashboardViews: "Dashboard-Ansichten",
    tabPurpose: "Projektzweck",
    tabSimulate: "Testen",
    tabResults: "Bekannte Ergebnisse",
    tabNewResults: "Neue Tests",
    tabCompare: "Vergleich",
    tabDataset: "Datensatz",
    tabApiKey: "API-Schlüssel",
    filters: "Filter",
    language: "Sprache",
    method: "Methode",
    length: "Länge",
    allMethods: "Alle Methoden",
    allLengths: "Alle Längen",
    testModel: "Testmodell",
    cipherMethod: "Chiffrenmethode",
    textLength: "Textlänge",
    testScenario: "Szenario",
    scenarioGuided: "Chiffre + Schlüssel bekannt",
    scenarioBlind: "Chiffre + Schlüssel unbekannt",
    knownModels: "Bekannte Modelle",
    newModels: "Neue Modelle",
    providerVercel: "Vercel",
    providerOpenRouter: "OpenRouter Kostenlos",
    modelAvailabilityNote: "Der Vercel-Tab markiert, welche Modelle derzeit mit Gratisguthaben funktionieren. OpenRouter-Modelle sind separate kostenlose Varianten.",
    knownResultsNote: "Originale Projektergebnisse: 5 Chiffrenmethoden, 3 Textlängen, 15 Tests ohne Hill.",
    rank: "Rang",
    averageScore: "Durchschnitt",
    solved: "Voll",
    partial: "Teilweise",
    failedShort: "Fehler",
    testSet: "Testreihe",
    originalKnownSet: "Originaler bekannter Satz",
    noHillInKnown: "Kein Hill-Ergebnis",
    apiKeyEyebrow: "API-Anbieter",
    apiKeyTitle: "API-Schlüssel",
    apiKeyHelp: "Füge hier deine Vercel- und OpenRouter-Schlüssel ein. Sie werden nur in diesem Browser gespeichert und bei echten API-Tests an den lokalen Testserver gesendet.",
    apiKeyLabel: "Vercel-API-Schlüssel",
    openRouterApiKeyLabel: "OpenRouter-API-Schlüssel",
    saveApiKey: "Schlüssel speichern",
    showApiKey: "Anzeigen",
    hideApiKey: "Verbergen",
    showVercelApiKey: "Vercel anzeigen",
    hideVercelApiKey: "Vercel verbergen",
    showOpenRouterApiKey: "OpenRouter anzeigen",
    hideOpenRouterApiKey: "OpenRouter verbergen",
    clearApiKey: "Löschen",
    apiKeySaved: "Vercel-API-Schlüssel ist in diesem Browser gespeichert.",
    apiKeyNotSaved: "Kein Vercel-Schlüssel gespeichert.",
    openRouterApiKeySaved: "OpenRouter-API-Schlüssel ist in diesem Browser gespeichert.",
    openRouterApiKeyNotSaved: "Kein OpenRouter-Schlüssel gespeichert.",
    runTest: "Test starten",
    runAllTests: "Alle für Modell starten",
    retryFailedTests: "Nur Fehler erneut",
    batchIdle: "Führt alle verfügbaren Chiffren-Tests für das ausgewählte Modell aus.",
    batchRunning: "Batch läuft",
    batchComplete: "Batch abgeschlossen",
    exportCsv: "CSV exportieren",
    exportJson: "JSON exportieren",
    clearSavedResults: "Gespeicherte Ergebnisse löschen",
    noExportRows: "Keine neuen Ergebnisse zum Exportieren.",
    savedResultsLoaded: "Gespeicherte Ergebnisse geladen.",
    savedResultsCleared: "Gespeicherte Ergebnisse gelöscht.",
    failedRetryReady: "Fehlgeschlagene Tests können erneut versucht werden.",
    cipherBreakdown: "Chiffrenaufschlüsselung",
    noRun: "Noch kein Test ausgeführt",
    model: "Modell",
    cipher: "Chiffre",
    latency: "Latenz",
    status: "Status",
    evaluator: "Bewerter",
    ciphertext: "Geheimtext",
    chooseSettings: "Einstellungen wählen und Test starten.",
    modelOutput: "Modellausgabe",
    modelOutputEmpty: "Die Ausgabe des ausgewählten Modells erscheint hier.",
    expectedPlaintext: "Erwarteter Klartext",
    expectedEmpty: "Der Lösungstext erscheint nach jedem Lauf.",
    evaluationReasoning: "GPT-5.4-Nano-Bewertung",
    evaluationEmpty: "Das Bewertungsergebnis erscheint hier.",
    key: "Schlüssel",
    codeSafety: "Sicherheit",
    codeMetrics: "Metriken",
    codeRunner: "Runner",
    titleSimulate: "Testkonsole",
    titlePurpose: "Projektzweck",
    titleResults: "Bekannte Ergebnisse",
    titleNewResults: "Neue Tests",
    titleCompare: "Vergleich",
    titleDataset: "Chiffren-Datensatz",
    titleApiKey: "API-Schlüssel",
    chars: "Zeichen",
    chartLabel: "Zeichenähnlichkeit (%)",
    callingApi: "API wird aufgerufen...",
    sourceApi: "API",
    sourceOpenRouter: "OpenRouter-API",
    apiFailed: "API-Aufruf fehlgeschlagen",
    error: "Fehler",
    checkKey: "API-Schlüssel oder Guthaben prüfen",
    fullSolve: "Vollständig gelöst",
    partialSolve: "Teilweise gelöst",
    failed: "Fehlgeschlagen",
    apiRequestFailed: "API-Anfrage fehlgeschlagen.",
    compareIntro: "Vergleicht die ursprünglichen Projektergebnisse mit den neuen echten API-Ergebnissen dieser Sitzung.",
    compareOldGroup: "Alte bekannte Ergebnisse",
    compareNewGroup: "Neue Testergebnisse",
    compareBestOld: "Bestes altes Modell",
    compareBestNew: "Bestes neues Modell",
    compareAverageDelta: "Durchschnittsdifferenz",
    compareCoverage: "Abdeckung",
    compareNoNew: "Noch keine neuen Ergebnisse. Starte ein Modell in der Testkonsole, dann zeigt diese Ansicht einen detaillierten Vergleich.",
    compareModel: "Modellvergleich",
    compareCases: "Fälle",
    compareBestCase: "Bester Fall",
    compareWeakCase: "Schwächster Fall",
    compareProvider: "Anbieter",
    compareScenario: "Szenario",
    compareKnownBaseline: "Bekannte Basis",
    compareLiveAverage: "Live-Durchschnitt",
    compareMethodsCovered: "Methoden",
    compareLengthsCovered: "Längen",
    aiComparisonTitle: "AI-Erklärung",
    aiComparisonEmpty: "Drücke die Schaltfläche, um mit einem kostenlosen OpenRouter-Modell eine kurze Erklärung zu erstellen.",
    generateAiComparison: "AI-Erklärung erstellen",
    generatingAiComparison: "AI-Erklärung wird erstellt...",
    aiComparisonModel: "Erklärungsmodell",
    aiComparisonFailed: "AI-Erklärung konnte nicht erstellt werden.",
    purposeEyebrow: "Hauptstudie",
    purposeTitle: "Messen, wie KI-Modelle klassische Chiffren lösen",
    purposeIntro: "Dieses Projekt untersucht, wie gut aktuelle große Sprachmodelle türkischen Klartext aus klassischen Chiffriersystemen wiederherstellen können. Die Studie vergleicht die Modellgenauigkeit nach Chiffrenart, Textlänge, Schlüssel-Sichtbarkeit und Modellfamilie.",
    purposeQuestionLabel: "Forschungsfrage",
    purposeQuestion: "Können moderne KI-Modelle klassische Chiffren zuverlässig lösen, und wo scheitern sie, wenn sich Chiffrenmethode, Schlüssel oder Textlänge ändern?",
    purposeStudyLabel: "Originalstudie",
    purposeStudy: "Die ursprüngliche Arbeit nutzt feste Chiffren-Datensätze und bekannte Modellausgaben, um Caesar, Atbash, Vigenere, Playfair und Autokey zu vergleichen. Hill-Chiffren werden auf dieser Website als neue Erweiterung ergänzt.",
    purposeWebsiteLabel: "Rolle der Website",
    purposeWebsite: "Diese Website macht aus der Studie ein Live-Labor. Sie kann neuere Modelle per API testen, neue Ergebnisse speichern, sie mit der ursprünglichen Basislinie vergleichen und schwierigere Szenarien prüfen, in denen Chiffrenart und Schlüssel verborgen sind.",
    purposeDevelopmentLabel: "Wie sie das Projekt entwickelt",
    purposeDevelopment: "Durch wiederholbare Tests, Modellfamilien-Vergleiche, exportierbare Ergebnisse und mehrsprachige Erklärungen entwickelt die Website das Projekt von einem statischen Bericht zu einem laufend aktualisierbaren Benchmark weiter.",
    purposeCheckLabel: "Ich habe den Projektzweck gelesen und verstehe, was die Website testet.",
    purposeLocked: "Bestätige diese Seite einmal, um die anderen Tabs freizuschalten.",
    purposeUnlocked: "Die anderen Tabs sind freigeschaltet.",
    purposeContinue: "Zur Testkonsole",
    purposeRequired: "Bestätige zuerst den Projektzweck.",
    purposeFlowLabel: "So funktioniert die Website",
    purposeFlowTitle: "Vom Geheimtext zum Benchmark-Ergebnis",
    purposeFlowIntro: "Ein Test wählt eine verschlüsselte Datensatzzeile, sendet sie über den ausgewählten API-Anbieter an das Modell, fordert den Klartext an und schickt die Antwort danach zur Bewertung an GPT-5.4 Nano.",
    purposeStep1Title: "Modell wählen",
    purposeStep1Text: "Wähle ein Vercel- oder OpenRouter-Modell, zum Beispiel ChatGPT 5.5.",
    purposeStep2Title: "Chiffren-Test wählen",
    purposeStep2Text: "Wähle Chiffrenart, Textlänge und ob das Modell den Schlüssel sieht.",
    purposeStep3Title: "API-Aufruf starten",
    purposeStep3Text: "Die Website sendet den Prompt an das Modell und speichert die Modellausgabe.",
    purposeStep4Title: "Bewerten und vergleichen",
    purposeStep4Text: "GPT-5.4 Nano bewertet die Ausgabe; das Ergebnis erscheint unter Neue Tests und Vergleich.",
    purposeTryGpt55: "ChatGPT-5.5-Test ausprobieren",
    purposeGpt55Ready: "ChatGPT 5.5 ist mit dem Atbash-50-Test vorbereitet. Drücke Test starten."
  }
};

const viewTitleKeys = {
  purpose: "titlePurpose",
  simulate: "titleSimulate",
  results: "titleResults",
  newResults: "titleNewResults",
  compare: "titleCompare",
  dataset: "titleDataset",
  apiKey: "titleApiKey",
};

let currentLang = "en";
let currentTestMode = "new";
let currentNewProvider = "vercel";
let comparisonExplanation = "";
let comparisonExplanationStatus = "empty";
let comparisonExplanationModel = "";
const API_KEY_STORAGE_KEY = "cipherLabVercelApiKey";
const OPENROUTER_API_KEY_STORAGE_KEY = "cipherLabOpenRouterApiKey";
const TEST_RESULTS_STORAGE_KEY = "cipherLabTestedRows";
const PURPOSE_ACK_STORAGE_KEY = "cipherLabPurposeAcknowledged";
let purposeAcknowledged = localStorage.getItem(PURPOSE_ACK_STORAGE_KEY) === "true";

function t(key) {
  return translations[currentLang][key] || translations.tr[key] || key;
}

let testedRows = [];
let failedBatchRows = [];

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function compact(text) {
  return normalize(text).replace(/[^a-z0-9]/g, "");
}

function scoreText(expected, actual) {
  const a = compact(expected);
  const b = compact(actual);
  const maxLength = Math.max(a.length, b.length) || 1;
  let matches = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
    if (a[i] === b[i]) matches += 1;
  }
  return Math.max(0, Math.round((matches / maxLength) * 10000) / 100);
}

function unique(key) {
  return [...new Set(dataset.map((row) => row[key]))].sort((a, b) => Number(a) - Number(b) || a.localeCompare(b));
}

function fillSelect(select, values, labeler = (value) => value) {
  select.innerHTML = "";
  values.forEach((value) => select.add(new Option(labeler(value), value)));
}

function modelLabel(model) {
  if (model.generation === "legacy") return `${model.label} (${t("knownMarker")})`;
  if ((model.provider || "vercel") === "vercel") {
    return `${model.label} (${model.freeCredit ? t("freeCreditMarker") : t("notFreeCreditMarker")})`;
  }
  return model.label;
}

function methodLabel(method) {
  return method === "Sezar" ? "Sezar / Caesar" : method;
}

function availableModels() {
  return models.filter((model) => {
    if (currentTestMode === "known") return model.generation === "legacy";
    return model.generation !== "legacy" && (model.provider || "vercel") === currentNewProvider;
  });
}

function availableTestMethods() {
  const methods = unique("method");
  return currentTestMode === "known" ? methods.filter((method) => method !== "Hill") : methods;
}

function fillControls() {
  methodFilter.innerHTML = "";
  methodFilter.add(new Option(t("allMethods"), "all"));
  lengthFilter.innerHTML = "";
  lengthFilter.add(new Option(t("allLengths"), "all"));
  unique("method").forEach((method) => methodFilter.add(new Option(methodLabel(method), method)));
  unique("length").forEach((length) => lengthFilter.add(new Option(`${length} ${t("chars")}`, length)));
  fillSelect(modelSelect, availableModels().map((model) => model.id), (id) => modelLabel(models.find((model) => model.id === id)));
  fillSelect(simMethod, availableTestMethods(), methodLabel);
  fillSelect(simLength, unique("length"), (length) => `${length} ${t("chars")}`);
}

function applyStaticSelectTranslations() {
  document.querySelectorAll("option[data-i18n]").forEach((option) => {
    option.textContent = t(option.dataset.i18n);
  });
}

function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
}

function getStoredOpenRouterApiKey() {
  return localStorage.getItem(OPENROUTER_API_KEY_STORAGE_KEY) || "";
}

function setStoredApiKey(apiKey) {
  const trimmed = apiKey.trim();
  if (trimmed) {
    localStorage.setItem(API_KEY_STORAGE_KEY, trimmed);
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
  updateApiKeyStatus();
}

function setStoredOpenRouterApiKey(apiKey) {
  const trimmed = apiKey.trim();
  if (trimmed) {
    localStorage.setItem(OPENROUTER_API_KEY_STORAGE_KEY, trimmed);
  } else {
    localStorage.removeItem(OPENROUTER_API_KEY_STORAGE_KEY);
  }
  updateApiKeyStatus();
}

function saveApiSettingsFromForm() {
  setStoredApiKey(apiKeyInput.value);
  setStoredOpenRouterApiKey(openRouterApiKeyInput.value);
}

function updateApiKeyStatus() {
  const savedKey = getStoredApiKey();
  const openRouterKey = getStoredOpenRouterApiKey();
  apiKeyStatus.textContent = savedKey ? t("apiKeySaved") : t("apiKeyNotSaved");
  openRouterApiKeyStatus.textContent = openRouterKey ? t("openRouterApiKeySaved") : t("openRouterApiKeyNotSaved");
  if (document.activeElement !== apiKeyInput) apiKeyInput.value = savedKey;
  if (document.activeElement !== openRouterApiKeyInput) openRouterApiKeyInput.value = openRouterKey;
  apiKeyInput.placeholder = "vck_...";
  openRouterApiKeyInput.placeholder = "sk-or-v1-...";
  toggleApiKey.textContent = apiKeyInput.type === "password" ? t("showVercelApiKey") : t("hideVercelApiKey");
  toggleOpenRouterApiKey.textContent = openRouterApiKeyInput.type === "password" ? t("showOpenRouterApiKey") : t("hideOpenRouterApiKey");
}

function updatePurposeGate(messageKey = null) {
  purposeAcknowledge.checked = purposeAcknowledged;
  purposeContinue.disabled = !purposeAcknowledged;
  purposeStatus.textContent = t(messageKey || (purposeAcknowledged ? "purposeUnlocked" : "purposeLocked"));
  document.querySelectorAll(".tab-button").forEach((button) => {
    const locked = !purposeAcknowledged && button.dataset.view !== "purpose";
    button.classList.toggle("is-locked", locked);
    button.toggleAttribute("disabled", locked);
    button.setAttribute("aria-disabled", String(locked));
  });
}

function acknowledgePurpose() {
  purposeAcknowledged = true;
  localStorage.setItem(PURPOSE_ACK_STORAGE_KEY, "true");
  updatePurposeGate("purposeUnlocked");
}

function setupGpt55DemoTest() {
  acknowledgePurpose();
  switchTestMode("new");
  switchProviderMode("vercel");
  modelSelect.value = "openai/gpt-5.5";
  simMethod.value = "Atbash";
  simLength.value = "50";
  scenarioSelect.value = "guided";
  batchStatus.textContent = t("purposeGpt55Ready");
  document.querySelector("#metricModel").textContent = "OpenAI GPT-5.5";
  document.querySelector("#metricCipher").textContent = "Atbash, 50";
  const row = dataset.find((item) => item.method === "Atbash" && item.length === "50");
  if (row) {
    document.querySelector("#cipherText").textContent = row.cipherText;
    document.querySelector("#expectedText").textContent = row.expected;
  }
  document.querySelector("#decryptedText").textContent = t("modelOutputEmpty");
  document.querySelector("#evaluationText").textContent = t("evaluationEmpty");
  switchView("simulate");
}

function saveTestedRows() {
  localStorage.setItem(TEST_RESULTS_STORAGE_KEY, JSON.stringify(testedRows));
}

function loadTestedRows() {
  try {
    const savedRows = JSON.parse(localStorage.getItem(TEST_RESULTS_STORAGE_KEY) || "[]");
    if (Array.isArray(savedRows)) testedRows = savedRows;
  } catch (error) {
    testedRows = [];
  }
}

function clearSavedTestedRows() {
  testedRows = [];
  failedBatchRows = [];
  localStorage.removeItem(TEST_RESULTS_STORAGE_KEY);
  batchStatus.textContent = t("savedResultsCleared");
  renderNewResults();
  renderCompare();
}

function filteredRows() {
  return knownResults;
}

function filteredTestedRows() {
  return testedRows.filter((row) => {
    const methodOk = methodFilter.value === "all" || row.method === methodFilter.value;
    const lengthOk = lengthFilter.value === "all" || row.length === lengthFilter.value;
    return methodOk && lengthOk;
  });
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatDelta(value) {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function providerLabelFromSource(sourceLabel = "") {
  return sourceLabel.toLowerCase().includes("openrouter") ? "OpenRouter" : "Vercel";
}

function scenarioLabelFromSource(sourceLabel = "") {
  return sourceLabel.split("/").slice(1).join("/").trim() || sourceLabel;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function summarizeTestedByModel(rows) {
  const grouped = new Map();
  rows.forEach((row) => {
    if (!grouped.has(row.model)) grouped.set(row.model, []);
    grouped.get(row.model).push(row);
  });
  return [...grouped.entries()].map(([model, modelRows]) => {
    const sorted = [...modelRows].sort((a, b) => b.charScore - a.charScore);
    const methods = [...new Set(modelRows.map((row) => methodLabel(row.method)))];
    const lengths = [...new Set(modelRows.map((row) => row.length))].sort((a, b) => Number(a) - Number(b));
    const providers = [...new Set(modelRows.map((row) => providerLabelFromSource(row.sourceLabel)))];
    const scenarios = [...new Set(modelRows.map((row) => scenarioLabelFromSource(row.sourceLabel)))];
    return {
      model,
      average: average(modelRows.map((row) => row.charScore)),
      cases: modelRows.length,
      methods,
      lengths,
      providers,
      scenarios,
      best: sorted[0],
      weakest: sorted[sorted.length - 1],
    };
  }).sort((a, b) => b.average - a.average);
}

function summarizeTestedByCipher(rows) {
  const grouped = new Map();
  rows.forEach((row) => {
    const key = methodLabel(row.method);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  });
  return [...grouped.entries()].map(([method, methodRows]) => {
    const sorted = [...methodRows].sort((a, b) => b.charScore - a.charScore);
    return {
      method,
      average: average(methodRows.map((row) => row.charScore)),
      cases: methodRows.length,
      best: sorted[0],
      weakest: sorted[sorted.length - 1],
    };
  }).sort((a, b) => b.average - a.average);
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function resultExportValue(row, header) {
  if (header === "score") return row.charScore;
  if (header === "source") return row.sourceLabel;
  return row[header];
}

function exportResults(format) {
  const rows = filteredTestedRows();
  if (!rows.length) {
    batchStatus.textContent = t("noExportRows");
    return;
  }
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  if (format === "json") {
    downloadTextFile(`cipher-results-${stamp}.json`, JSON.stringify(rows, null, 2), "application/json;charset=utf-8");
    return;
  }
  const headers = ["model", "cipher", "method", "length", "key", "score", "source", "evaluator", "time", "cipherText", "expected"];
  const lines = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => csvEscape(resultExportValue(row, header))).join(",")),
  ];
  downloadTextFile(`cipher-results-${stamp}.csv`, lines.join("\n"), "text/csv;charset=utf-8");
}

function buildComparisonSummary(rows = filteredTestedRows()) {
  const oldAverage = average(knownResults.map((row) => row.charScore));
  const oldBest = [...knownResults].sort((a, b) => b.charScore - a.charScore)[0];
  const modelSummaries = summarizeTestedByModel(rows);
  const newAverage = average(rows.map((row) => row.charScore));
  const allMethods = [...new Set(rows.map((row) => methodLabel(row.method)))].sort();
  const allLengths = [...new Set(rows.map((row) => row.length))].sort((a, b) => Number(a) - Number(b));
  const allProviders = [...new Set(rows.map((row) => providerLabelFromSource(row.sourceLabel)))].sort();
  const allScenarios = [...new Set(rows.map((row) => scenarioLabelFromSource(row.sourceLabel)))].filter(Boolean);
  return {
    oldBaselineAverage: Number(oldAverage.toFixed(2)),
    oldBestModel: oldBest.model,
    oldBestScore: oldBest.charScore,
    newLiveAverage: Number(newAverage.toFixed(2)),
    averageDelta: Number((newAverage - oldAverage).toFixed(2)),
    totalNewCases: rows.length,
    providers: allProviders,
    scenarios: allScenarios,
    methodsCovered: allMethods,
    lengthsCovered: allLengths,
    modelSummaries: modelSummaries.map((row) => ({
      model: row.model,
      average: Number(row.average.toFixed(2)),
      deltaVsOldBaseline: Number((row.average - oldAverage).toFixed(2)),
      cases: row.cases,
      providers: row.providers,
      scenarios: row.scenarios,
      bestCase: `${methodLabel(row.best.method)} ${row.best.length} ${row.best.charScore.toFixed(2)}%`,
      weakestCase: `${methodLabel(row.weakest.method)} ${row.weakest.length} ${row.weakest.charScore.toFixed(2)}%`,
    })),
  };
}

function renderResults() {
  const rows = filteredRows();
  const sortedRows = [...rows].sort((a, b) => b.charScore - a.charScore);
  const topRows = sortedRows.slice(0, 3);
  const oldAverage = average(sortedRows.map((row) => row.charScore));
  const totalSolved = sortedRows.reduce((sum, row) => sum + row.full, 0);
  const totalFailed = sortedRows.reduce((sum, row) => sum + row.failed, 0);
  resultRows.innerHTML = `
    <section class="known-hero" aria-label="${t("titleResults")}">
      <div>
        <span>${t("originalKnownSet")}</span>
        <h3>${t("titleResults")}</h3>
        <p>${t("knownResultsNote")}</p>
      </div>
      <dl>
        <div><dt>${t("averageScore")}</dt><dd>${oldAverage.toFixed(2)}%</dd></div>
        <div><dt>${t("solved")}</dt><dd>${totalSolved}</dd></div>
        <div><dt>${t("failedShort")}</dt><dd>${totalFailed}</dd></div>
      </dl>
    </section>

    <section class="known-podium">
      ${topRows.map((row, index) => `
        <article class="podium-card podium-${index + 1}">
          <span class="podium-rank">#${index + 1}</span>
          <strong>${row.model}</strong>
          <div class="podium-score">${row.charScore.toFixed(2)}%</div>
          <div class="meter" aria-label="${row.charScore}% ${t("chartLabel")}"><span style="width:${row.charScore}%"></span></div>
          <p>${t("solved")}: ${row.full}/${row.tests} | ${t("partial")}: ${row.partial} | ${t("failedShort")}: ${row.failed}</p>
        </article>
      `).join("")}
    </section>

    <section class="known-board">
      <table>
        <thead>
          <tr>
            <th>${t("rank")}</th>
            <th>${t("model")}</th>
            <th>${t("averageScore")}</th>
            <th>${t("solved")}</th>
            <th>${t("partial")}</th>
            <th>${t("failedShort")}</th>
            <th>${t("testSet")}</th>
          </tr>
        </thead>
        <tbody>
          ${sortedRows.map((row, index) => `
            <tr>
              <td>#${index + 1}</td>
              <td>${row.model}</td>
              <td>
                <strong>${row.charScore.toFixed(2)}%</strong>
                <div class="meter" aria-label="${row.charScore}% ${t("chartLabel")}"><span style="width:${row.charScore}%"></span></div>
              </td>
              <td>${row.full}</td>
              <td>${row.partial}</td>
              <td>${row.failed}</td>
              <td>${row.tests}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>`;
 
}
function renderNewResults() {
  if (!testedRows.length) {
    newResultRows.innerHTML = `<article class="result-row empty-row"><strong>${t("noRun")}</strong><span>${t("chooseSettings")}</span></article>`;
    return;
  }
  const rows = filteredTestedRows();
  newResultRows.innerHTML = rows.map((row) => `
    <article class="result-row">
      <strong>${row.model}</strong>
      <span>${row.method} / ${row.length} / ${row.sourceLabel}</span>
      <div class="meter" aria-label="${row.charScore}% ${t("chartLabel")}"><span style="width:${row.charScore}%"></span></div>
      <span class="score">${row.charScore.toFixed(2)}%</span>
    </article>
  `).join("");
}

function renderCompare() {
  const oldAverage = average(knownResults.map((row) => row.charScore));
  const oldBest = [...knownResults].sort((a, b) => b.charScore - a.charScore)[0];
  const rows = filteredTestedRows();
  if (!rows.length) {
    compareRows.innerHTML = `
      <section class="compare-summary">
        <p>${t("compareIntro")}</p>
        <div><span>${t("compareKnownBaseline")}</span><strong>${oldAverage.toFixed(2)}%</strong></div>
        <div><span>${t("compareBestOld")}</span><strong>${oldBest.model}</strong></div>
        <div><span>${t("compareNewGroup")}</span><strong>0</strong></div>
      </section>
      <article class="compare-empty">
        <strong>${t("compareNoNew")}</strong>
      </article>
    `;
    return;
  }

  const modelSummaries = summarizeTestedByModel(rows);
  const newAverage = average(rows.map((row) => row.charScore));
  const newBest = modelSummaries[0];
  const allMethods = [...new Set(rows.map((row) => methodLabel(row.method)))].sort();
  const allLengths = [...new Set(rows.map((row) => row.length))].sort((a, b) => Number(a) - Number(b));
  const allProviders = [...new Set(rows.map((row) => providerLabelFromSource(row.sourceLabel)))].sort();
  const allScenarios = [...new Set(rows.map((row) => scenarioLabelFromSource(row.sourceLabel)))].filter(Boolean);
  const cipherSummaries = summarizeTestedByCipher(rows);
  const explanationText = comparisonExplanationStatus === "loading"
    ? t("generatingAiComparison")
    : comparisonExplanation || t("aiComparisonEmpty");
  const explanationMeta = comparisonExplanationModel ? `${t("aiComparisonModel")}: ${comparisonExplanationModel}` : "google/gemma-4-26b-a4b-it:free";

  compareRows.innerHTML = `
    <section class="compare-summary">
      <p>${t("compareIntro")}</p>
      <div><span>${t("compareKnownBaseline")}</span><strong>${oldAverage.toFixed(2)}%</strong></div>
      <div><span>${t("compareLiveAverage")}</span><strong>${newAverage.toFixed(2)}%</strong></div>
      <div><span>${t("compareAverageDelta")}</span><strong>${formatDelta(newAverage - oldAverage)}</strong></div>
    </section>

    <section class="comparison-grid">
      <article>
        <span>${t("compareOldGroup")}</span>
        <strong>${oldBest.model}</strong>
        <p>${t("compareBestOld")}: ${oldBest.charScore.toFixed(2)}% | ${t("testSet")}: ${oldBest.tests} | ${t("solved")}: ${oldBest.full}</p>
      </article>
      <article>
        <span>${t("compareNewGroup")}</span>
        <strong>${newBest.model}</strong>
        <p>${t("compareBestNew")}: ${newBest.average.toFixed(2)}% | ${t("compareCases")}: ${newBest.cases} | ${t("compareAverageDelta")}: ${formatDelta(newBest.average - oldBest.charScore)}</p>
      </article>
      <article>
        <span>${t("compareCoverage")}</span>
        <strong>${rows.length} ${t("compareCases")}</strong>
        <p>${t("compareProvider")}: ${allProviders.join(", ")} | ${t("compareScenario")}: ${allScenarios.join(", ") || "--"}</p>
      </article>
      <article>
        <span>${t("testSet")}</span>
        <strong>${allMethods.length}/${unique("method").length}</strong>
        <p>${t("compareMethodsCovered")}: ${allMethods.join(", ")} | ${t("compareLengthsCovered")}: ${allLengths.join(", ")}</p>
      </article>
    </section>

    <section class="cipher-breakdown">
      <h3>${t("cipherBreakdown")}</h3>
      <div class="cipher-breakdown-grid">
        ${cipherSummaries.map((row) => `
          <article>
            <span>${row.method}</span>
            <strong>${row.average.toFixed(2)}%</strong>
            <div class="meter" aria-label="${row.average}% ${t("chartLabel")}"><span style="width:${row.average}%"></span></div>
            <p>${t("compareCases")}: ${row.cases} | ${t("compareBestCase")}: ${row.best.model} ${row.best.charScore.toFixed(1)}% | ${t("compareWeakCase")}: ${row.weakest.model} ${row.weakest.charScore.toFixed(1)}%</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="ai-explanation-panel">
      <div>
        <span>${t("aiComparisonTitle")}</span>
        <p>${escapeHtml(explanationText)}</p>
        <small>${escapeHtml(explanationMeta)}</small>
      </div>
      <button class="secondary-action" id="generateComparisonExplanation" type="button" ${comparisonExplanationStatus === "loading" ? "disabled" : ""}>
        ${comparisonExplanationStatus === "loading" ? t("generatingAiComparison") : t("generateAiComparison")}
      </button>
    </section>

    <section class="compare-table-wrap">
      <table>
        <thead>
          <tr>
            <th>${t("rank")}</th>
            <th>${t("model")}</th>
            <th>${t("compareProvider")}</th>
            <th>${t("compareLiveAverage")}</th>
            <th>${t("compareAverageDelta")}</th>
            <th>${t("compareCases")}</th>
            <th>${t("compareBestCase")}</th>
            <th>${t("compareWeakCase")}</th>
            <th>${t("compareCoverage")}</th>
          </tr>
        </thead>
        <tbody>
          ${modelSummaries.map((row, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${row.model}</td>
              <td>${row.providers.join(", ")}</td>
              <td><strong>${row.average.toFixed(2)}%</strong></td>
              <td class="${row.average >= oldAverage ? "positive-delta" : "negative-delta"}">${formatDelta(row.average - oldAverage)}</td>
              <td>${row.cases}</td>
              <td>${methodLabel(row.best.method)} / ${row.best.length} / ${row.best.charScore.toFixed(2)}%</td>
              <td>${methodLabel(row.weakest.method)} / ${row.weakest.length} / ${row.weakest.charScore.toFixed(2)}%</td>
              <td>${row.methods.join(", ")} | ${row.lengths.join(", ")} | ${row.scenarios.join(", ")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderDataset() {
  datasetRows.innerHTML = dataset.map((row) => `
    <tr>
      <td>${row.cipher}${row.method === "Hill" ? ` (${t("newCipherMarker")})` : ""}</td>
      <td>${methodLabel(row.method)}</td>
      <td>${row.length}</td>
      <td>${row.key}</td>
      <td>${row.expected}</td>
    </tr>
  `).join("");
}

async function callActualApi(row, model) {
  const vercelApiKey = getStoredApiKey();
  const openRouterApiKey = getStoredOpenRouterApiKey();
  const apiUrl = window.location.protocol === "file:" ? "http://127.0.0.1:8080/api/run" : `${window.location.origin}/api/run`;
  let response;
  try {
    response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model.id,
        method: row.method,
        key: row.key,
        cipherText: row.cipherText,
        expectedText: row.expected,
        scenario: scenarioSelect.value,
        provider: model.provider || "vercel",
        vercelApiKey,
        openRouterApiKey,
      }),
    });
  } catch (error) {
    throw new Error(`Could not reach local API server at ${apiUrl}. Open http://127.0.0.1:8080/website/ and make sure server.js is running.`);
  }
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || t("apiRequestFailed"));
  return data;
}

async function callComparisonExplanation() {
  const rows = filteredTestedRows();
  if (!rows.length) return;
  const apiUrl = window.location.protocol === "file:" ? "http://127.0.0.1:8080/api/explain-comparison" : `${window.location.origin}/api/explain-comparison`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      openRouterApiKey: getStoredOpenRouterApiKey(),
      language: currentLang,
      summary: buildComparisonSummary(rows),
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || t("aiComparisonFailed"));
  return data;
}

function rowsForCurrentBatch() {
  return dataset.filter((row) => !(currentTestMode === "known" && row.method === "Hill"));
}

function storeTestResult(row, model, apiResult, sourceLabel, scenarioLabel) {
  const output = apiResult.output;
  const deterministicScore = scoreText(row.expected, output);
  const charScore = apiResult.evaluation?.score ?? deterministicScore;
  const displaySourceLabel = `${sourceLabel} / ${scenarioLabel}`;
  const testedRow = {
    ...row,
    charScore,
    wordScore: charScore,
    exact: charScore === 100,
    model: model.label,
    sourceLabel: displaySourceLabel,
    evaluator: apiResult.evaluation?.model || "openai/gpt-5.4-nano",
    time: new Date().toLocaleTimeString(),
  };
  testedRows = [testedRow, ...testedRows.filter((item) => item.cipher !== row.cipher || item.model !== model.label || item.sourceLabel !== displaySourceLabel)];
  saveTestedRows();
  comparisonExplanation = "";
  comparisonExplanationStatus = "empty";
  comparisonExplanationModel = "";
  return {
    output,
    deterministicScore,
    charScore,
    displaySourceLabel,
    evaluationReasoning: apiResult.evaluation?.reasoning ?? null,
    evaluationModel: apiResult.evaluation?.model ?? null,
    latency: apiResult.latencyMs,
  };
}

async function generateComparisonExplanation() {
  comparisonExplanationStatus = "loading";
  comparisonExplanation = "";
  comparisonExplanationModel = "";
  renderCompare();
  try {
    const data = await callComparisonExplanation();
    comparisonExplanation = data.explanation || "";
    comparisonExplanationModel = data.model || "google/gemma-4-26b-a4b-it:free";
    comparisonExplanationStatus = "ready";
  } catch (error) {
    comparisonExplanation = `${t("aiComparisonFailed")} ${error.message}`;
    comparisonExplanationStatus = "error";
    comparisonExplanationModel = "google/gemma-4-26b-a4b-it:free";
  }
  renderCompare();
}

async function runRowsForModel(rows, mode = "all") {
  const model = models.find((item) => item.id === modelSelect.value);
  if (!model) return;
  const sourceLabel = model.provider === "openrouter" ? t("sourceOpenRouter") : t("sourceApi");
  const scenarioLabel = scenarioSelect.selectedOptions[0]?.textContent || scenarioSelect.value;
  let successes = 0;
  if (mode === "all") failedBatchRows = [];
  runAllTestsButton.disabled = true;
  retryFailedTestsButton.disabled = true;
  simForm.querySelector(".primary-action").disabled = true;
  batchStatus.textContent = `${t("batchRunning")}: 0/${rows.length}`;
  document.querySelector("#metricModel").textContent = model.label;
  document.querySelector("#metricEvaluator").textContent = "openai/gpt-5.4-nano";

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    document.querySelector("#runLabel").textContent = `${t("batchRunning")}: ${index + 1}/${rows.length}`;
    document.querySelector("#runScore").textContent = "...";
    document.querySelector("#metricCipher").textContent = `${methodLabel(row.method)}, ${row.length}`;
    document.querySelector("#metricStatus").textContent = `${index + 1}/${rows.length}`;
    document.querySelector("#cipherText").textContent = row.cipherText;
    document.querySelector("#expectedText").textContent = row.expected;
    document.querySelector("#decryptedText").textContent = t("callingApi");
    document.querySelector("#evaluationText").textContent = t("callingApi");
    batchStatus.textContent = `${t("batchRunning")}: ${index + 1}/${rows.length} - ${methodLabel(row.method)} ${row.length}`;

    try {
      const apiResult = await callActualApi(row, model);
      const result = storeTestResult(row, model, apiResult, sourceLabel, scenarioLabel);
      const status = result.charScore >= 90 ? t("fullSolve") : result.charScore >= 55 ? t("partialSolve") : t("failed");
      successes += 1;
      document.querySelector("#runScore").textContent = `${result.charScore.toFixed(2)}%`;
      document.querySelector("#metricLatency").textContent = `${result.latency} ms`;
      document.querySelector("#metricStatus").textContent = status;
      document.querySelector("#metricEvaluator").textContent = result.evaluationModel || "openai/gpt-5.4-nano";
      document.querySelector("#decryptedText").textContent = result.output;
      document.querySelector("#evaluationText").textContent = result.evaluationReasoning || `${t("chartLabel")}: ${result.deterministicScore.toFixed(2)}%`;
      renderNewResults();
      renderCompare();
    } catch (error) {
      failedBatchRows.push(row);
      document.querySelector("#runLabel").textContent = t("apiFailed");
      document.querySelector("#runScore").textContent = t("error");
      document.querySelector("#metricLatency").textContent = "--";
      document.querySelector("#metricStatus").textContent = error.message.slice(0, 140);
      document.querySelector("#decryptedText").textContent = error.message;
      document.querySelector("#evaluationText").textContent = error.message;
    }
  }

  const modelRows = testedRows.filter((row) => row.model === model.label && row.sourceLabel === `${sourceLabel} / ${scenarioLabel}`);
  const batchAverage = average(modelRows.map((row) => row.charScore));
  document.querySelector("#runLabel").textContent = `${t("batchComplete")}: ${model.label}`;
  document.querySelector("#runScore").textContent = successes ? `${batchAverage.toFixed(2)}%` : "--";
  batchStatus.textContent = failedBatchRows.length
    ? `${t("batchComplete")}: ${successes}/${rows.length} - ${failedBatchRows.length} ${t("failedShort")}. ${t("failedRetryReady")}`
    : `${t("batchComplete")}: ${successes}/${rows.length}`;
  runAllTestsButton.disabled = false;
  retryFailedTestsButton.disabled = !failedBatchRows.length;
  simForm.querySelector(".primary-action").disabled = false;
  renderResults();
  renderNewResults();
  renderCompare();
}

async function runAllTestsForModel() {
  await runRowsForModel(rowsForCurrentBatch(), "all");
}

async function retryFailedTests() {
  if (!failedBatchRows.length) return;
  const rows = [...failedBatchRows];
  failedBatchRows = [];
  await runRowsForModel(rows, "retry");
}

async function runTest(event) {
  event.preventDefault();
  const model = models.find((item) => item.id === modelSelect.value);
  const row = dataset.find((item) => item.method === simMethod.value && item.length === simLength.value);
  if (!model || !row || (currentTestMode === "known" && row.method === "Hill")) return;
  document.querySelector("#runLabel").textContent = t("callingApi");
  document.querySelector("#runScore").textContent = "...";
  let output;
  let latency;
  let sourceLabel;
  let evaluationScore = null;
  let evaluationReasoning = null;
  let evaluationModel = null;
  try {
    const apiResult = await callActualApi(row, model);
    sourceLabel = model.provider === "openrouter" ? t("sourceOpenRouter") : t("sourceApi");
    const scenarioLabel = scenarioSelect.selectedOptions[0]?.textContent || scenarioSelect.value;
    const result = storeTestResult(row, model, apiResult, sourceLabel, scenarioLabel);
    output = result.output;
    latency = result.latency;
    evaluationScore = result.charScore;
    evaluationReasoning = result.evaluationReasoning;
    evaluationModel = result.evaluationModel;
  } catch (error) {
    document.querySelector("#runLabel").textContent = t("apiFailed");
    document.querySelector("#runScore").textContent = t("error");
    document.querySelector("#metricModel").textContent = model.label;
    document.querySelector("#metricCipher").textContent = `${methodLabel(row.method)}, ${row.length}`;
    document.querySelector("#metricLatency").textContent = "--";
    document.querySelector("#metricStatus").textContent = error.message.slice(0, 140);
    document.querySelector("#metricEvaluator").textContent = "openai/gpt-5.4-nano";
    document.querySelector("#cipherText").textContent = row.cipherText;
    document.querySelector("#decryptedText").textContent = error.message;
    document.querySelector("#expectedText").textContent = row.expected;
    document.querySelector("#evaluationText").textContent = error.message;
    return;
  }
  const deterministicScore = scoreText(row.expected, output);
  const charScore = evaluationScore ?? deterministicScore;
  const status = charScore >= 90 ? t("fullSolve") : charScore >= 55 ? t("partialSolve") : t("failed");
  const scenarioLabel = scenarioSelect.selectedOptions[0]?.textContent || scenarioSelect.value;

  document.querySelector("#runLabel").textContent = `${sourceLabel}: ${row.cipher} / ${model.label} / ${scenarioLabel}`;
  document.querySelector("#runScore").textContent = `${charScore.toFixed(2)}%`;
  document.querySelector("#metricModel").textContent = model.label;
  document.querySelector("#metricCipher").textContent = `${methodLabel(row.method)}, ${row.length}`;
  document.querySelector("#metricLatency").textContent = `${latency} ms`;
  document.querySelector("#metricStatus").textContent = status;
  document.querySelector("#metricEvaluator").textContent = evaluationModel || "openai/gpt-5.4-nano";
  document.querySelector("#cipherText").textContent = row.cipherText;
  document.querySelector("#decryptedText").textContent = output;
  document.querySelector("#expectedText").textContent = row.expected;
  document.querySelector("#evaluationText").textContent = evaluationReasoning || `${t("chartLabel")}: ${deterministicScore.toFixed(2)}%`;
  renderResults();
  renderNewResults();
  renderCompare();
}

function switchView(viewName) {
  if (!purposeAcknowledged && viewName !== "purpose") {
    viewName = "purpose";
    document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active-view", view.id === viewName));
    document.querySelectorAll(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
    viewTitle.textContent = t(viewTitleKeys[viewName]);
    updatePurposeGate("purposeRequired");
    return;
  }
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active-view", view.id === viewName));
  document.querySelectorAll(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  viewTitle.textContent = t(viewTitleKeys[viewName]);
  updatePurposeGate();
}

function switchTestMode(modeName) {
  currentTestMode = modeName;
  testModeButtons.forEach((button) => button.classList.toggle("active", button.dataset.testMode === modeName));
  providerSwitch.classList.toggle("is-hidden", currentTestMode !== "new");
  fillControls();
}

function switchProviderMode(providerName) {
  currentNewProvider = providerName;
  providerModeButtons.forEach((button) => button.classList.toggle("active", button.dataset.providerMode === providerName));
  fillControls();
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  applyStaticSelectTranslations();
  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    element.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":");
      if (attr && key) element.setAttribute(attr, t(key));
    });
  });
  viewTitle.textContent = t(viewTitleKeys[document.querySelector(".tab-button.active")?.dataset.view || "simulate"]);
  const methodValue = methodFilter.value || "all";
  const lengthValue = lengthFilter.value || "all";
  const simLengthValue = simLength.value || "50";
  const scenarioValue = scenarioSelect.value || "guided";
  const modelValue = modelSelect.value;
  const simMethodValue = simMethod.value;
  fillControls();
  methodFilter.value = methodValue;
  lengthFilter.value = lengthValue;
  simLength.value = [...simLength.options].some((option) => option.value === simLengthValue) ? simLengthValue : simLength.value;
  scenarioSelect.value = [...scenarioSelect.options].some((option) => option.value === scenarioValue) ? scenarioValue : "guided";
  modelSelect.value = [...modelSelect.options].some((option) => option.value === modelValue) ? modelValue : modelSelect.value;
  simMethod.value = [...simMethod.options].some((option) => option.value === simMethodValue) ? simMethodValue : simMethod.value;
  languageSelect.value = currentLang;
  updateApiKeyStatus();
  updatePurposeGate();
  renderDataset();
  renderResults();
  renderNewResults();
  renderCompare();
}

fillControls();
loadTestedRows();
if (testedRows.length) batchStatus.textContent = t("savedResultsLoaded");
renderDataset();
renderResults();
renderNewResults();
renderCompare();
applyTranslations();
simForm.addEventListener("submit", runTest);
runAllTestsButton.addEventListener("click", runAllTestsForModel);
retryFailedTestsButton.addEventListener("click", retryFailedTests);
exportCsvButton.addEventListener("click", () => exportResults("csv"));
exportJsonButton.addEventListener("click", () => exportResults("json"));
clearSavedResultsButton.addEventListener("click", clearSavedTestedRows);
methodFilter.addEventListener("change", renderResults);
methodFilter.addEventListener("change", renderNewResults);
methodFilter.addEventListener("change", renderCompare);
lengthFilter.addEventListener("change", renderResults);
lengthFilter.addEventListener("change", renderNewResults);
lengthFilter.addEventListener("change", renderCompare);
languageSelect.addEventListener("change", () => {
  currentLang = languageSelect.value;
  applyTranslations();
});
apiKeyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveApiSettingsFromForm();
});
apiKeyInput.addEventListener("input", () => {
  setStoredApiKey(apiKeyInput.value);
});
openRouterApiKeyInput.addEventListener("input", () => {
  setStoredOpenRouterApiKey(openRouterApiKeyInput.value);
});
toggleApiKey.addEventListener("click", () => {
  apiKeyInput.type = apiKeyInput.type === "password" ? "text" : "password";
  updateApiKeyStatus();
});
toggleOpenRouterApiKey.addEventListener("click", () => {
  openRouterApiKeyInput.type = openRouterApiKeyInput.type === "password" ? "text" : "password";
  updateApiKeyStatus();
});
clearApiKey.addEventListener("click", () => {
  apiKeyInput.value = "";
  apiKeyInput.type = "password";
  setStoredApiKey("");
});
clearOpenRouterApiKey.addEventListener("click", () => {
  openRouterApiKeyInput.value = "";
  openRouterApiKeyInput.type = "password";
  setStoredOpenRouterApiKey("");
});
purposeAcknowledge.addEventListener("change", () => {
  if (purposeAcknowledge.checked) {
    acknowledgePurpose();
  } else if (purposeAcknowledged) {
    purposeAcknowledge.checked = true;
  } else {
    updatePurposeGate();
  }
});
purposeContinue.addEventListener("click", () => {
  if (!purposeAcknowledged) {
    updatePurposeGate("purposeRequired");
    return;
  }
  switchView("simulate");
});
purposeTryGpt55.addEventListener("click", setupGpt55DemoTest);
compareRows.addEventListener("click", (event) => {
  if (event.target.closest("#generateComparisonExplanation")) {
    generateComparisonExplanation();
  }
});
document.querySelectorAll(".tab-button").forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
testModeButtons.forEach((button) => button.addEventListener("click", () => switchTestMode(button.dataset.testMode)));
providerModeButtons.forEach((button) => button.addEventListener("click", () => switchProviderMode(button.dataset.providerMode)));
window.addEventListener("resize", renderResults);
