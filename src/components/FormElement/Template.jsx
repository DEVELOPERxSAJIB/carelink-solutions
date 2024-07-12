import Select from "react-select";

const Template = ({ selectedTemplate, setSelectedTemplate }) => {
  const options = [
    {
      name: "Alzheimer's Disease",
      value:
        "Assess nutritional / hydrational status. SN to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96. SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  SN to assess respiratory status for dyspnea, lung sounds,cough/sputum. SN to assess pain every visit.  SN to assess skin for skin breakdown and skin care.  SN to teach disease process of Alzheimer’s disease, to include pathophysiology, S/Sx, treatment and exacerbation. SN to assess knowledge of medication regimen and deficits and teach pt/cg use medications for disease process to include, purpose, action S/E and safety measures. SN to instruct on areas where knowledge deficit noted. SN to teach  Alzheimer’s disease management. SN to teach energy conservation and home safety measures. SN to assess pain every visit,instruct on pharmacological and non-pharmacological pain management. Report pain level >5 to MD.  Instruct on energy conservation, incontinent care and home safety measures.",
    },
    {
      name: "Alzheimer's Disease Goals",
      value: `Neurological symptoms will subside without further complications and status will return to WNL for this patient within 60days.
Pt will remain functionally independent within limitations of pain for 60 days.
Pt V/S and weight will be within normal limits as established by MD within 60 days.
Pt/Cg will have adequate working knowledge of disease process, patho, S/Sx, TX, and exacerbation within 60 days.
Pt/Cg will have adequate working knowledge of Alzheimer’s management, home safety measures and energy conservation within 60 days.
Pt/Cg will be able to list 2 of 4  uses of medication within 60 days.
Pt/Cg will be able to list 1of 3 S/E of medication within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.`,
    },
    {
      name: "Anemia",
      value: `SN to assess all body systems. V/S parameter  to report to MD, BP>160/90 or <90/60, HR >100 or <60, RESP>24 or <12, TEMP >100.5 or <96. Instruct pt/cg to weigh patient and  report weight gain or loss of 5lbs in 7days. SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina. SN to assess knowledge of  medication  regimen and deficits, teach pt/cg  ANEMIA medications, to include purpose, action S/E and safety measures. SN to instruct on new and changed medications and areas where knowledge deficit noted.  SN to teach disease process of ANEMIA, to include pathophysiology, S/SX, treatment and exacerbation. Instruct on Iron diet, and healthy eating tips (food choices) and all areas where knowledge deficit noted. SN to instruct on non-pharmacological management of ANEMIA. SN to assess pain every visit, Instruct on pharmacological and Non-pharmacological pain management. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      name: "Anemia Goals",
      value:
        "SN to assess all body systems. V/S parameter  to report to MD, BP>160/90 or <90/60, HR >100 or <60, RESP>24 or <12, TEMP >100.5 or <96. Instruct pt/cg to weigh patient and  report weight gain or loss of 5lbs in 7days. SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina. SN to assess knowledge of  medication  regimen and deficits, teach pt/cg  ANEMIA medications, to include purpose, action S/E and safety measures. SN to instruct on new and changed medications and areas where knowledge deficit noted.  SN to teach disease process of ANEMIA, to include pathophysiology, S/SX, treatment and exacerbation. Instruct on Iron diet, and healthy eating tips (food choices) and all areas where knowledge deficit noted. SN to instruct on non-pharmacological management of ANEMIA. SN to assess pain every visit, Instruct on pharmacological and Non-pharmacological pain management. Instruct on energy conservation, incontinent care and home safety measures.",
    },
    {
      name: "Angina",
      value: `Pt will achive a stable Vit. B12 level within normal limits within 60days.
Pt will have adequate working knowledge of disease process, patho, s/sx, Tx, and exacerbations within 60days.
Pt will be able to list 2 of 4 uses if Anemia medication within 60 days.
Pt will be able to list 1of 3 S/E of Anemia medication within 60days.
Pt will be able to state importance of iron diet and non-pharmacological management of ANEMIA within 60 days.
Pt will be able to list 3of 5 foods with low salt content within 60days.
Pt will be have adequate working knowledge of pain management, energy conservation and home safety measures within 60 days.
Rehab Potential: Good for goals stated above.
DC Plans: Patient will be discharged when goals are met or alternative care has been arranged. 
`,
    },
    {
      name: "Angina Goals",
      value: `Pt will achieve optimal level of cardiovascular status within 60 days.
Pt will achieve a stable blood pressure as evidenced by vital signs within normal limits within 60 days.
Pt will be able be able to list 2 of 4 uses of cardiac medications within 60 days.
Pt will be able to list 2 of 4 S/E of cardiac meds within 60 days.
Pt will have adequate working knowledge of  pharmacological & non-pharmacological management of ANGINA, O2 use & safety, home safety measures, Prescribed diet, and energy conservation within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Arthropathy",
      value: `SN to assess pain every visit. Sn to assess all body systems. VS parameters to report to MD, BP > 160/90 or <90/60, HR >100 or <60, Resp > 24 or <12, Temp > 100.5 or <96. Sn to assess joints for stiffness, tenderness, mobility, pain, and ROM. Sn to assess cardiovascular and respiratory status for heart sounds, dyspnea, edema, lung sounds and peripheral circulation and instruct on areas of knowledge deficits. Sn to instruct on disease process of Arthropathy to include pathophysiology, s/sx, treatment and exacerbation. Instruct on pharmacological and non-pharmacological pain management, good positioning and body alignment. Sn to assess knowledge of medication regimen and deficit, teach pt/cg pain medications to include purpose, action , S/E and safety measures and instruct on new or changed medications. SN to report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Arthropathy Goals",
      value: `Pt will remain functionally independent within limitations of pain within 60days.
Pt will have adequate working knowledge of disease process, patho, s/sx, TX and exacerbation within 60 days.
Pt will be able to list 3 of  5  non-pharmacological ways of managing pain within 60 days. 
Pt will be able to list 2 of 3 S/E of pain medication within 60 days. 
Pt will be able to list 1 of 2 uses of pain medication within 60 days.
Rehab Potential: Good for goals stated above 
DC Plan: When goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Asthma",
      value: `SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  Skilled Nurse to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96.  SN to teach disease process of ASTHMA, to include pathophysiology, S/Sx, treatment and exacerbation.  SN to assess knowledge of medication regimen and deficits and teach pt/cg respiratory medications, to include safety measures, purpose, action and S/E and instruct on new or changed medications. SN to teach energy conservation and home safety measures.  SN to teach O2 (Oxygen) use & safety measures. SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Asthma Goals",
      value: `Pt will achieve a stable respiratory status as evidenced by clear lung sounds, decreased or absence of SOB, and  decrease in respiratory effort within 60 days.
Rales, rhonci and wheezing will clear in all affected lobes without further progression of respiratory distress.
Pt will have adequate working knowledge of disease process, patho, and exacerbation within 60 days.
Pt will be able to list 3 of 5 s/sx of ASTHMA, within 60 days.
Pt will be able to list 2 of 4  uses of medication within 60 days.
Pt’s will list 3 of 4 treatments of ASTHMA, within 60 days.
Pt will have adequate working knowledge of  pharmacological & non-pharmacological management of ASTHMA, and O2 use safety, energy conservation and home safety measures within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.`,
    },
    {
      label: "Bronchitis",
      value: `SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  Skilled Nurse to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96.  SN to teach disease process of BRONCHITIS, to include pathophysiology, S/Sx, treatment and exacerbation.  SN to assess knowledge of medication regimen and deficits and teach pt/cg respiratory medications, to include safety measures, purpose, action and S/E and instruct on new or changed medications. SN to teach energy conservation and home safety measures. SN to teach O2 (Oxygen) use & safety measures. SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Bronchitis Goals",
      value: `Pt will achieve a stable respiratory status as evidenced by clear lung sounds, decreased or absence of SOB, and  decrease in respiratory effort within 60 days.
Rales, rhonci and wheezing will clear in all affected lobes without further progression of respiratory distress.
Pt will have adequate working knowledge of disease process, patho, and exacerbation within 60 days.
Pt will be able to list 3 of 5 s/sx of BRONCHITIS, within 60 days.
Pt will be able to list 2 of 4  uses of medication within 60 days.
Pt’s will list 3 of 4 treatments of BRONCHITIS, within 60 days.
Pt will have adequate working knowledge of pharmacological & non-pharmacological management of BRONCHITIS, O2 use safety, energy conservation and home  safety measures within 60 days
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.`,
    },
    {
      label: "CHF",
      value: `SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  Skilled Nurse to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96.  SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to teach disease process of CHF, to include pathophysiology, S/Sx, treatment and exacerbation. SN to assess knowledge of medication regimen and deficits and teach pt/cg CARDIAC medications, to Include safety measures, purpose, action and S/E. Sn to teach new or changed medications if any. SN to teach  2gm Na Diet, Low Fat Diet, and Low Cholesterol Diet. SN to teach O2 (Oxygen) use & safety measures. SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.  Instruct pt/cg to weigh patient and report weight gain or loss of 5lbs in 7 days.`,
    },
    {
      label: "CHF Goals",
      value: `Pt will achieve optimal level of cardiovascular status within 60 days.
Pt will achieve a stable blood pressure as evidenced by vital signs within normal limits within 60 days.
Rales, rhonci and wheezing will clear in all affected lobes without further progression of respiratory distress.
Pt will achieve a stable respiratory status as evidenced by clear lung sounds, decreased or absence of SOB, and decrease in respiratory effort within 60 days.
Pt will be able be able to list 2 of 4 uses of cardiac medications within 60 days.
Pt will be able to list 2 of 4 S/E of cardiac meds within 60 days.
Pt will have adequate working knowledge of  pharmacological & non-pharmacological management of CHF, O2 use & safety, home safety measures, prescribed diet,  and energy conservation within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.
`,
    },
    {
      label: "COPD",
      value: `SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  Skilled Nurse to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96.  SN to teach disease process of COPD, to include pathophysiology, S/Sx, treatment and exacerbation.  SN to assess knowledge of medication regimen and deficits and teach pt/cg respiratory medications, to include safety measures, purpose, action and S/E and instruct on new or changed medications. SN to teach energy conservation and home safety measures.  SN to teach O2 (Oxygen) use & safety measures. SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "COPD Goals",
      value: `Pt will achieve a stable respiratory status as evidenced by clear lung sounds, decreased or absence of SOB, and  decrease in respiratory effort within 60 days.
Rales, rhonci and wheezing will clear in all affected lobes without further progression of respiratory distress.
Pt will have adequate working knowledge of disease process, patho, and exacerbation within 60 days.
Pt will be able to list 3 of 5 s/sx of COPD, within 60 days.
Pt will be able to list 2 of 4  uses of medication within 60 days.
Pt’s will list 3 of 4 treatments of COPD, within 60 days.
Pt will have adequate working knowledge of  pharmacological & non-pharmacological management COPD, O2 use safety, energy conservation and home                  safety measures within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.`,
    },
    {
      label: "CVA",
      value: `SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  Skilled Nurse to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96.  SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to teach disease process of CVA, to include pathophysiology, S/Sx, treatment and exacerbation.  SN to assess knowledge of medication regimen and deficits and teach pt/cg CARDIAC medications, to Include safety measures, purpose, action and S/E. Sn to teach new or changed medications if any.  SN to teach  2gm Na Diet, Low Fat Diet, and Low Cholesterol Diet.  SN to teach O2 (Oxygen) use & safety measures. SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.  Instruct pt/cg to weigh patient and report weight gain or loss of 5lbs in 7 days.`,
    },
    {
      label: "CVA Goals",
      value: `Pt will achieve optimal level of cardiovascular status within 60 days.
Pt will achieve a stable blood pressure as evidenced by vital signs within normal limits within 60 days.
Pt will be able be able to list 2 of 4 uses of cardiac medications within 60 days.
Pt will be able to list 2 of 4 S/E of cardiac meds within 60 days.
Pt will have adequate working knowledge of  pharmacological & non-pharmacological management of CVA, O2 use & safety, home safety measures, prescribed diet,  and energy conservation within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Dementia",
      value: `Assess nutritional / hydrational status.  SN to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96. SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to assess pain every visit.  SN to assess skin for skin breakdown and skin care.  SN to teach disease process of Dementia, to include pathophysiology, S/Sx, treatment and exacerbation. SN to assess knowledge of medication regimen and deficits and teach pt/cg use medications for disease process to include, purpose, action S/E and safety measures.  SN to instruct on areas where knowledge deficit noted. SN to teach Dementia disease management. SN to teach energy conservation and home safety measures. SN to assess pain every visit, instruct on pharmacological and non-pharmacological pain management. Report pain level >5 to MD.  Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Dementia Goals",
      value: `Neurological symptoms will subside without further complications and status will return to WNL for this patient within 60days.
Pt will remain functionally independent within limitations of pain for 60 days.
Pt V/S and weight will be within normal limits as established by MD within 60 days.
Pt/Cg will have adequate working knowledge of disease process, patho, S/Sx, TX, and exacerbation within 60 days.
Pt/Cg will have adequate working knowledge of Dementia management, home safety measures and energy conservation within 60 days.
Pt/Cg will be able to list 2 of 4  uses of medication within 60 days.
Pt/Cg will be able to list 1of 3 S/E of medication within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.`,
    },
    {
      label: "DM (with insulin)",
      value: `Patient with memory deficit, very forgetful, L or R side paralysis due to CVA, Poor hand coordination, Lives Alone, Unable to perform FSBS and prep/admin own insulin safely, No able/willing cg to assume pt’s care safely. Using aseptic technique, SN to perform FS blood sugar every visit using patient’s glucometer to assess for S/Sx of hypo/ hyperglycemia or accuracy of reported BS.  SN to report FBS>250 or <60 and RBS>300 or <70 mg/dl to MD. Using aseptic technique, SN to prep/administer,   ___________________________     _____Units QAM SQ and __________________________        _____Units QPM.  Dispose of sharps per OSHA guidelines. SN to prep/admin ___________________ per sliding scale. Sn to assess all body systems. V/S parameter to report to MD, BP>160/90, HR>100 or <60, Resp>24 or <12, Temp>100.5 or <96. SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  Assess skin for skin breakdown and diet.  SN to assess pain every visit, instruct on pharmacological and non-pharmacological pain management, report pain level >5 to MD.  Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "DM (without insulin)",
      value: `Using aseptic technique, SN to perform FS blood sugar every visit using patient’s glucometer to assess for s/sx of hypo/hyperglycemia or accuracy of reported BS. SN to report FBS >200 or <60 and RBS> 250 or <70 mg/dl to MD.  Dispose of sharps per OSHA guidelines. SN to assess all body systems. V/S parameter to report to MD-BP> 160/90 or 90/60, HR > 100 or <60, Resp >24 or <12, Temp> 100.5 or <96. SN to assess cardiovascular status for heart sounds, edema, peripheral circulation and angina. Assess pain, energy conservation and home safety measures every visit, and instruct on areas of knowledge deficit. SN to teach disease process of DM to include pathophysiology, s/sx, treatment and exacerbation. Assess knowledge of medication regimen and deficits, teach DM medications to include action, S/E and safety measures and instruct or new on changed medications if any.  SN to teach ADA diet, food choices, importance of keeping daily BS log and other non-pharmacological management of DM. SN to instruct on diabetic foot care and sick-day rules.  SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD, incontinent care and home safety measures.`,
    },
    {
      label: "DM Goals (with insulin)",
      value: `Pt’s blood sugar level will be WNL within 60days.
Pt will not have adverse reaction to injection within 60days.
Rehab Potential: Good for goals stated above.
DC Plans: When able and willing cg is available to assume pt’s care safely.
`,
    },
    {
      label: "DM Goals (without insulin)",
      value: `Patient’s blood sugar level will be Within Normal limits as established by MD within 60 days.
Pt will have adequate working knowledge of disease process, patho, sick-day rules, and exacerbation within 60 days.
Pt will be able to list 2of 4 uses of DM medication within 60 days.
Pt will be able to list 3 of 4 S/Sx of DM within 60days.
Pt will be able to list 2 of 4 Tx of DM within 60 days. 
Pt will be able to state when to go to ER or what SX to report to MD within 60 days. 
Rehab Potential: Good for goals stated above.
DC Plans: Patient will be discharged when goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Emphysema",
      value: `SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina.  Skilled Nurse to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96.  SN to teach disease process of EMPHYSEMA to include pathophysiology, S/Sx, treatment and exacerbation.  SN to assess knowledge of medication regimen and deficits and teach pt/cg respiratory medications, to include safety measures, purpose, action and S/E and instruct on new or changed medications. SN to teach energy conservation and home safety measures.   SN to teach O2 (Oxygen) use & safety measures. SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Emphysema Goals",
      value: `Pt will achieve a stable respiratory status as evidenced by clear lung sounds, decreased or absence of SOB, and  decrease in respiratory effort within 60 days.
Rales, rhonci and wheezing will clear in all affected lobes without further progression of respiratory distress.
Pt will have adequate working knowledge of disease process, patho, and exacerbation within 60 days.
Pt will be able to list 3 of 5 s/sx of EMPHYSEMA within 60 days.
Pt will be able to list 2 of 4  uses of medication within 60 days.
Pt’s will list 3 of 4 treatments of EMPHYSEMA  within 60 days.
Pt will have adequate working knowledge of pharmacological & non-pharmacological management of EMPHYSEMA and O2 use safety, energy conservation and home safety measures within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.`,
    },
    {
      label: "GERD",
      value: `Skilled Nurse to observe and all assess all body systems. V/S parameter to report to MD, BP>160/90 or  <90/60, HR >100 or <60, Resp >24 or <12, Temp > 100.5 or <96. SN to assess cardiovascular status for heart sounds, edema,     peripheral circulation, angina. SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to teach disease process of GERD, to include pathophysiology, S/Sx, treatment and exacerbation.   SN to assess knowledge of medication regimen and deficits and teach medication for disease process to include purpose, action, S/E and safety measures.  SN to teach or new/ changed medication and areas where knowledge deficit noted. SN to teach foods that may cause problems, and ways to manage GERD.  SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "GERD Goals",
      value: `Pt will remain functionally independent within limitations of pain for 60 days.
Pt V/S will be within normal limits as established by MD within 60 days.
Pt will have adequate working knowledge of disease process, patho, S/Sx, TX, and exacerbation within 60 days.
Pt will have adequate working knowledge of  GERD management, home safety measures, energy
Conservation and able to list 3 of 5 food that may cause problem within 60 days.
Pt will be able to list 2 of 4  uses of medication within 60 days.
Pt will be able to list 1of 3 S/E of medication within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Gouty Arthropathy",
      value: `SN to assess pain every visit. Sn to assess all body systems. VS parameters to report to MD, BP > 160/90 or <90/60, HR >100 or <60, Resp > 24 or <12, Temp > 100.5 or <96. Sn to assess joints for stiffness, tenderness, mobility, pain, and ROM. Sn to assess cardiovascular and respiratory status for heart sounds, dyspnea, edema, lung sounds and peripheral circulation and instruct on areas of knowledge deficits. Sn to instruct on disease process of Gouty Arthropathy to include pathophysiology, s/sx, treatment and exacerbation. Instruct on pharmacological and non-pharmacological pain management, good positioning and body alignment. Sn to assess knowledge of medication regimen and deficit, teach pt/cg pain medications to include purpose, action , S/E and safety measures and instruct on new or changed medications. SN to report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Gouty Arthropathy Goals",
      value: `SN to assess pain every visit. Sn to assess all body systems. VS parameters to report to MD, BP > 160/90 or <90/60, HR >100 or <60, Resp > 24 or <12, Temp > 100.5 or <96. Sn to assess joints for stiffness, tenderness, mobility, pain, and ROM. Sn to assess cardiovascular and respiratory status for heart sounds, dyspnea, edema, lung sounds and peripheral circulation and instruct on areas of knowledge deficits. Sn to instruct on disease process of Gouty Arthropathy to include pathophysiology, s/sx, treatment and exacerbation. Instruct on pharmacological and non-pharmacological pain management, good positioning and body alignment. Sn to assess knowledge of medication regimen and deficit, teach pt/cg pain medications to include purpose, action , S/E and safety measures and instruct on new or changed medications. SN to report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "HHA Frequency",
      value: `HHA to assist with personal care, incontinent care, and ADL's per POC under supervision of an RN.`,
    },
    {
      label: "HHA Goals",
      value: `PT WILL HAVE ADEQUATE PERSONAL CARE AND ADL'S WITHIN 60 DAYS.`,
    },
    {
      label: "HTN",
      value: `SN TO ASSESS ALL BODY SYSTEMS.  V/S PARAMETER TO REPORT TO MD, BP>160/90 OR <90/60, HR >100 OR <60, RESP >24 OR <12, TEMP>100.5 OR <96. SN TO ASSESS CARDIOVASCULAR STATUS FOR HEART SOUNDS, EDEMA, PERIPHERAL CIRCULATION, ANGINA.  SN TO ASSESS ALL BODY SYSTEMS.  SN TO ASSESS KNOWLEDGE OF MEDICATION REGIMEN AND DEFICITS, TEACH PT/CG BP MEDICATIONS, TO INCLUDE PURPOSE, ACTION S/E AND SAFETY MEASURES.  SN TO INSTRUCT ON NEW AND CHANGED MEDICATIONS AND AREAS WHERE KNOWLEDGE DEFICIT NOTED.  SN TO TEACH DISEASE PROCESS OF HTN, TO INCLUDE PATHOPHYSIOLOGY, S/SX, TREATMENT AND EXACERBATION.  INSTRUCT ON 2GM NA DIET, IMPORTANCE OF KEEPING DAILY BP LOG, AND HEALTHY EATING TIPS (FOOD CHOICES) AND ALL AREAS WHERE KNOWLEDGE DEFICIT NOTED.  SN TO INSTRUCT ON NON-PHARMACOLOGICAL  MANAGEMENT OF HTN.  SN TO ASSESS PAIN  LEVEL AND EFFECTIVENESS OF PAIN MEDICATION EVERY VISIT, REPORT PAIN LEVEL >5 TO MD.  INSTRUCT ON ENERGY CONSERVATION, INCONTINENT CARE AND HOME SAFETY MEASURES.`,
    },
    {
      label: "HTN Goals",
      value: `PT WILL ACHIEVE A STABLE BP AS EVIDENCED BY VITAL SIGNS WITHIN NORMAL LIMITS WITHIN 60 DAYS.
PT WILL HAVE ADEQUATE WORKING KNOWLEDGE OF DISEASE PROCESS, PATHO, S/SX, TX, AND EXACERBATION WITHIN 60 DAYS.
PT WLL BE ABLE TO LIST 2 OF 4 USES OF BP MEDICATION WITHIN 60 DAYS.
PT WILL BE ABLE TO LIST 1 OF 3 S/E OF BP MEDICATION WITHIN 60 DAYS.
PT WILL BE ABLE TO STATE IMPORTANCE OF 2 GM SODIUM DIET AND NON-PHARMACOLOGICAL MANAGEMENT OF HTN WITHIN 60 DAYS.
PT WILL BE ABLE TO LIST 3 OF 5 FOODS WITH LOW SALT CONTENT WITHIN 60 DAYS.
PT WILL HAVE ADEQUATE WORKING KNOWLEDGE OF PAIN MANAGEMENT, ENERGY CONSERVATION AND HOME SAFETY MEASURE WITHIN 60 DAYS.
REHAB POTENTIAL: GOOD FOR GOALS STATED ABOVE.
DC PLANS: PATIENT WILL BE DISCHARGED WHEN GOALS ARE MET OR ALTERNATIVE CARE HAS BEEN ARRANGED.
`,
    },
    {
      label: "Hyperlipidemia",
      value: `SN to assess all body systems. V/S parameter  to report to MD, BP>160/90 or <90/60, HR >100 or <60, RESP>24 or <12, TEMP >100.5 or <96. Instruct pt/cg to weigh patient and  report weight gain or loss of 5lbs in 7days. SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina. SN to assess knowledge of  medication  regimen and deficits, teach pt/cg HYPERLIPIDEMIA medications, to include purpose, action S/E and safety measures. SN to instruct on new and changed medications and areas where knowledge deficit noted.  SN to teach disease process of HYPERLIPIDEMIA, to include pathophysiology, S/SX, treatment and exacerbation. Instruct on Low Fat diet, and healthy eating tips (food choices) and all areas where knowledge deficit noted. SN to instruct on non-pharmacological management of HYPERLIPIDEMIA. SN to assess pain every visit, Instruct on pharmacological and Non-pharmacological pain management.  Instruct on enerygy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Hyperlipidemia Goals",
      value: `Pt will achive a stable cholesterol level within normal limits within 60days.
Pt will have adequate working knowledge of disease process, patho, s/sx, Tx, and exacerbations within 60days.
Pt will be able to list 2 of 4 uses if Hyperlipidemia medication within 60 days.
Pt will be able to list 1of 3 S/E of Hyperlipidemia medication within 60days.
Pt will be able to state importance of a low fat diet and non-pharmacological management of HYPERLIPIDEMIA within 60 days.
Pt will be able to list 3of 5 foods with low fat content within 60days.
Pt will be have adequate working knowledge of pain management, energy conservation and home safety measures within 60 days.
Rehab Potential: Good for goals stated above.
DC Plans: Patient will be discharged when goals are met or alternative care has been arranged. 
`,
    },
    {
      label: "Lumbago",
      value: `SN to assess pain every visit. Sn to assess all body systems. VS parameters to report to MD, BP > 160/90 or <90/60, HR >100 or <60, Resp > 24 or <12, Temp > 100.5 or <96. Sn to assess joints for stiffness, tenderness, mobility, pain, and ROM. Sn to assess cardiovascular and respiratory status for heart sounds, dyspnea, edema, lung sounds and peripheral circulation and instruct on areas of knowledge deficits. Sn to instruct on disease process of Lumbago to include pathophysiology, s/sx, treatment and exacerbation. Instruct on pharmacological and non-pharmacological pain management, good positioning and body alignment. Sn to assess knowledge of medication regimen and deficit, teach pt/cg pain medications to include purpose, action , S/E and safety measures and instruct on new or changed medications. SN to report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Lumbago Goals",
      value: `Pt will remain functionally independent within limitations of pain within 60days.
Pt will have adequate working knowledge of disease process, patho, s/sx, TX and exacerbation within 60 days.
Pt will be able to list 3 of  5  non-pharmacological ways of managing pain within 60 days. 
Pt will be able to list 2 of 3 S/E of pain medication within 60 days. 
Pt will be able to list 1 of 2 uses of pain medication within 60 days.
Rehab Potential: Good for goals stated above 
DC Plan: When goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Myocardial Infarction",
      value: `SN to assess cardiovascular status for heart sounds, edema, peripheral circulation, angina. SN to observe and assess all body systems. V/S parameter to report to MD, BP>160/90 or <90/60, HR >100 or <60, Resp >24  or <12, Temp >100.5 or <96.  SN to assess respiratory status for dyspnea, lung sounds, cough/sputum.  SN to teach disease process of MI, to include pathophysiology, S/Sx, treatment and exacerbation. SN to assess knowledge of medication regimen and deficits and teach pt/cg CARDIAC medications, to Include safety measures, purpose, action and S/E. Sn to teach new or changed medications if any. SN to teach  2gm Na Diet, Low Fat Diet, and Low Cholesterol Diet. SN to teach O2 (Oxygen) use & safety measures. SN to assess pain every visit, Instruct on Pharmacological and Non-pharmacological pain management report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures. Instruct pt/cg to weigh pt and report weight gain or loss of 5lbs in 7 days.`,
    },
    {
      label: "Myocardial Infarction Goals",
      value: `Pt will achieve optimal level of cardiovascular status within 60 days.
Pt will achieve a stable blood pressure as evidenced by vital signs within normal limits within 60 days.
Pt will be able be able to list 2 of 4 uses of cardiac medications within 60 days.
Pt will be able to list 2 of 4 S/E of cardiac meds within 60 days.
Pt will have adequate working knowledge of  pharmacological & non-pharmacological management of MI, O2 use & safety, home safety measures, prescribed diet,  and energy conservation within 60 days.
Rehab Potential: Good for goals stated above.
DC plans: Patient will be discharged when goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Osteoarthrosis",
      value: `SN to assess pain every visit. Sn to assess all body systems. VS parameters to report to MD, BP > 160/90 or <90/60, HR >100 or <60, Resp > 24 or <12, Temp > 100.5 or <96. Sn to assess joints for stiffness, tenderness, mobility, pain, and ROM. Sn to assess cardiovascular and respiratory status for heart sounds, dyspnea, edema, lung sounds and peripheral circulation and instruct on areas of knowledge deficits. Sn to instruct on disease process of Osteoarthrosis to include pathophysiology, s/sx, treatment and exacerbation. Instruct on pharmacological and non-pharmacological pain management, good positioning and body alignment. Sn to assess knowledge of medication regimen and deficit, teach pt/cg pain medications to include purpose, action , S/E and safety measures and instruct on new or changed medications. SN to report pain level >5 to MD. Instruct on energy conservation, incontinent care and home safety measures.`,
    },
    {
      label: "Osteoarthrosis Goals",
      value: `Pt will remain functionally independent within limitations of pain within 60days.
Pt will have adequate working knowledge of disease process, patho, s/sx, TX and exacerbation within 60 days.
Pt will be able to list 3 of  5  non-pharmacological ways of managing pain within 60 days. 
Pt will be able to list 2 of 3 S/E of pain medication within 60 days. 
Pt will be able to list 1 of 2 uses of pain medication within 60 days.
Rehab Potential: Good for goals stated above 
DC Plan: When goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Osteoporosis",
      value: `SN TO ASSESS EVERY VISIT.SN TO ASSESS JOINTS FOR STIFFNESS,TENDERNESS, MOBILITY,AND ROM. SN TO ASSESS ALL BODY SYSTEMS.SN TO INSTRUCT ON DISEASE PROCESS OF OSTEOARTHRITIS TO INCLUDE PATHO,S/SX,TX, AND EXACERBATION.SN TO INSTRUCT ON PHARMACOLOGICAL AND NON-PHARMACOLGICAL PAIN MANAGEMENT, GOOD POSITIONING, AND BODY ALIGNMENT. SN TO TO TEACH  PAIN MEDICATION TO INCLUDE PURPOSE, ACTION,SE AND SAFETY MEASURES. INSTRUCT ON ENERGY CONSERVATION,INCONTINENT CARE, AND HOME SAFETY MEASURES.`,
    },
    {
      label: "Osteoporosis Goals",
      value: `Pt will remain functionally independent within limitations of pain within 60days.
Pt will have adequate working knowledge of disease process, patho, s/sx, TX and exacerbation within 60 days.
Pt will be able to list 3 of  5  non-pharmacological ways of managing pain within 60 days. 
Pt will be able to list 2 of 3 S/E of pain medication within 60 days. 
Pt will be able to list 1 of 2 uses of pain medication within 60 days.
Rehab Potential: Good for goals stated above 
DC Plan: When goals are met or alternative care has been arranged.
`,
    },
    {
      label: "Renal Failure",
      value: `BASIC UNDERSTANDING OF THE ANATOMY AND PHYSIOLOGY OF THE RENAL SYSTEM:
The kidneys are two bean-shaped organs and are located on each side of the vertebral column at the 12th thoracic vertebrae at the posterior abdominal wall. Each kidney has ureter about 25 to 30 centimeters long that connects to the bladder. The function of the kidneys is to remove waste materials from blood, balance body fluids, and form urine.  

DEFINE CHRONIC RENAL FAILURE:
It is the irreversible deterioration of renal function. Symptoms may occur very rapidly or very slowly over years. Uremia, an excess of urea and other nitrogenous wastes, occurs. Progression may continue to en-stage renal disease.

RISK FACTORS:
Obstruction of the urinary tract. Toxic agents. Uncontrolled high blood pressure. Diabetes mellitus. Kidney diseases. Re-currents infections.

S/SX:
Initial symptoms of chronic renal failure are: -Loss of appetite. -Unintentional loss of weight. -Fatigue, apathy, and weakness. -Nausea or vomiting. -Frequent hiccups. -Generalized itching. Later symptoms may include: -Increased or decreased urine output. -Easy bruising or prolonged bleeding. -Decreased alertness, confusion, and coma. -Muscle twitching or cramps. -Seizures. -Decreased sensation in hands and feet. -Uremic frost (deposit or white crystal in and on the skin). Late symptoms may be: -Excessive nighttime urination. -Excessive thirst. -Abnormally dark skin or paleness. -Nail abnormalities. -Breath odor. -High blood pressure. -Loss of appetite. -Agitation.

MEASURES TO MANAGE CHRONIC RENAL FAILURE:
Follow prescribed diet closely: -High in carbohydrates. -Low in protein. -Low in sodium. -Low in potassium. Take vitamin and mineral supplements as ordered. Avoid infections or obtain prompt treatment for infections. Follow activity as instructed, with frequent rest periods. -Avoid stress, which can aggravate symptoms. Monitor blood pressure closely. Monitor fluid status closely: -Weigh daily (same time, same scale, and`,
    },
    {
      label: "UTI",
      value: `PATHOPHYSIOLOGY:
It is an infection of the bladder or urethra frequently caused by bacteria. It is more common in women than men. It can become a chronic problem.

RISK FACTORS:
Females. Advancing age. Obstruction (enlarged prostate, calculi, etc.) Pregnancy. Poor personal hygiene. Use of catheters. Sexual intercourse.

S/SX:
Burning sensation when urinating . Strong, persistent urge to urinate. Passing frequent, small amounts of urine. Low back pain or feeling of pressure in lower abdomen. Cloudy or strong-smelling urine. Fever.

MEASURES TO PREVENT:
Void frequently to empty bladder completely. Always wipe from front to back. Wear cotton underpants and nonrestrictive clothing. Urinate before and after sexual intercourse.
 Avoid use of feminine sprays and bubble baths. Keep perineal area very clean. Avoid delaying the urge to urinate. Drink fluid intake of 2 to 3 liters per day if not contraindicated. Eat a well-balanced diet. -Avoid coffee, alcohol, and soft drinks with caffeine, citrus juices, and spicy foods until infection has cleared. -Physician may recommend the use of vitamin C supplements. - Studies have shown cranberry juice to inhibit growth of E. coli. Check with physician before using cranberry juice. Cranberry juice may have a negative interaction with the medication Coumadin. Take antibiotics until completed. Report early signs and symptoms of infection to the physician. Take medications as instructed. Shower instead of bathing to decrease possibility of bacteria entrance. Exercise regularly to prevent urinary stasis. Keep follow-up appointments with physician and laboratory.

POSSIBLE COMPLICATIONS:
Recurrent infections. Infections of kidney or ureters.
`,
    },
  ];

  return (
    <>
      <Select
        defaultValue={selectedTemplate}
        onChange={setSelectedTemplate}
        options={options}
      />
    </>
  );
};

export default Template;
