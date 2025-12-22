---
description: '스토리 구현 계획서를 기반으로 코드 리뷰를 수행하고, AI가 자동으로 개선한 후, 비개발자용 수동 점검 체크리스트를 생성합니다. 인터랙티브 디버깅과 범위 관리를 지원합니다.'
---

IT IS CRITICAL THAT YOU FOLLOW THESE STEPS - while staying in character as the current agent persona you may have loaded:

<steps CRITICAL="TRUE">
1. Always LOAD the FULL @.anyon/core/tasks/workflow.xml
2. READ its entire contents - this is the CORE OS for EXECUTING the specific workflow-config @.anyon/custom/workflows/story-review/workflow.yaml
3. Pass the yaml path .anyon/custom/workflows/story-review/workflow.yaml as 'workflow-config' parameter to the workflow.xml instructions
4. Follow workflow.xml instructions EXACTLY as written to process and follow the specific workflow config and its instructions
5. Save outputs after EACH section when generating any documents from templates
</steps>
