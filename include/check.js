addEvent(window, "load", initQualityMeter);

/* 
	 Password strength/quality tester
	
	 This application will test the strength of a password and provide visual feedback to a user.
	 This version includes the output of the entropy calculation.

	 Written by Dominic White <singe-passwdtools@singe.za.net>
	 http://singe.za.net/

	 The password quality checker code is copyright Tyler Akins and has been used with permission.
	 The progress bar code is copyright Gerd Riesselmann and has been released under the GPL.

	 This code is released under the GPL.
*/

// Compressed common word list
var Common_List =
  "A A!@#$%F^G&H*A*A.,mDnEbA/.,DmEnFbBdev/nullBetc/passwdBusr/groupA000D0E0F0G0H0D7C7D007B213C46D9A1B022D9E3F8C6Csne1B11D1E1F1G1H1B209C12E12D3D4D7C25C3D098D123D321D4E5F6G7H8EqwerDabcDgoB313E13D6C32C579B412C30C430B701dC1717B812overtureD8E18B900D1D2D3D4D5D6D7D8D9C10D1D2D3D4D5D6D7D8D9C20D1D2D3D4D5D6D7D8D9C30D1D2D3D4D5D6D7D8D9C40D1D2D3D4D5D6D7D8D9C50D1D2D3D4D5D6D7D8D9C60D1D2D3D4D5D6D7D8D9C70D1D2D3D4D5D6D7D8D9C80D1D2D3D4D5D6D7D8D9C90D1D2D3D4D5D6D7D8D9Ba2b3cBchrisBkittyBp2o3iBq2w3eCw23eBsanjoseA20C00D1D2D3D4D5D6D7D8D9C10D2D3D4D5D6D7D8D9C20D1D2D3D4D5D6D7D8D9C30D1D2D3D4D5D6D7D8B112E2112B2C00C2D2E2F2G2H2C52BkidsBwelcomeA3B010B112C41B33D3E3F3G3H3B533B69BbearsA4B.2bsdC3bsdB055C77mashB2bsdB3bsdB44D4E4F44H4B788B854BrunnerA5B050B121B252B4321B55D5E5F5G5H5B683B7chevyBand5A6262B301B54321B66D6E6F6G6H6B969E69Czulu4zA777D7E7F7G7H7B89456BdwarfsA80486B675309B7654321B88D8E8F8G8H8A90210B11DscFturboDturboB2072B99D9E9F9G9H9A;lkD;lkDasdA@#$%^&AaB12345Cb2c3Gd4BaCaDaEaFaGaHaCrdvarkDonDtiBbacabDdabdooCbotFtDyCcD123DdE123H4EeFfGgCdenaceDolDulFkafFlahErChijitEramCigailCoutCracadabraIverEhamErCsolutBcaciaDdemiaHcCceptEssDordEuntHsCeCknakCropolisCtionEveDorCuraBdaDmEsCelCgCiDbDdasDneCmDinF1FistIratorCrianGnaHeEenGneDockCultCventurDilBehCneasCrobicsBfreshDicaEdCterBgainCentCgieFsCnesBhideeCmedEtBikmanCleenCmeeCrborneDcraftDheadDplaneDwolfBjaiDyBkhilCi123DkoBlainDmgirDnDsEkaEtairDyneCbanyEtrosIsDertGoCcaponeCejandrDnaDrtDssandDxE1EandeIrHrEendrEiaFsCfDaroDredCgebraCiDasFesDcaEeF1EiaDenFsDnaEeDsaEonClDahEnDegroEnDisonDoDstateCohaDkCphaF1FbetDineCtafEmiraDheaDimaG1CvaDinCwaysCysonEsaBmaDdeusDndaG1DrEjitEpreeDzingCberCelieDricaH7CiDgaCorphousDsDurCrilCyBnC-jenCacondaDlEogDntFhDstasiCchanaEorCdDersGonDiDreF1FaG1GsFwG!G1EoidFmacheGedEzejDyCelieseDwpassCgelF1FaG1FikaFsErineDieF1DusCiDlDmalG houseGhouseGsDsDtaCjanaDenCnDaElenaFiseEmariDeEliEtteDiEeConEymousCswerCtaresDhonyEropogenicDoineEnFioFyCuDmber1HoneDpaFmDragCvilsCyDthingBpacheClColloG13CpleF1F2FiiFpieFsCrilCtivaBquaEriousGusBragornDmDshCbenzCchieFtectDticCdentCeDleneCiDaEdneEneDelFlaDfDjitDndamDstotleDzonaCjunFasaCleneCmandGoDondCnoldConDundCrowCsenalDhadCtDemisDhurDieEstDyCunEaCvindBsCadDpCdDfE1234E;lkjEasdfEgFhGjHkEjklH;DlkjChimaEshDleyG1DokDrafDtonDutoshCianCjeetCkCmCpenCsDholeDmunchCterixBtC&tCandtCeChDanassDenaClantaCmosphereCseCtilaCulBudieDraEeyCgustGinCreliusCstinCthorDumnBvalonDtarCengerEirCiCniCrahamBwayE!CesomeByeletClmerBzamCizEiCtecsCureAbabakDeEsDiesDyEdollElon5CcchusDhDkdoorErubEupCdassDboyDgerDtimesCgladyDwomanChramCileyCkedpotatoeErDshiClakrisEsFubrDdoDkrishDlardEsCmbiEooCnDanaGsFeDcroftDditDgDksDzaiCrakaDbEaraEerEieDfEerEingDitoneDnEesFyG1EieEyardDonF harkonnenFharkonnenDretGtEyDtEmanEonCsebalHlDfEulDicElDkarEetGbHaIllDsEoonDtardDukiCtcaveEhEomputerDmanG1EobileCystateBballCbDbEbFbGbHbBeCachFesDgleDmmeupDnerEieEsDrEsDstFyDterEitElesEriceDutifuIlFyDverEisG1CbeCcauseDcaDkyCefDnDrDthovenCforeChnamClgiumDizeDlEaEeEowDmontDovedCnDgtDjaminEiDnetGtEyDoitDsonDtDyDzCowulfCppeCresforDhanuDkeleyDlinGerGwallDnardHoEhardEieDryDtEhaDylCstCtaEcamDhEanyDsieEyDterEieEyCverlyBfdCiBharatDvaniCoothapBiayCcameralDhngaEonCenveniCgDalDbenEirdEossFyErotherEucksDcockHsDdealEogEudeDfootDglesEuyDhipsEouseDjokeDmacFnEouthDredEoomDsecretDtitsEoeCkerClboDiameeDlEcEieEsEyF1CmDboFeDmerCnDdDgEoDkyDodCoboyDchemDlogyCrdE33EieEyDgetGtaEitDthdayCscuitDhopDmillahCtchFinH'HgDemeDterCzDhanBjornBlackFbootFieFjackDderunnerDhDineErDkeDncheDsterDzerCeepFingFsCindsDssDtzDzzardCondeFieFsG1DodEmcountyDwEfishEjobEmeEoffCssCueEbirdFlazerEeyesEfishEjeanElineEsFkyEvelvetBmwBoCatCbDbiFjoEyDcatCdyshopCeingCgartDeyDusCleslawCmbayCndE007DerDgDitaDjourDkersDnEieDsaiDzaiEoCobieGsEooEysDgerEieDkEemGdannoEitDmerDnDsterDtsFieDzieCrDisDnagaiCscoDsDtonCthCulderDrbonEneG-againGagainCwlingCxerFsCydDwonderCzoBradE&janetEfordEjanetEleyEnjanetDinFdeadDnchEd-n-janetFiFonFyEislaDsilDtDvenewworldFsDzilCeakoutEstGfeedGsDndaGnFenEtDtEonEtDwsterCianDcklesFoutDdgeGsGtHtDefcaseDghtDngEkleyDtainCoadwayDkenheartFrDmbergDncoGsEteDokeFsDthelGrHsDwnFsCuceDnoDtusCyanFtDceDnBsdD4DunixBubbaF1FhGlahFlahEleGsCckEarooEsCddEahEhaFistEyDgieDliteCffaloEettEyCgsEbunnyEyCllEdogEetEsFhitCmblingCngDnyFrabbitCrgessDkeDnsDtonCsalaccDinessDterCtDchDlerDtEerGflyEfuckIerEheadEonGsCyCzzByCoungGinCronCtemeCungAc++B00perB3poBabernetDinboyCctusCdDatDcamDweldCesarCipEcadDtlinClDebEndarDgaryDibanEfornIiaDlDvinG1CmaroEyDelEraFonDillaGeDlinDpanileEbellEingCnDadaDcedFrDdaceEiEyDelaDnonGdaIleDonDtorDucksEteCpfastDtainEianCrDbonDdEinalDebearEnEyDlEaEenaEoFsEyleFnDmenDnageDolF1FeGenFieGnaHeFynDrieEolFtEyDsonDterEmanDverDyElEnCscadeHsDeyDhEboxDioDparEerDsieDtleCtDalinaFogDch22DfishDherinIeEiEleenEyDnipDsDwomanCyugaBccDcEcFcGcHcBecilFeFiaFyCdicClesteDiaEcaEneDticsCmentCnterCrebusDuleanCsarFeDsnaBfiCjBgjBhadDiEnFsawDkkalaDllengIeDmeleonEpionFsDnEceEdFlerFraHmHsEelFquaEgFeGdGitGmeGthisFhoFkyuEnelFiEshinEtalDoE-yanEfengEsDpmanDrdonnayEgerEityElesFieH1FottIeEmingEonDsDtDuCeckinFovDdsadaDeseGcakeDifDlseaH1DmEistryDnEgDowF-toDralaEryEylDssEterH1DungDvyF1CiD-pangEshunEtaiEwangEyaoDaE-huaFlinFyinGuEraDcagoEkenEoDefsEnDhsingDldsplayEinDnE-wEaFcatEgF-enGliGmeEookEpanDpEperDquitaDshengCldrnDoeCoDcolatIeDlDongG-hDpEsticksDuEetteCrisF1G23FpenFsGyFtG1GiaInHeHnIaIeGmasGopIhJerGyDonosCuDckFyDen-chGtsDnE-linFsheFyuEgF-naGpiGyaFenFyenDongDrchEn-huBicDeroCgarCmarronCndelynFrEiEyF1DemaCrcuitDqueDrusCvicElBlaireDmbakeDncyDptonDrenceEisaGsaEkFsonDssFicFrooImDudeGlFiaCeanerFfightFroomEtEvageDoCiffFordEtonDntFonDpperDtEorisCockEloDsefriendDudDverCuelessDsterHsBoatamundiEimundiCbainDraCcacolaEkolaDkDoCdeEnameDyCeCffeeChenCkacolaDeEisitClbyDdEcutsEshoulderEwarDemanEtteDinDleenFgeFtteEinsDorFadoFsEurDt45EraneDumbiaCmandurDbinationDeEdienneEonEtDmanderEradesEunicationDpaqEtonEuserveFteHrDradeHsCnceptEordeDdoFmGsDfidenEusedDnectFrEieDradDsoleEpirituEultaHiDtentErolDvexCokEieGsFngDlEbeanEmanDperDterCpperCraElynDdeliaDeyDinnaGeDkyDleneDneliaHusEflakeDonaDradoDvetteDwinCsmicEoFsCugarGsDldDntryDplesDrierEtneyDscousCventryCwboyGsDsCxCyoteBrack1FerDigDppEsDshcourseDwfordCeateFionGveDditDosoteDscentDtinDwCicketDminalDstinaConusDssDwEleyCugDiseDsaderCystalBs-eeCc298D412Die-ciCeeChrcBthreepoDulhuBudaDdlesCervoCmCnninghamDtCongCpcakeCrmudgeonDrentDtEisCstomerEsupCtDdownDieFpieDlassByberFpunkCcloneCnthiaCranoDilAdaddyCebumDdalusDhyunDmonGicGsCggerG1CilyDnDsieEyCkotaCleDiborEtDlasDtryDuCmeDienDmitDogranEnDrongsCnDaDceFrDeDgermouseDhDielG1GleDnaEiEyDteCphneDperCqingCrinDk1EmanEstarDrellFnEinEowEylDthFvaderDweiEinDylEouchCshaCtDaE1EbaseEtrainDooCveDidF1FoviFsEsCwitDnCyDtekBdanielrodDyCdDdEdFdGdHdBe'anCadE-headEaheadEheadGdDnEnaDthFstarCbDasishDbieDorahDraCcemberDkerCdheadFdDiCeDdeeDpakEfreezeEseaFixFpaceEthroatDznutsCfDaultDenseDoeCkaiClanoDeteDiverDnazDoisDtaDugeCmeterDoEnFicFsCnaliDisFeDnisEyDverCpecheDtCquinCrekDluenDrekCsareeDertDignEreeDkjetEtopDmondDperateDtinyCtleffDroitCutschCvDadminDelopEnDiceElFinsideEneDonCwDayneDeyDydecimalCxterBgjBhanDrmaGraCirajBiabloDgEsDlE-inFupEinEupDmondHsDnEaEeEnFeDzCckEensEheadEtracyCdCegoDselDtEerCggerDitalH1ClbertDipDlweedCmDitrisDwitCnaDeshDnerCpakDlomacIyDperDstickDtaCrect1GorDkCscEbrakesEjockeyEoFveryDkDneyCxieDonBoCanCcDtorDumentCdgerGsCesCgDbertDcatcherDfightDgieEyCitEnowCllarGsEyDphinHsCmainDenicoDinicHkGqueFoCnD'tDaldDeDgEmingDkeyDnEaDtknowCobieDfusDgieDkieDmE2DnDrsCpeyCrabEiDcasDiEsEtDkDothyCsCubleDdouDgEieElasCwnEtownBr.dementoCaftDgonG1GflIyGsDwDxoDzenCeamFerFsGcapeDwCillpressDnkDppingDverDzztCnoCopE deadEdeadDughtCugnigDmEsCydenBuaneCckEieEsbreathFoupCdeDleyCkeE letoEletoClceCmbassCnbarDcanDdeeDeDgeonsDnCplicateCstinEyCtchFessBvlinsideBwainDneDyneCightBylanAeB-mailBachCgerDleF1FsCrlDthCsierDterGnEonDyEcomeEgoElayCtDmeDshitHandBckartClipseBdCdieCenCgarDesCinburghDthCmundCouardCuardGoCwardGsDinFaBe-csCcsCeDeEeFeGeHeCyoreBffieBggheadBiderdownCeioCghtCleenCnsteinCrikBkaDterinBladioDineDnorCectricDmentDnaEiDphantCiDasDna1DotDsabetEsaDzabetIhClaDenDieEotGtEsCmiraDoEotazDstreeCoiseCsieCvinEraEsCwoodDynBmailCeraldCilEeEioEyCmanuelDiEttCoryCpireDtyhandedGeadedBndaEhCemyDrgyCgageDineGerDlandCigmaCriqueCterFpriseDropyCzoDymeBrateaCenityChDardCicE1EaEhDkEaDnClingCnestGoDieF1DstCoticCsatzCtyuiopCvanBscortG1CfandiaCmondCpanolCtablishEteDelleDherBtCaoinG shrdluGshrdluCeeDrnityChanCoileBuccDlidCgeneCngDjiCropeBvaDnEsCeDlynDrafterEyCieBxavierCcaliberHuIrDelEptCploreHrDonentErtDressCtensionCxxtremeByalAfaceDultyCilDrviewEwayEyringDthClconDsestartCmilyG1CncyDgCrDahDetheewellDflungDgoneDhadDmerEingDoutDrellDsideDukCsihuddDtEbreakElaneCtanehDboyDcatCustCyeEzBearlessCbruaryCedbackEmeCliciaEksEpeExCnderDrisCreydooDgusGonDmatDrariEetEisBffDfEfFfGfHfBghBictionCdelFityCeldCgaroDleafCleEsystCnanceDdDiteDnConaCreEballFirdEmanEnzeEwalkDstCshE1EerGsFsEheadEieFngDtCtnessCveBlakesDmingoDndersDshCdCeaDmingDtchGerDursCightDpEperCoatDphouseDresEidaH1DwEerGpotGsDydCuffyDteCyDawayDboyDerFsDingGfuckGleapBoghornCnDgCoDbarFzDlEproofDtEbalHlCrDamDbiddenDdDearmEsightFtDkedtoungeDmatDrestDsytheDtuneDwardCsterCulplayDndEtainDrEierEwheelEyearsCxDtrotDyladyCzzieBramemakerDnceGsHcIoFineGsHcFoisEkFaFenfurterFieFlinFnfurterDtCeak1FbrothersDdEdieFyEericHkEricDeEbirdEdomEmanDnchG1GfriesDshbreadFmeatCidayDedricEndGsDghtenDscoDtzCodoDgE1EgieHsFyEsDmDnt242FierDshmeatEtyBtpBubarCckE-offFyouEaduckEedFmFrEfaceEingFtElegEmeEoffEuEyouCgaziCllCnDctionDgibleEuyDkyDnyDtimeCrballCtureCzbatDzEballGtAgabbyDrielHlDyCdDiCelicCgeCilClaEgaExianFyDenDileoCmalDbitElerDesDmaphiCnapathDdalfDjaCoyuanCrciaDdenEnerDfieldEunkelDgoyleDlicDnetDpDrEettEyDthDyCshDmanDtonCtewayH2DorF1DtCussDtamCveEnDrielBedankenCminiCneEralEsisDiusCofEfFreyDrgFeG1FiaGnaCraldErdGoDdDgoryDmanGyH1DonimoDryDtErudeCtD fuckedElaidFostEstuffedDfuckedDlaidEostH!EuckyDoutDstuffedBgeorgeCgDgEgFgGgHgBhandiColamalDstBiancarlEtsCbbonsDsonCffyCgiClDbertDgameshDlesDmanCnaDgerGsDoCovanneCridharDlEsCselleCuseppeCveCzmoBlacierDdysCenEdaEeaglesEnCider1CobalDriaBmoneyBnuDemacsDsBoC awayH!Dfuck yourselfDjump in a lakeDto hellCaheadDlieDtDwayG!CblinEueCcougsCdDfleshDivaDzillaCesDtheCfishDoritDuckyourselfChomeCingCjumpinalakeCldEenEfingerGshEieDfEerEingDlumCneDorrheaDzalesHzEoCoberDdE-luckEafternoonEeveningEfightEgriefEjobEluckEmorningEtimesEwifeDfusEyDnightDseCpalonDherDinathCrdanEonDgeousFsDogCslingDonDtraightCtDoE hellEhellCugeDldCwestBraceDemeDhamEmDilDmpsDndmaEtDphicHsDtefulIdeadDvisDyEmailCeasyspoonEtDedEnFdayFlineEtingDgE1EgEoryDmlinHsDtaFlEchenEeFlEzkyCiffeyFinDpeDssomDzzlyCoovyDupDverDwCumpyCyphonBsiteBucciCenterDssEtCidoDllermDnnessDtarG1ClukotaCmbyDptionCnnerDtisCozhongCpiCrjotDuCsDtavoCyBwenBymnastAh2opoloBaCckEedFrCdCfidhDtanCggisChaCiDboDleyDrbagGllEilCkanClD9000DlEelujahEoFweenHllDtCmidEltonDletEinDmerGedEondDptonDsterCn-gyooDdilyEwaveHingDkDnaFhDsEelEoloFnEpeteCoCppeningEyF1G23FdayFendingCrdE2seeEcoreEdiskEiFsonEwareDkaraEonnenDlanEeyG1EotsDmonyDoEldDrietFsGonEoldEyDueEoDvardEeyCsDokDsanCttonCuhuaCveDivahCwaiiDkEeyeH1CyesCzelBeC'sdeadIjimCalthG1DnDrtFbreakFsDtEherH1H2DvenCbridesCctorCdgehogCeDralalDsungCidiDkeEkiDnleinErichEzClenFaFeDgeDlEoF1G23F8FhelloDpE123EerEmeCmantCndersonErixDningDryCrDbEertDeDmanEesDnandezDpesDsheyDveDzogCsdeadHjimCungCwlettCydudeDthereBhhDhEhFhGhHhBiawathaCberniaCddenCghlandFifeClarieDbertDdaDlEaryEelCmCroguchEkiEoEshiEyukiCsDtoireFryCtchcockDhereDlerBoaDngCbbesEitCckeyG1DusF pocusF-pocusFpocusCkClaDdDeDidayDlyDyE grailEgrailEshitCmayoumDeEbrewErFjEworkCnDdaF1DeyDgEkongEphucEtaoDkeyCodlumDkerGsDpsDsierDtersH2011EieCpeDscotchCrizonDnetGsEyDrorDseFsDusCsannaHhDeheadDtCtDdogDlipsDrodDtipCucineDseFwifeEtonCwDardG93DellDieBplabBsinDuwenCpiceBuangDshengCbbaFhubbaDertCdsonCeyCghEesDoDuesCiyingCmmerCndtDgEmokDterEingCongCrtCsbandDkersEiesDtlerCtchinsCuCyenCzurBwansooBydrogenFxylCeCmanCoDnDungCukAiB'mokFayBabgCnBb6ub9CanezCeleiveEieveCmDpcFatFxtDsuxCrahimBcapCecreamDmanConBdenticalCiotContknowBfC6was9CorgetFotBgnacioEtiusCuanaBhackedDoDteyouCtfpBiiDiEiFiGiHiBkonasCuoBlanCmariCoveuFyouCyaBmageEineCbroglioCinCokEayCpactElaDerialCslBnCcludeCderpalDianGaEgoEraDonesiaDraCfoErmixCgemarDmarDoDresGsEidDvarCheritthewindCigoCnaDocentFuousCsaneDertionDideEghtDtEallEructCtegraHlElErcourseFleafFnGetFracialDoDrepidCvinoveritasEsibleEteCxsBoanaCmegaCngBraCelandDneFeCfanCinaDsEhFmanClandeCmaDeliConmanCulianCvingBsCaDacDbelGleDjokeCelChmaelCiDdoreDlDsClandCmailCraelDealCsamCtoBtC'sajokeEokGayCaliaEyCsDajokeDokFayDy-bitsyEbitsyCty-bittyEbittyBuytrewqBvanCyBzzyAj0kerB1l2t3BackEieG1EolanternEsonDobDquelineGsCdeCeDgerDjinCggerDuarChanshiCiDkEneEumarDmeDnCkeEyDovCmaicaDesF1FbondDieElahEsonDjamCnDaEkiDeEkElEtDiceEeDnEaEyDuaryDvierDyCpanFeseDonCredCshoEvantDminGeDonF1DpalEerCtinCvedDierCwsCyDantaGhDneDsonCzzBeanE-baptisteFclaudeFfrancoisFmichelFpierreFyvesEandaEclaudeEetteEfrancoisEineEmichelEneFieEpierreEyvesCdDiCepcjG7EsterCfDfEeryEreyH1ChanClloEystoneCnDiferDkinsDnEiFeFferEyF1DsEenCrDaldDemyDomeDricFmyEyDseyCsseF1EicaFeDterDusF1FchristCthroGhGtullDta1CudiCwelsBiCachenDnEliEnEpingEwenCeChongCkunCllCmDboFbDiDminEyCnDgDshengCongCseongCtendraCxianBjjDjEjFjGjHjBkl123D;CmBnyeBoanEieEnFaFeDquimCcelynCdyCeDlEleDnaDrgDyChanFnGaH1DnE316ElennonEnyEsonCinE for freeEforfreeCjiDoCkerF1CleCnDathanDellEsDgE-iEguDiDnyCrdanG23EieDeanDgeCseEeEphDhEuaDiahEeCurEneyCyDceBsbachBuanCbileeCdasDiEantoEcaelEthDyCggleChaniCiD-fenDcyDlletDnClayneDesDiEaF2FnGaGnEeF1FnGneFtGteDyCmanjiDboDeauxDpE in a lakeEinalakeCnDeEbugDgleDiEorEperCpingEterCssiDtEdoitEeEfortheEiceH4FnG1GeCttaBvncByhAkacyCdoshCiCkaDogawaCl007DamazoEppaDiDyanEnCmCnDgEarooCosCraEleeDenF1DieEnFaFeDlDmaDyEnCseyDhtanCtDeErinaDherinIeEiEleenEreenFineFynEyDiEeF1EnaDrinaDsufumDydidCvehCyDlaEenBcinBeciaCeDpEerEoutDsChCithF1CllerFyEyF1DseyCnDdallDjiDnedyFthEyDobiDtEonDzoCralaDberosDiDmitDnelDriFeEyFaCshavDterCtanDchupCvinF1CwlCyDboardDpadBhanEhDyrollCoanhDiDngDsrowCuehF-hoDrsheeBianEgEuschDtCdderDsCeuCllerEmeDroyCmDberlyDmoDonCndEerDgEandiEdomEfishElearEsDsonCpCranDkElandDstenCssEa2EmeCtkatDtenG12GsEyFcatCwiBjhgfdsaBkkDkEkFkGkHkBlausCeenexCingonHsBnickersFsDghtGsCowCuteBoalaCichiCjiCkakolaDoCmbatCngjooDradCokCrdaBraigDmerCisEhnaHmEtaFenFiGeGnHaHeFyCystalFynaBunCoCrtBwanEgCokDngByahnCeongsoCleCraAlab1DtecCcrosseCddieDiesDleDyEbugCgerCidCkeErsDotaDshmanClitFhGaCmDbdaEertDerDinationCnDaDceFrDdryCpinCraDissaDkinDryF1DsonCserFjetDsie1DtEangoEtangoCtenightCughDraFeFmaeEelFnGceGtGzEieFndaEyCwDrenceDsonDyerCzareFusBeaDderDfDhDnnFeCbesgueDlancCd-zeppelinDdzeppelinDzepGpHelinCeCgalDendErChi3b15CisonEureClandCmonCnDaDnonDoreCoDnEardEceEidCroyCsDbianDlieDpaulDtatEerCtDiciaDliveDmeinDoDsgoDterGsCvCwisCxus1CzBiCbDertyDraFryCckEerDorneCenDwCfeCghtFsCkeCllianEyDyCmaDitedCnDcEolnDdaEsayFeyEyDgDhConEelEkingEsCsaDeDpDsabonDtCtterboxEleGhouseGshitIopGtoeCveEandletliveEnletliveErpooIlEsDiaEngCwanaCzDaErdDzyBjfCiljanaBkjDasdDhEgFfGdsDlkjBlewellyClDlElFlGlHlCoydBmnopBochDkEoutCgDanDgerDicalEnDosEutCisElaneCkeDiClaDitaDopcCndonDelyEstarDgEcockEerEhairFornErestEtoungeCokDneyDseEingCpezCrenFzoEttaDiEeEnDnaDraineEieDyCserDtCtfiDusF123CuDieEsFaFeDnetteDrdesCveElyEmeErFboyFsEyouCwgradeDlifeBpCadminBsdBtteBuanaCcDasDiaEeFnEferElleDkyF1G4FbreakFladyDyCigiDsDzCkeCluCmiereCnarlanderDdiDeDgCongCtherBydiaEeCleCndonDetteDnEeAmB1911a1BaartenCcDhaEineDintosIhDkDrossDse30EymaCdDboyDdieEockFgDeEleineGneFineDhuFsudDisonDmanFxDokaEnnaDyCgdalenDgieEotDicF1EqueDnumChbubaDeshDlonDmoudCiDaDdenDlEerEinglistEmanDneEsailEtCjorFdomIoCkeEbreadEdrugsEitGsoEloveEmeFydayEpeaceEwarDingitGloveDotoClcolmFmDibuDlardCnDagemeGrEhilDbatDchesterDdyDfredDgeshEueDiEshDoharEjEnDsetmanisEonDtraDuelDyCplesyrupCraEthonDcEelGlaHeHinEhEiFaFoEoEusEyDdiDekDgalitFretGidHtFuxEeFauxEieEoEueriteDiaF1FhG1FnGneEeF-madeleineFlleFttaHeElynEnaFeGrFoEoFnEposaEtialEusDjoryDkE1EetEoEusDlboroEenaGeFyDniDriageEucciDsEhalHlDtEhaFeEiFalFnG1GeHzGienHqEyDvinDyEamFnnEjaneDzecCsahiroDeDh4077DoudDsEcompDterG1GsDuhiroCthE-csEildeDildaDrixDtEherGwFiasGeuEi1FnglyCudeDiDreenEiceGioEoCvericHkCxDimeEneDmaxDwellHsmartCyDdayCzda1DinBeCaganDtEcleaverEloafEwagonCchEanicCdardDiaEcalCekieCgaEdethEnDgieCisterClDaineEnieDinaFdaEsaFsaDlaEonDodyDtinCmberGshipDoryDphisCnDdelDsuckCowCrcedesFrErediEureGyDdeDesDlinEotDmaidDrellEillEychristmasCtalFlicDroDsCxicoBgrBiamiCchaelH.H1FlEelG1GeGlHeEiganEouEyDkelFyG1EyDroFsoftCdnightDoriDvaleDwayCghtDuelChailDranCkaelDeE1EyDiDkoClanoDdredDesDindDkDlardEeniumFrEicenFeFonDoDtonCmiCndyDeEdErvaDgEheDhDimumDnieDotEuDskyDyeCracleEgeEndaDiamDrorCsanthropeDhaEkaDogynistDsionFrliEyDtyCtDchFellDtensBmmDmEmFmGmHmCouseBnbDvEcFxGzBobileDydickCdelsEmEsteDulaCgensDulFsChamedFmadGedEnCisesEheCjaDoCllyF1DsonGgoldenCmCndayDetEyF1DiEcaEkaEqueEtorDkeyG1DopolyDroeDsterDtEanaH3EhErealFoseEyCocowDkieDmooDnEbeamEpieDreEhtyDseFheaIdCparCraDeEcatsDganDleyDoniDpheusDrisDtEimerEsCseDheCtherDorFolaEwnCuDntainDseF1FmatEumiCviesCwgliCzartBr.DrogerCcharlieCgoodbarCwonderfulBt.xinuCichellCxinuBuad-dibEdibDmadinCchCffinChDammadCkeshDundClderG1CnaishDchkinDdeepCrphyDrayCscleDicFboxEmDtangH1CtantByCcroftxxxHyyyCpasswdHordCraDonDtleCselfDmutCungF-yuAnabilCdegeErDiaEneCftalyCgelCissanceCkamichiCliniCnDcyDetteComiDtoCpoleonCrcisoGseDendraCsaDcarDtyCtDachaEliaGeErajaEshaDhalieFnGaeGieDionGalIeEviteCuticaCveenEtteBcarCc1701HdHeCrBe1410sE69Ea69CalDrmissCbraskaCckrubCdCenieCilCkoCllieDsonCmesisCnaCpentheIsDtuneCrmalCsbitGtDsDtleEorCtDlinksDmgrDscapeDwareEorkHsCutrinoCvadaDerDilleCwDaccountDbloodDcourtDkidGsDlifeDpassDsDtonDuserHsDworldDyorkH1CxtDus6BghiCocCuyenBicaraoDholasGeDkElausDolasFeCelCgelDgerDhtmareFshadowFwalGindChaomaCkeDhilDiEtaDkiDolaosClsonCmhDrodCnaDersDoEnDtendoCrvanaH1CssanEeCtaDeBnnDnEnFnGnHnBoCamCbodyDuhikoEkoCelCfunCkiaClanCmoreCndetDeE1CpassCraDbertDeenEneDikoDmaFlFnDthwestEonCsecretDhirCtDebookEsDgayDhingDreFspassDta1DusedCuveauCvacancyDellEmberGreCwDayCxiousBroffBssBuclearCggetCkeEmCllCmberG1G9GoneGsCrseEieCtDmegDritionCucpByquistAoaCtmealCxacaBbiD kenobiEwan kenobiD-wanDwanCsessionBceanFographyDlotCtaviaDoberFreBdetteCileEonBfCfDiceBhshitCwellBicu812ClCvindBjrindBldDladyDpussyCinDveFrFttiEiaFerClieCsenBmeadDgaBnCceCeCionringsClineDyCstadBooDoEoFoGoHoCpsBpenEbarEdesktopFoorEsaysmeFesameEupDrEaFtorCusBrCacleDngeGlineGsCcaDhidCegonDoCgasmCionClandoCvilleCwellBscarCirisCullivaCwaldBtharDerCterDoBu812CrCssamaCtDlawDtolunchBverEkillEthrowFimeBwenCnDsBxfordBzzieDyApaagalCcersDificGqueDkardEerGsEratCdDaaaDdyDmaDoueCgeCigeDnlessEtFerCkistanCladinDlabDmerDomaCmDelaDpersCncakeDdaEoraDicDteraEherEiesCpaDerFsDiersDpasCquesCradigmEllelEnoiaEskevDfaitDisDkEerEinsDolaDrotDtEnerEonDvizCscalDsEionEwdForHdI1IlookhereCtDchesDelErneDriceGiaGkFotsDsyDtersonEiEonEyCulEaEeEinGeCvelCwanCymanEentDtonBcatCxtBeaceEhFesDnutGbutterGsDrlFjamCbblesCcheFurHsCdroF1CeblesDweeCgasusDgyChCkkaClagieCncilDelopeDguinDisDnyDtecoteEiumEtiCopleDriaCpperDsiCrakaDcolateEyDesEzDfectEormaDryDsimmonEonGaDvertCteErF1FkFpanFsonEyDuniaCugeotDrBgonderinBhamDntomCialphaDlEipGpeGsElipHsDshFyCoenixH1DneDtoCrackDeakDickCyllisBianoF1FmanFsCcardEssoDkEleDtureCerceEreDterCgeonDletCmpCnDgDkEfloyIdConeerDtrCpelineEorganEr1CrateDieCscesCtCzzaBlaintruthDneFtDtoDyEboyEerGsEgroundCeaseCierCoverCughDmbrandyDsDtoFnCymouthBmcBocusCeticEryChCirEeDssonHsDuEyFtGreClarFbearFisDeDiceEticsDlyDoDynomialCmmeCnderingDtiacCohEbearDkeyEieG1CpcornDeEyeDpyCrcDkEyDnEbayEmanEoFgraphyDscheH9I11J4DterElandEnoyCstelFrCwellErFtoolBppDpEpFpGpHpBrabhakaFuEirDdeepDiseDnabDsadEhantDtapEtDvinDyerCeciousDdatorDludeDmierDsenceGtEidentEtoGnDttyGfaceDvisionCiceDmusDnceGssGtonEtFempsGrFingDscaDvEateEsCoducersDfE.EessorEileDgramDmetheIusDnghornDpertyDsperDtectFlEozoaDviderCudenceBsalmsCychoBubDlicDusCckettCddinCllDsarCmkinpieDpkinCneetDkinCpDpetEiesEyF123CrnenduDpleCssyF1CtByramidDoCthonAq1w2e3BedBianCnsongBqqD111DqEqFqGqHqBualityCebecDenFieDntinDstCocBwaszxCerEtFyG12GuHiAr0gerB2d2BabbitG1CcerFxDhelGleEmaninoffDingDoonCdarDhaDioCfaelDfiDikiCghavGanEuDunathCidEerGsHofthelostarkDmundDnEbowEdropDssaEtlinCjDaEdasaDeebFvEndraDivCkeshCleighDphCmDachanEnaFiEraoDboF1DeauxEshDirezDonCnDcidDdalGlEolphFmEyF1DgerGsDjanCoulCpDtorCquelCscalDtaF1FfarianFmanCtDioCvenFsDiCyDmonaGdBeadEerEingDganDlEfriendEityElyEthingFimeCbeccaElsDootCdDbaronErickDcloudDdogDfishDlineDmanDrumDskinHsDwingEoodCebokDdDferCgDgaeEieDinaGldEonalEsCineCliantCmemberDiDoteDyCnaudFltDeEeEgadeDgarajCplicantDomanEnseDtileDublicCquestEinCscueDearchFuCtardCvolutionCxCynoldsCzaDnorBfsBhettCinoCjrjlbkConaEdaBiacsCbsCcardoH1DcardoDhEardH1HsIonEmondDkEiEyCddleDeCff-raffErafHfDrafGfCghtCleyCngoCpperEleCscCtDaCverFaDiBjeBoadE warriorErunnerEwarriorCbDbieEyDertG1GaGoGsDinFhooIdFsonDleyDocopEtFechFicsDynCcheFlleFsterDkEetG1EieEnrollEonEyF horrorF1FhorrorCdDentEoDgerDmanDneyDolpheDrigueIzCgerF1FsChitCiCknyClandGeDexDidexDlinCmDainEnFoEricDeoDmelDualdElanHsDyCnDakEldDenDiEnEttCokieDsterDtEbeerCpingCsaElieDeEbudElineEmaryEsDieEneDsEignoCthCugeEhDletteDndDte66CxanaDyCyDalFsBrrDrErFrGrHrBsmBtiCwoEdtwoBubenDyCdolfDyCeyCfusCgbyDgerEieriCknetClesCnDnerEingCoxinCshDsEelGlDtyCthEieElessCxCyDeByanCoheiDtaAsaabE900H0EturboCbbathDinaFeDrinaCcreCdeDieCfaaDetyG1DwatCgittaireCiDdDfallaDgonDkumarDlingEorDntFeCktiDuraClD9000DahEsanaDesDleEyDmonDomeEneDutCmDadamsEnthaDediDiamErDmieEyDpathEleGrEsonDsamEonDtaneyDuelEraiCnchezDdersHonEgorgEiEraFineEsmmxEyDfranHciscoDgEbangEoDhDiDjayEeevEoseH1DtaEiagoFsukEoCphireDphireCraEhF1DojCshaEiDkiaDsyCtoriDurdayFnG5GeGinCulDvignonCvageDeCwedoffCxonCyBbdcBcamperDrecrowEletHtChemeDnappsDoolDroedeCienceDubbaCoobyGdooEterH1DrpioHnDtEchEtF1FieFyDutFsCreamDofulaEogeDuffyCubaF1DmbagBdfghjklBeaDbreezeDnDrchDttleCbastienCchangDretG3DurityCeDkerDmeChoCiDgneurDveCkharClftimeCmperfiCnditDiorDsorConghooDulCptembeIrHreCquentCrenaFityDgeFiFyDverEiceHsCsameGstreetCthDupCungFhyuFkuCvakDenF7ErinCxDfiendDxxmeDyEteenCymourBhadowG1GsEysideDeDggyDhrokhDkespeareDllEomDmitaDnEaEghaiEnanFonFyEtanuFiDolinDradEcEiFynEkFsEleneEonEraDshankFiEtaDunDvedFnDwEnDyneDzamEzamCeDbaDelaEnaDffieldDilaDlEbyEdonEiaElFeyFyEterDnEgFluDpherdDrifEriGeFyEylCiDahnDdanDgenarFoDhEmingDmonDnEobuDpDrinElFeyDtE-headEfacedForbrainsEheadDueDvaFpraEersDzoomCleeDomoCoesDgunDlomDmitaDoterDrtyDtgunDutDwEerEoffCrdluDeeramCuDangDhuiDnDtdownEtleCyngBidDartaDekickDhartaDneyDoineCemensDrraCgmachiDnalFtureCllywalkDverGeEiaCmbaF1DmonsDonDpleFyEsonHsDsimCnaEtraDgEerEleCobahnCriEusCsterCtDeCupingCvakumaCxDtynineCzenineBkateFrCeeterCibumDdooDingDnnyDpEperH1FyCullDnkCydiveDlerDwalkerBlackerDyerCeazyDepFyCickDderDmeballDnkyDpCusDtBmallFcockFhipsFtalkGipsDshedFingCegmaCileF1FsFyDthFsEtyCokeFdhamFyDochDtherCurfyDtBnafooEuDkeFsDppelGrFleDtchCeezyDllCickerHsDperCoopFdogFyDrkydorkyDwEbalHlEflakeEingEmanEskiCuffyBoCapCber1CccerG1EorDrateHsCdD offDoffCftEballClangeDeilDomanFonCmanEsamaDbreroDeEbodyCnDdraDgmiaoEnianDiaEcFsDjaDnyDyEaConEmanDwonCphiaFeEomoreCrelDoorCssinaCtirisCuaDmitraDndDrceEireFsEmilkDvenirBpaceFmanDinDmDnishEkyDrksFyErowHsEtanDzzCecialEterFreDechEdFoFyDnceGrChDynxCiceDderGmanDffFyDkeF1DritGuHsanctuEoFsDtEfireClifFfCockDngeDokyElerEnDrtsDtCrangDingGerEteDocketCudDnkyDrsCyrogyraFsBquashDiresFtBridharDmatDnivasBssDsEsFsGsHsCuBtaceyEiFeEyDinlessDlkerDmosDnEislasEleyFyEtonDrE warsE69EbuckEgateElightEsFhipEtFerFrekEwarsDtEesEionEusCealthDelFeGrsDfanGoDllaDmpleDphF1FaneHiIeHyFenFiFonDrlingEn93DveF1FnG1GsFrDwartCickshiftDffdrinkFprickDmpyEulateDngF1FrayEkyDversCocksDneDpDrageEemEmFyCrangeHrGleEtFfordFoGcasterEwberIryDetchDiderDongCtngCuDartDdEentH2EfuckEioElyDffedHturkeyDmpyDpidDttgartBuCbgeniusDhasEdailEednuDodhDscriberDwayCccesGsDkEerEmeErocksEsCdeshnaDhakarEirDirCeDsecCgarFbearDihCkumarCltanDuCmmerEitDuinenCnD-spotDbirdDdanceFyDfireEloweIrDgDilDnyF1FvaleDriseDsetEhinHeDtoolsDweiCperFflyFmanFstageIrFuserFvisorDportHedDraCranetDeshDfEerEingCsanF1FnaGeDhaEilaDieCttonCvenduDroCzannaGeDieDukiDyBvenDrigeBwampratDneEsonCearerEtshopDdenDetieFnesFpeaFsFyCimEmerFingDngsetDtzerCooshDrdfishByamCbaseDilCdneyClvainEereFsteHreEiaFeCmbolDmetryDultCphilisGlisCsD5DadmGinDdiagHsDlibDmaintFnEgrDopDtemG5GfiveGvFstDvAt-boneBabDathaCcobellCdahiroDlockCffyCiDwanCjenCkDaEjiEshiDeE5EfiveEiteasyDujiClonCmDalEraEsDiEeDmieEyDtamCndyDgerineEoEuyDiaDjuDkerDnerDyaCoCpaniEsDeCrDaDdisDgasEetDheelDragonDzanCshaCtaDianaDsuoDtooDumCureauEusCyfurDlorCzdevilDmanGiaBbirdBchenCp-ipD/ipDipBeacherHsDkettleDpartyCchEnicalFoCdDdiEyF1FbearCeDnEagerEeyEfanEyCflonClecastFomEphoneDlDnetCmpEoralEtationFressCnDnisDtationCquilaCresaDiDminalDreEiFllEyF1CstE1F23E2E3EcaseEerEguyEiFngEtestEuserCtrisDsuoCxDasBgifBhaddeusDilandIeDnEasisEhEkFgodFyouDtEcherDvyCeDatreDbeefEirdsEossEutlerDcleDendDgreatescapeDirDjudgeDkingHandiDloraxDmEanEonkeyDnDodoraHeEphileDpenguinEroducersDreFalthingFsaGeEiddlerEonDseDyCiamDbaultGtDckcockFheadFskinDerryDlakaDnkEthighsDsEisitCoiDmasEpsonEsonDrneEstenDseCrasherDeeCuDmperDnderHbIallIirdHdomeDrsdayDyCx1138BianCffanyCgerF2FsDgerDhtassFcuntFendFfitDreCjunCkaCllCmDberDeEzoneDothyCnaDgDkerGbellDmanDtinCreswingCtanicDsCwCzianoBjahjadiBntBoCbiasDyCdDayDdCgetherDgleChruCkyoClkeinEienCmDateFoDcatDmyCneDiDyCoDlDsillyDtsieCpcatDgunDherDographyCrDcDnadoDontoDresDstenDtoiseEueCshiakiFbaFterDnowCtalDhedarkDo1EtoCucanDficDrDssaintCveCxicCyDotaDsrusBraciFeEtorEyDilblazerFerFsEningDnEsexualFferGigurationFitFmitFportDpdoorEperDshFcanDvailEelEisCeDasureDborDeEsDkDntDvorCiDalDbbleHsDciaEkyDdentDeuDnaDshFaEtanDtonDvialDxieCoffDjanDmboneDnDphyDubleEtDyCucEkFerFsDefriendEloveDmanEpetDstno1CyDaBseCingF taoF-taoFtaoCungDtomuBttDtEtFtGtHtCyBuanCbaEsCckerDsonCesdayClaDlCnasaladGndwichComasCrboF2DnerEleftErightDtleCttleCyenBwat123CeetheartFyDnexCilaDnsCoBylerF1BziDlaCuwangAudayCoBhnD-soonDsoonBliCricFhCtimateBmeshBndeadErgradJuateCguessableChappyCicornFsDformEyDgrafixDqueDtedEyDxE-to-unixHunixEmanEsuckGxCknownDownCtungBpCchuckConCperclassCsilonDtillCtohereCyoursBranusCbainCchinCsulaBsCaCeDnetEixDrE1EmaneEnameEsBtilEityCopiaCpalBucpCuDuEuFuGuHuAvacationCderCheClDentinIeErieGoDhallaDleyCmpireCnDceDessaDillaCrkeyCsantGhDonDsilioCughanBectrexFixCdayDderCeCljkoDoDvetCnceslasDdrediDetoDiceDkatGadHrGesDtureDusCrDilogDmontDnonDonicaGqueDseauDtigeGoDyCteransDteBianneyCbekeDhuDratorCcesquadDkiFeEyDtoireFrG1GiaHenGyCdeoCergeCgyanCjayFaCkingGsDramCllaFgeDmaCnayDceFntH1DitFhaDodFhColetEinCperF1CragoDgilFnGbirthGiaHeHoDusCsaEvisDhvjitDionEtFationForDpiDualDvanatCttorioCvekDianGeEenBjdayBladEimirCsiBmCsDsucksDucksBojinClcanoDleyGbDvoCodooCrtexCyagerBt100C52BvvDvEvFvGvHvAwadeCiDtingCldenEoDeedDidDkEerDleyeEyDterCnDdaEojoDgDkEerDtEmenowCrcraftDdDezDgamesDlockDmEweatherDnerDrenEiorHsDsDthogCsDhEingtonCterF1FlooDsonCvesCyDneF1BeCaselCbDetoysDheadDmasteIrDsterCdgeCenieEyDzerCiDdongDhengDnrichDpingClchEomeH1DlDsherCnDdelGlEiEyF1DgyikDtCreCsDleyDternCtBhale1FsDtEchamacallitEeveHrEnotEsupHdocCeelingFsDnDreFisthebeefFsthebeefDyCichDskyDtEeEingEneyCoDcaresDlesaleDopieFyDreDvilleCyBibbleCckedClburDdcatFhildDfriedDlEenEiamH1HsIburgFeEowEyDmaDsonCnD95DdEowGsEsurfDfredDgDnerEieGthepoohDonaDstonDterCredCsconsinDdomDhCthDnessfortheprosecutionCzardGsBojtekClfE1EgangEmanDverinIeFsCmanDbatG1DenCnDderGboyHreadDgDyunCobieFnEyDdElandErowEstocEwindEyDfwoofDiyiCpperkennyCrdDkDldDmwoodCuldBqsbBranglerCestleCightDteBunDtsinBwwDwEwFwGwHwBxyzByldchydCnneComingAx-filesCmenBanaduDthCvierGeBcountryBferCilesBgenerationBiCaoEboEgangEliEminCnghaoDuBmodemBrayBueDqingBwindowsBxfreessxxCpassxxCsnowxxCxD123DxExFxGxHxByzD123DzyAyBabbaF-dabba-dooFdabbadooCcoCelCmahaCnDgDjunDkeeGsCominCserBeeClloFwGstoneCngConEgCziBiannisCgalChuaCnDgEshaEyangCshunBodaDudeCgeshDibearCichiClandaCmamaCnDahDgEdongEhoFwanEsamCsemiteDhiakiFoCuD'reokDareokDcefDhanseDngDrEeokEselfBuanCehwernCgangChCjiEkoCkaDkeiDonCmiEkoCngCqianCvalBvesDtteConneByyDyEyFyGyHyAzacharyDkCpDataDhodCryBebraFsCna69DerFdiodeDithCphyrDpelinElinCusExBhaoqianEzhuaCengkunEyanCiDgangDshunDweiDxinCongguoFminBiggyDzagCmmermanCnfandelCtaCvCyouBmodemBoltanCmbieCndaComerCranDkEmidDoDroBuluBxcD123DvEbFnGmBz-topCtopCzDzEzFzGzHz";
document.Common_Loaded = 1;

// Compressed and encoded letter frequency table
var Frequency_List =
  'gL6-A$A:#@\'$KT#<c"06"8*"Wb"5-$Kr t%#f+"S4$7;$ v!R=%!6 g@#s}&\'P#rM"a8"K\'!3= #V }o wx*bZ"X="De#2 #~B!dL!\\\\"(u qj#Pf L_"e (1K$9--x6 SE"x- .$)/s%rK(w""QV"oQ ;; {_ [| q@(8t-G7#nU MW cS2$9 UJ GH <]*#S !: >!\'kQ \\Z @A)O8 5& E (L""YZ r_&g2 66 ~& *L!n* zO,|Y)B8 V.#X: qI\'V0 B7 s@4<B)>= I-$wt!;A =h ?G+y: p/ |k"}} &w"]?#72 W) j$ @w S !I700V\'gf (Q cf!9{9cL Qa .i #Z, F *M NZ!0c RX!+%((N S$ ]o#hU#{o Z2#j_ 6P d% I!!wX _Z.nH!i.!@y!6T#a$"Yt ?]!kv Jl"]{ sh!2$&x~"5F.8X AF!n2 :A1G@(\'.%5} 24!TZ XY \\P zq G,).J)>} GD _o Xu*di&m0!%Q  L-KA @I ei%4P <S 8m+NI l& Gg&m+"nS$T{%&? YT e( Mu g2 ~., B(\\P N6 .d .M:^6 gg"]s"k2\':6 LU /h#k_ 6-#$3%p9 W$ 7x&)(%_-">[#Q8 VM y( 3q c* vn/va-K> ^N Il LQ/y9 qF *< /k+^O zp K;"bZ!M\\!>(*NW L\' .-#=<"Uz$^:$o? C] F\' /)"+) FC+8H$M&!l1&2\'#n"&K<!d-#"_ jw A{ J(#~e$Yi#(v.Ng#NF!V8 zM"Q4*RH&.X E""n; ^5 41 gM!xj("Q1![ bn #!";?1la yU mR A6)GK @="w5!k$!bX"b[)K-!R) Mq Fl&uz Zx&p\\ <A X\' f&!B_ xj)GW.3F <G *5 .e-}6 (6 C-!U>)S< :r#=;#:C 9Q!xJ,7< w" Tp#*1%|F#Ze&JW Dn /$ ]("4( H{&>!.@h W[ .F"G}/#k :_ ,U ;$04E \\,!/P)h9!Hq f4( f S& 18 M^":\'#w|#]o 7= !# Y]"*4 YZ-<E0$]"B^ QO bn/$G )> zO e>-|+ \\? SY (d$nj b%)p+%aQ 2P oa!U\\ mp$x: S: *$ &.!9( 3-3KD&WW WG"jB\'`),:t I<\'T_ I=($C Pd!;M 5I 3a"h %_G $, .E (_%wZ(WC!*] w> "$ s} WT h;*Kd UY!JW")u",)"v6!AU"Mv RS"hZ "("Ya&e/%5S-w\\"/W#b1 lF*fp%a6$3c$aH#uf!e> cH!]v 58*En+r< Ic v< gh,&\\ +A ;a$2!)I. !8 :w$>E 2Q fH+LA$)$ Gl+NL"y9"43$30 "8 d% 8l u% cV$pm 6C 2O uH .S K@ $= DB B(!f6 =9 <R *I uH A@ dG )A `K NX 3L !sopL %: o1 h0 9/ (U(5?-Q8!&=!iX"f(0\\[ ~V!ii )\\,<? 2W!l*!}#"\\8#NX)pn S0 Iv!{M$Rs#A2#s"!$R k& ]J!Yi {#4jR%m` --$\\D ;(*>X ]K lS"H~\'c; ;K#hP!/^!(l !S#z+##d [H F\\%Z3/b-#)f /O c% 66!YO 2w+{3,}? {N I1  O3^6 !? xV"s5-3I `R wn (E wj Kq\';: KA XU&_\'#b|$<N$2C qX w# iu!yO Fr($1"T@"pg"eA#+3\'g<!w$":w `7$\\ !Z)#qf%I4%$x*pf!kN"/* T9(Z])+?&O5"9"!nP 2< {9 5q R-\'0~5)4 ^= j8 us9#/ @1 }3 Ul0+- U6 *K!&? +K!]p()0 Z$ va!e} Y< fl!rQ *) C( KJ#f4 $;\'v.5aO W` w*!A<0IC yG ru!KR-*/ <\\ ,-!&3!Ap&Jc\'+` V& s5"gB$gF!`>!B0 hO g. ;w"I5 |v7:@&:o %h#zz H"(wx tL rk!q\\*w9 {D Q-!T_!lF!O$%vF&cB 8 "Mp!SZ\'he!HP rq!>N"BA"Y3 wR8^U$.~ ee#K[";,#IZ ;f!KI!eE!XQ d-#s/$JY%Pz%/F$+Y#2$ XX#Ez\'5g$z9"9$!1y vB 51!La @T*\\f0)j ek L3!^@1t- II Zn m@,08 )0!-@!<-! |"Fp&Oj A& N_ U[ P>!-h$D` 3a!K\' `d#uc%';
document.Frequency_Loaded = 1;

// Javascript functions for the form
var Common_Words = new Array();
var Frequency_Table = new Array();

// The compression algorithm is very basic - the first letter is upper case,
// and it means to copy X letters from the previous word.  A = 0, B = 1, etc.
// So, if I had "apple apricot banana", it would compress to
// "AappleCricotAbanana".
function Parse_Common_Word() {
  var i, c, word;

  i = 1;
  c = Common_List.substr(i, 1);
  while (c == c.toLowerCase() && i < Common_List.length) {
    i++;
    c = Common_List.substr(i, 1);
  }

  word = Common_List.substr(0, i);
  Common_List = Common_List.substr(i, Common_List.length);

  if (word.substr(0, 1) == "A") {
    word = word.substr(1, word.length);
  } else {
    i = word.charCodeAt(0) - "A".charCodeAt(0);
    word =
      Common_Words[Common_Words.length - 1].substr(0, i) +
      word.substr(1, word.length);
  }

  Common_Words[Common_Words.length] = word;
}

function Parse_Common() {
  for (var i = 0; i < 100 && Common_List.length > 0; i++) {
    Parse_Common_Word();
  }
  if (Common_List.length) {
    window.setTimeout("Parse_Common()", 20);
  } else {
    document.Common_Parsed = 1;
  }
}

// The frequency thing is a bit more interesting, but still not too complex.
// Each three letters are base-95 encoded number representing the chance that
// this combination comes next.  Subtract the value of ' ' from each of the
// three, then ((((first_value * 95) + second_value) * 95) + third_value) will
// give you the odds that this pair is grouped together.  The first is "  "
// (non-alpha chars), then " a", " b", etc. " y", " z", "a ", "aa", "ab", and
// so on.  If you decrypt the table successfully, you should see a really large
// number for "qu".
function Parse_Frequency_Token() {
  var c;

  c = Frequency_List.charCodeAt(0) - " ".charCodeAt(0);
  c /= 95;
  c += Frequency_List.charCodeAt(1) - " ".charCodeAt(0);
  c /= 95;
  c += Frequency_List.charCodeAt(2) - " ".charCodeAt(0);
  c /= 95;

  Frequency_List = Frequency_List.substr(3, Frequency_List.length);

  Frequency_Table[Frequency_Table.length] = c;
}

function Parse_Frequency() {
  for (var i = 0; i < 100 && Frequency_List.length > 0; i++) {
    Parse_Frequency_Token();
  }
  if (Frequency_List.length) {
    window.setTimeout("Parse_Frequency()", 20);
  } else {
    document.Frequency_Parsed = 1;
  }
}

function Get_Index(c) {
  c = c.charAt(0).toLowerCase();
  if (c < "a" || c > "z") {
    return 0;
  }
  return c.charCodeAt(0) - "a".charCodeAt(0) + 1;
}

function Get_Charset_Size(pass) {
  var a = 0,
    u = 0,
    n = 0,
    ns = 0,
    r = 0,
    sp = 0,
    s = 0,
    chars = 0;

  for (var i = 0; i < pass.length; i++) {
    var c = pass.charAt(i);

    if (a == 0 && "abcdefghijklmnopqrstuvwxyz".indexOf(c) >= 0) {
      chars += 26;
      a = 1;
    }
    if (u == 0 && "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c) >= 0) {
      chars += 26;
      u = 1;
    }
    if (n == 0 && "0123456789".indexOf(c) >= 0) {
      chars += 10;
      n = 1;
    }
    if (ns == 0 && "!@#$%^&*()".indexOf(c) >= 0) {
      chars += 10;
      ns = 1;
    }
    if (r == 0 && "`~-_=+[{]}\\|;:'\",<.>/?".indexOf(c) >= 0) {
      chars += 20;
      r = 1;
    }
    if (sp == 0 && c == " ") {
      chars += 1;
      sp = 1;
    }
    if (s == 0 && (c < " " || c > "~")) {
      chars += 32 + 128;
      s = 1;
    }
  }

  window.status = chars;
  return chars;
}

function Set_Text(s) {
  var e;

  if (!document.getElementById) {
    return;
  }

  e = document.getElementById("passchk_result");
  if (!e) {
    return;
  }

  if (e.innerHTML == s) {
    return;
  }

  e.innerHTML = s;
}

var OldPass = -1;
function ShowStats() {
  var pass = document.getElementById("passchk_pass").value;
  var plower = pass.toLowerCase();
  var r = "";
  strength = 0;
  strength_colour = "red";

  if (pass == OldPass) {
    window.setTimeout("ShowStats();", 200);
    return;
  }
  OldPass = pass;

  if (pass.length == 0) {
    Set_Text(
      "Please type your password,<br /> the analysis will start automatically."
    );
    hideBar();
    window.setTimeout("ShowStats();", 200);
    return;
  } else {
    showBar();
  }

  if (pass.length <= 4) {
    r += "<b>WARNING:  <font color=red>Very short password!</font></b><br>\n";
  } else if (pass.length < 6) {
    r += "<b>WARNING:  <font color=red>Short password!</font></b><br>\n";
  }

  // First, see if it is a common password.
  for (var i = 0; i < Common_Words.length; i++) {
    if (Common_Words[i] == plower) {
      i = Common_Words.length;
      r += "<b>WARNING:  <font color=red>Common password!</font></b><br>\n";
    }
  }

  r += "<b>Length:</b>  " + pass.length + "<br>\n";

  // Calculate frequency chance
  if (pass.length > 1) {
    var c,
      aidx = 0,
      bits = 0,
      charSet;
    charSet = Math.log(Get_Charset_Size(pass));
    aidx = Get_Index(plower.charAt(0));
    for (var b = 1; b < plower.length; b++) {
      var bidx = Get_Index(plower.charAt(b));
      c = 1.0 - Frequency_Table[aidx * 27 + bidx];
      bits += charSet * c * c; // Squared = assmume they are good guessers
      aidx = bidx;
    }

    if (bits < 15) {
      r += "<b>Strength:  <font color=#ff0000>Very Weak</font></b><br>\n";
      setProgressBarValue(bits / 0.4, "#ff0000");
    } else if (bits < 20) {
      r += "<b>Strength:  <font color=#822121>Weak</font></b><br>\n";
      setProgressBarValue(bits / 0.4, "#822121");
    } else if (bits < 30) {
      r += "<b>Strength:  <font color=#ff4500>Medium</font></b><br>\n";
      setProgressBarValue(bits / 0.4, "#ff4500");
    } else if (bits < 40) {
      r += "<b>Strength:  <font color=#ffff00>Strong</font></b><br>\n";
      setProgressBarValue(bits / 0.4, "#ffff00");
    } else {
      r += "<b>Strength:  <font color=#00E000>Very Strong</font></b><br>\n";
      setProgressBarValue(bits / 0.4, "#00E000");
    }
    //r += "<b>Entropy:</b>  " + (Math.round(bits * 10) / 10) + " bits<br>\n";
    //r += "<b>Charset Size:</b>  " + Get_Charset_Size(pass) +
    (" characters<br>\n");
  }

  Set_Text(r);

  window.setTimeout("ShowStats();", 200);
}

function CheckIfLoaded() {
  var s = "";
  if (!document.Common_Loaded) {
    s += "Loading common passwords...<br>\n";
  } else if (!document.Common_Parsed) {
    if (!document.Common_Parsed_Started) {
      window.setTimeout("Parse_Common()", 50);
      document.Common_Parsed_Started = 1;
    }
    s += "Parsing common passwords... " + Common_List.length + "<br>\n";
  }
  if (!document.Frequency_Loaded) {
    s += "Loading letter frequency table...<br>\n";
  } else if (!document.Frequency_Parsed) {
    if (!document.Frequency_Parsed_Started) {
      window.setTimeout("Parse_Frequency()", 50);
      document.Frequency_Parsed_Started = 1;
    }
    s += "Parsing frequency table... " + Frequency_List.length + "<br>\n";
  }
  if (s != "") {
    Set_Text(s + "Loading ...");
    window.setTimeout("CheckIfLoaded()", 200);
    return;
  }

  // Loaded. Do initialization thingies.
  document.getElementById("passchk_pass").focus();
  Set_Text("Finished Loading.");
  window.setTimeout("ShowStats();", 1000);
}

window.setTimeout("CheckIfLoaded()", 100);

// A JavaScript Progress Bar
// Written by Gerd Riesselmann
// http://www.gerd-riesselmann.net
//
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//

// Ads eventhandelr to given object
function addEvent(obj, evType, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(evType, fn, false);
    return true;
  } else if (obj.attachEvent) {
    var r = obj.attachEvent("on" + evType, fn);
    return r;
  } else {
    return false;
  }
}

//add Elements to qualitymeter div
function initProgressBar(caption) {
  var _container = document.getElementById("the_progressbar");
  if (_container) {
    _currentStyle = _container.style;
    if (_currentStyle != null) {
      _currentStyle.display = "block";
    }

    // create the caption
    var _caption = document.createElement("span");
    _caption.id = "progress_caption";
    var _text = document.createTextNode(caption);
    _caption.setAttribute("style", "{font-weight: bold;}");
    _caption.appendChild(_text);
    _caption.appendChild(document.createElement("br"));
    _container.appendChild(_caption);

    //Create The Left progress part
    //Looks like <span class="right" style="border: 1px solid black; padding: 0 50px; height: 1.2em; background-color: green;">
    var _progressL = document.createElement("span");
    _progressL.id = "progressl";
    var _style = _progressL.style;
    _style.backgroundColor = "green";
    // _style.borderLeft = "1px solid black";
    // _style.borderTop = "1px solid black";
    // _style.borderBottom = "1px solid black";
    _style.padding = "0 0px";
    _style.height = "50%";
    _style.borderRadius = "8px";
    _style.zIndex = 100;

    _container.appendChild(_progressL);

    // Create the Rigth progress part
    // Looks like Left part, but background is transparent
    var _progressR = document.createElement("span");
    _progressR.id = "progressr";
    _style = _progressR.style;
    // _style.borderRight = "1px solid black";
    // _style.borderTop = "1px solid black";
    // _style.borderBottom = "1px solid black";
    _style.padding = "0 100px";
    _style.height = "30%";


    _container.appendChild(_progressR);
  }
}

function setProgressBarValue(value, colour) {
  var _value = parseInt(value);
  if (_value == NaN) _value = 0;

  if (_value > 100) _value = 100;

  if (colour == NaN) colour = "green";

  _progressL = document.getElementById("progressl");
  _progressR = document.getElementById("progressr");
  if (_progressL && _progressR) {
    _progressL.style.paddingLeft = _value + "px";
    _progressL.style.backgroundColor = colour;
    _progressL.style.paddingRight = _value + "px";
    _progressR.style.paddingLeft = 100 - _value + "px";
    _progressR.style.paddingRight = 100 - _value + "px";
  }
}

function hideBar() {
  var _container = document.getElementById("the_progressbar");
  _container.style.display = "none";
}

function showBar() {
  var _container = document.getElementById("the_progressbar");
  _container.style.display = "";
}

function initQualityMeter() {
  initProgressBar("Password Quality: ");
  setProgressBarValue(0, "red");
  hideBar();
}
