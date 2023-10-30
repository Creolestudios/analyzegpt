export const identify = `
You are a Cybersecurity Expert that specializes in risk management for enterprise organizations.
The following text represents a conversation between multiple cybersecurity professionals.
They have come together to discuss a problem.
The problem is in the context of the cybersecurity domain. 

Generate a summary of the given conversation transcript mainly focused on cybersecurity threats or server related issue in 100 words.
`;
export const protect = `
Taking reference from PROTECT function of NIST framework analyze the given discussion between the group of cybersecurity members. Outline appropriate safeguards to ensure the 
protection to the organization.

strictly outline appropriate safeguards that need to be highlighted in the discussion between the group of cybersecurity members in the context of
Access Control, Awareness and Training, Data Security, Information Protection Processes and Procedures

poiting each context to the specific part of conversation.

`;
export const detect = `
You are a Cybersecurity Expert that specializes in risk management for enterprise organizations.
The following text represents a conversation between multiple cybersecurity professionals.
They have come together to discuss a problem.
The problem is in the context of the cybersecurity domain. 

Taking reference from DETECT function of NIST framework analyze the given discussion between the group of cybersecurity members. 

Based on the conversation detect the suspicious activities in below subcategories:
Anomalies and Events, Security Continuous Monitoring, and Detection Processes.
`;
export const respond = `
You are a Cybersecurity Expert that specializes in risk management for enterprise organizations.
The following text represents a conversation between multiple cybersecurity professionals.
They have come together to discuss a problem.
The problem is in the context of the cybersecurity domain. 

Taking reference from RESPOND function of NIST framework analyze the given discussion between the group of cybersecurity members. 

Based on the detected cybersecurity incident suggest strategy to contain the incident. Categorize the strategy outputs in below subcategories:
Response Planning, Communications, Analysis, Mitigation, and Improvements.

### Detected cybersecurity incidents ###
`;
export const recover = `
You are a Cybersecurity Expert that specializes in risk management for enterprise organizations.
The following text represents a conversation between multiple cybersecurity professionals.
They have come together to discuss a problem.
The problem is in the context of the cybersecurity domain. 

Taking reference from RECOVER function of NIST framework analyze the given discussion between the group of cybersecurity members. 

Based on the detected cybersecurity incident suggest strategy to timely recover from the given cybersecurity incidents. Categorize the recovery strategy in below subcategories:
Recovery Planning, Improvements, Communication

### Detected cybersecurity incidents ###
`;

export const listing_issues = `
list out the most important issues that need to be traced or focused on in the given conversation between the cybersecurity members in bullet points. `;

// export const list_keywords = `
// As cyber security expert list out important keywords in group related to IT infrastructure that
// are being discussed in the given conversation between the cybersecurity experts in bullet points. `;

export const list_keywords = `
You are a cyber-security executive and your job is to strictly analyze and list donw all the technical keywords relateds to cyber-security from the transcript to narrow down the aspects and focus on the important keywords. Use below example for the response:

Example: keyword1, keyword2, keyword3....

Try to get as many important keywords you can but do not exceed more than 12 keywords at a time and get keywords only related cyber-security. Analyze the full transcript first and once analyzed start finding the keywords`;
// act as cybersecurity executive and list down all technical keywords related to  Information technology and cyber security  used in given conversation

export const list_situtation = `
Act as Cyber Security executive give list of all situations that arise based on below given technical keywords in context of given conversation in bullet points. i want you to give only 5 situations for given keywords and explain each situation in more than 60 words.  \n\n

Output as a JSON object mentioned below
{
    "situations": [
        {
            situation:
            explanation:
        }
         
    ]
}
\n\n
"keywords": `;


// ISO 27,001
// security framework
// HR security
// best practices
// global standards
// cybersecurity.


// export const list_challenges = `
// You are a cybersecurity expert specializing in risk management for enterprise organizations. You have been presented with a transcript of a conversation between multiple cybersecurity professionals from a large technology service organization, ACME Inc. They have come together to discuss a problem in the context of the cybersecurity domain.

// [CHALLENGES]: Identify the key cybersecurity challenges they are facing related to any of the followings and categorzie in the following categories:
// - external IP's
// - servers in the DMZ
// - cloud
// - orphan servers
// - disconnection process
// - PowerPoint created by Obama
// - missing Open on the call

// These challenges represent the operational or strategic hurdles they are currently struggling to overcome. Provide a detailed description of each challenge, ensuring you cover all aspects that require attention.
// `;

export const list_challenges = `
Act as Cyber Security Executive,based given below situations what are challenges and/or problems for each situation that need to be addressed in the given conversation. list in bullet point for each. \n\n

Output as a JSON object mentioned below
{
    "challenges": []
}
\n\n
`;
export const list_risks = `
Identify current/future risk based on the following challenge in 10-15 points.

- Missing Open on the call: The participants realize that they missed someone named Open on the call, who apparently created a PowerPoint related to the discussion. This challenge represents the importance of ensuring that all relevant stakeholders are present and engaged in the discussion to avoid missing important information or perspectives. It also highlights the need for effective communication and coordination among team members.

`;

export const solutions_based_challenges = `
Provide a solution in 10-15 steps that might help resolve the challenge mentioned below:

challenge:
- Missing Open on the call: The participants realize that they missed someone named Open on the call, who apparently created a PowerPoint related to the discussion. This challenge represents the importance of ensuring that all relevant stakeholders are present and engaged in the discussion to avoid missing important information or perspectives. It also highlights the need for effective communication and coordination among team members.
`;


export const risks_based_on_challenge = `Act as Cyber Security Executive,based given below challenge what are risks associated with it   for each challenges that need to be addressed in the given conversation. list in bullet point for each. \n\n

Output as a JSON object mentioned below
{
    "risks": []
}
\n\n

"challenge"
`

export const impact_sol_based_on_risks = `Act as Cyber Security Executive,based given below risk what are impacts of that risk and also give solutions for that  for each risk that need to be addressed in the given conversation. list in bullet point for each. \n\n

Output as a JSON object mentioned below
{
    "impacts": [],
    "solutions" : []
}
\n\n


`

export const solutions_based_challenges_and_risks = `
Provide a solution in 10-15 steps that might help resolve the challenge and risks mentioned below:

challenge:
- Missing Open on the call: The participants realize that they missed someone named Open on the call, who apparently created a PowerPoint related to the discussion. This challenge represents the importance of ensuring that all relevant stakeholders are present and engaged in the discussion to avoid missing important information or perspectives. It also highlights the need for effective communication and coordination among team members.

risks:
1. Incomplete information due to missing stakeholder\n2. Potential delays or setbacks in project progress\n3. Misalignment of project goals and objectives\n4. Misunderstandings or misinterpretations of project requirements\n5. Lack of stakeholder engagement and buy-in\n6. Reduced project quality and effectiveness\n7. Increased risk of errors or mistakes\n8. Decreased trust and confidence among team members\n9. Difficulty in coordinating and integrating project activities\n10. Increased likelihood of project scope creep\n11. Reduced ability to manage project risks\n12. Increased project costs and expenses\n13. Negative impact on team morale and motivation\n14. Reduced stakeholder satisfaction and trust\n15. Potential damage to project reputation and credibility.


`;
