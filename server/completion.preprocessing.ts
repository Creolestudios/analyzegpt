export const preProcess = async (...res) => {
  //// Processing res[0]
  const startPhase_0 = 'Problem statement:';
  const endPhase_0 = 'Situation:';

  const startIndex_0 =
    res[0].toLowerCase().indexOf(startPhase_0.toLowerCase()) +
    startPhase_0.length;
  const endIndex_0 = res[0].toLowerCase().indexOf(endPhase_0.toLowerCase());

  const extractedSubstr_0 = res[0].substring(startIndex_0, endIndex_0).trim();
  const extractedSubstr_0_1 = res[0].substring(endIndex_0 + endPhase_0.length);

  //// Processing res[1]
  const startPhase_1 = 'Challenges:';

  const startIndex_1 =
    res[1].toLowerCase().indexOf(startPhase_1.toLowerCase()) +
    startPhase_1.length;

  const extractedSubstr_1 = res[1].substring(startIndex_1).trim();

  //// Processing res[2]
  const startPhase_2 = 'Risks:';

  const startIndex_2 =
    res[2].toLowerCase().indexOf(startPhase_2.toLowerCase()) +
    startPhase_2.length;

  const extractedSubstr_2 = res[2].substring(startIndex_2).trim();

  //// Processing res[3]
  const startPhase_3 = 'Impacts:';
  const endPhase_3 = 'Case Study:';

  const startIndex_3 =
    res[3].toLowerCase().indexOf(startPhase_3.toLowerCase()) +
    startPhase_3.length;
  const endIndex_3 = res[3].toLowerCase().indexOf(endPhase_3.toLowerCase());

  const extractedSubstr_3 = res[3].substring(startIndex_3, endIndex_3).trim();
  const extractedSubstr_3_1 = res[3].substring(endIndex_3 + endPhase_3.length);

  //// Processing res[4]
  const startPhase_4 = 'Solutions:';

  const startIndex_4 =
    res[4].toLowerCase().indexOf(startPhase_4.toLowerCase()) +
    startPhase_4.length;

  const extractedSubstr_4 = res[4].substring(startIndex_4).trim();

  return {
    problem_stmt: extractedSubstr_0,
    situation: extractedSubstr_0_1,
    challenges: extractedSubstr_1,
    risks: extractedSubstr_2,
    impacts: extractedSubstr_3,
    case_study: extractedSubstr_3_1,
    solutions: extractedSubstr_4,
  };
};

export const preProcessByID = async (res, id) => {
  // console.log(id);

  if (id == '1') {
    //// Processing res1
    const startPhase_0 = 'Problem statement:';
    const endPhase_0 = 'Situation:';

    const startIndex_0 =
      res.toLowerCase().indexOf(startPhase_0.toLowerCase()) +
      startPhase_0.length;
    const endIndex_0 = res.toLowerCase().indexOf(endPhase_0.toLowerCase());

    const extractedSubstr_0 = res.substring(startIndex_0, endIndex_0).trim();
    const extractedSubstr_0_1 = res.substring(endIndex_0 + endPhase_0.length);

    return { problem_stmt: extractedSubstr_0, situation: extractedSubstr_0_1 };
  } else if (id == '2') {
    //// Processing res2
    const startPhase_1 = 'Challenges:';

    let startIndex_1 = res.toLowerCase().indexOf(startPhase_1.toLowerCase());

    if (startIndex_1 < 0) startIndex_1 = 0;
    else startIndex_1 += +startPhase_1.length;

    const extractedSubstr_1 = res.substring(startIndex_1).trim();

    return { challenges: extractedSubstr_1 };
  } else if (id == '3') {
    //// Processing res3
    const startPhase_2 = 'Risks:';

    let startIndex_2 = res.toLowerCase().indexOf(startPhase_2.toLowerCase());

    if (startIndex_2 < 0) startIndex_2 = 0;
    else startIndex_2 += startPhase_2.length;

    const extractedSubstr_2 = res.substring(startIndex_2).trim();
    return { risks: extractedSubstr_2 };
  } else if (id == '4') {
    //// Processing res4
    const startPhase_3 = 'Impacts:';
    const endPhase_3 = 'Case Study:';

    const startIndex_3 =
      res.toLowerCase().indexOf(startPhase_3.toLowerCase()) +
      startPhase_3.length;
    const endIndex_3 = res.toLowerCase().indexOf(endPhase_3.toLowerCase());

    const extractedSubstr_3 = res.substring(startIndex_3, endIndex_3).trim();
    const extractedSubstr_3_1 = res.substring(endIndex_3 + endPhase_3.length);

    return { impacts: extractedSubstr_3, case_study: extractedSubstr_3_1 };
  } else if (id == '5') {
    let res = `Solutions:
    - Utilize a two-factor authentication process for user access to systems that contain sensitive customer data.
    - Create individual accounts for users who require system access and require secure passwords with frequent updates.
    - Train employees on proper security protocols and update regularly to ensure security policy changes are up-to-date.
    - Require all customer data stored in the system to be encrypted both at rest and in transit, meeting industry standards for data protection. 
    - Implement a Network Access Control (NAC) solution to restrict user access based on predefined criteria, such as job role or location. 
    - Limit system access by leveraging role-based permissions, granting only those privileges necessary to complete specific job functions. 
    - Invest in an automated vulnerability management testing tool to mitigate potential cyber threats proactively before they occur.
    `;
    //// Processing res5
    const startPhase_4 = 'Solutions:';

    let startIndex_4 = res.toLowerCase().indexOf(startPhase_4.toLowerCase());

    if (startIndex_4 < 0) startIndex_4 = 0;
    else startIndex_4 += startPhase_4.length;

    // console.log(startIndex_4);

    const extractedSubstr_4 = res.substring(startIndex_4).trim();
    return { solutions: extractedSubstr_4 };
  }
};
