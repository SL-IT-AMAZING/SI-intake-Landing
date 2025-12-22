---
name: langchain-architecture
description: Design LLM applications using the LangChain framework with agents, memory, and tool integration patterns. Use when building LangChain applications, implementing AI agents, or creating complex LLM workflows.
---

# LangChain Architecture Patterns

This skill provides comprehensive guidance for building sophisticated LLM applications using the LangChain framework, including agents, memory systems, and tool integration patterns.

## Core Framework Components

### 1. Agents
Autonomous systems that use LLMs to decide which actions to take.

**Agent Types**:
- **ReAct Agent**: Reasoning + Acting pattern, thinks step-by-step
- **OpenAI Functions Agent**: Uses function calling for tool selection
- **Structured Chat Agent**: Multi-input tools with structured output
- **Conversational Agent**: Maintains conversation context
- **Self-Ask Agent**: Breaks down complex questions

```python
from langchain.agents import create_openai_functions_agent, AgentExecutor
from langchain.tools import Tool
from langchain_openai import ChatOpenAI

# Define tools
tools = [
    Tool(
        name="search",
        description="Search for current information",
        func=search_function
    ),
    Tool(
        name="calculator",
        description="Perform mathematical calculations",
        func=calculator_function
    )
]

# Create agent
llm = ChatOpenAI(model="gpt-4", temperature=0)
agent = create_openai_functions_agent(llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Run agent
result = agent_executor.invoke({"input": "What is the population of Korea times 2?"})
```

### 2. Chains
Sequential operations combining LLMs with utilities.

**Chain Types**:
- **LLMChain**: Basic LLM + prompt combination
- **SequentialChain**: Multiple chains in sequence
- **RouterChain**: Routes to different chains based on input
- **TransformChain**: Data transformation without LLM
- **MapReduceChain**: Process multiple documents

```python
from langchain.chains import LLMChain, SequentialChain
from langchain.prompts import PromptTemplate

# Analysis chain
analysis_prompt = PromptTemplate(
    input_variables=["text"],
    template="Analyze the following text and extract key points:\n{text}"
)
analysis_chain = LLMChain(llm=llm, prompt=analysis_prompt, output_key="analysis")

# Summary chain
summary_prompt = PromptTemplate(
    input_variables=["analysis"],
    template="Summarize the following analysis in 3 bullet points:\n{analysis}"
)
summary_chain = LLMChain(llm=llm, prompt=summary_prompt, output_key="summary")

# Combined sequential chain
overall_chain = SequentialChain(
    chains=[analysis_chain, summary_chain],
    input_variables=["text"],
    output_variables=["analysis", "summary"]
)
```

### 3. Memory Systems
Context maintenance across interactions.

**Memory Types**:
| Type | Description | Use Case |
|------|-------------|----------|
| ConversationBufferMemory | Stores full history | Short conversations |
| ConversationSummaryMemory | Summarizes history | Long conversations |
| ConversationBufferWindowMemory | Last K interactions | Token optimization |
| EntityMemory | Tracks entities | Character/entity tracking |
| VectorStoreMemory | Semantic retrieval | Large knowledge bases |

```python
from langchain.memory import ConversationSummaryBufferMemory

memory = ConversationSummaryBufferMemory(
    llm=llm,
    max_token_limit=2000,
    return_messages=True,
    memory_key="chat_history"
)

# Add to chain
chain = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)
```

### 4. Document Processing

**Document Loaders**:
```python
from langchain.document_loaders import (
    PyPDFLoader,
    TextLoader,
    CSVLoader,
    WebBaseLoader
)

# Load PDF
pdf_loader = PyPDFLoader("document.pdf")
documents = pdf_loader.load()

# Load web page
web_loader = WebBaseLoader("https://example.com")
web_docs = web_loader.load()
```

**Text Splitters**:
```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    separators=["\n\n", "\n", " ", ""]
)

chunks = text_splitter.split_documents(documents)
```

**Vector Stores**:
```python
from langchain.vectorstores import Chroma, FAISS, Pinecone
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# Create vector store
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

# Similarity search
results = vectorstore.similarity_search(query, k=4)
```

### 5. Callbacks
Hooks for logging, monitoring, and debugging.

```python
from langchain.callbacks import BaseCallbackHandler

class CustomCallback(BaseCallbackHandler):
    def on_llm_start(self, serialized, prompts, **kwargs):
        print(f"LLM started with {len(prompts)} prompts")

    def on_llm_end(self, response, **kwargs):
        print(f"LLM finished. Tokens: {response.llm_output.get('token_usage')}")

    def on_chain_start(self, serialized, inputs, **kwargs):
        print(f"Chain started: {serialized.get('name')}")

    def on_tool_start(self, serialized, input_str, **kwargs):
        print(f"Tool started: {serialized.get('name')}")

    def on_agent_action(self, action, **kwargs):
        print(f"Agent action: {action.tool} with input {action.tool_input}")

# Usage
chain.invoke({"input": query}, config={"callbacks": [CustomCallback()]})
```

## Key Implementation Patterns

### RAG (Retrieval-Augmented Generation)

```python
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Custom RAG prompt
rag_prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""Use the following context to answer the question.
If the answer is not in the context, say "I don't have enough information."

Context: {context}

Question: {question}

Answer:"""
)

# Create RAG chain
rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",  # stuff, map_reduce, refine, map_rerank
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4}),
    chain_type_kwargs={"prompt": rag_prompt},
    return_source_documents=True
)

# Query
result = rag_chain.invoke({"query": "What is the refund policy?"})
print(result["result"])
print(result["source_documents"])
```

### Custom Agent with Tools

```python
from langchain.tools import StructuredTool
from pydantic import BaseModel, Field

# Define tool input schema
class SearchInput(BaseModel):
    query: str = Field(description="Search query")
    num_results: int = Field(default=5, description="Number of results")

# Create structured tool
search_tool = StructuredTool.from_function(
    func=perform_search,
    name="web_search",
    description="Search the web for current information",
    args_schema=SearchInput
)

# Database query tool
class SQLInput(BaseModel):
    query: str = Field(description="SQL query to execute")

sql_tool = StructuredTool.from_function(
    func=execute_sql,
    name="database_query",
    description="Execute SQL queries on the database",
    args_schema=SQLInput
)

# Create agent with custom tools
agent = create_openai_functions_agent(
    llm=ChatOpenAI(model="gpt-4"),
    tools=[search_tool, sql_tool],
    prompt=hub.pull("hwchase17/openai-functions-agent")
)
```

### Multi-Step Chains with Routing

```python
from langchain.chains.router import MultiPromptChain
from langchain.chains.router.llm_router import LLMRouterChain, RouterOutputParser

# Define destination chains
physics_chain = LLMChain(llm=llm, prompt=physics_prompt)
math_chain = LLMChain(llm=llm, prompt=math_prompt)
history_chain = LLMChain(llm=llm, prompt=history_prompt)

destinations = [
    {"name": "physics", "description": "Questions about physics"},
    {"name": "math", "description": "Questions about mathematics"},
    {"name": "history", "description": "Questions about history"}
]

# Router chain
router_chain = LLMRouterChain.from_llm(llm, RouterOutputParser())

# Multi-prompt chain
chain = MultiPromptChain(
    router_chain=router_chain,
    destination_chains={
        "physics": physics_chain,
        "math": math_chain,
        "history": history_chain
    },
    default_chain=general_chain
)
```

## Production Considerations

### Memory Selection Criteria

| Scenario | Recommended Memory |
|----------|-------------------|
| Short chat sessions | ConversationBufferMemory |
| Long conversations | ConversationSummaryMemory |
| Token-limited models | ConversationBufferWindowMemory |
| Entity-heavy apps | EntityMemory |
| Knowledge bases | VectorStoreMemory |
| Multi-session | Redis/PostgreSQL backed |

### Performance Optimization

**Caching**:
```python
from langchain.cache import RedisCache
from langchain.globals import set_llm_cache
import redis

redis_client = redis.Redis.from_url("redis://localhost:6379")
set_llm_cache(RedisCache(redis_client))
```

**Streaming**:
```python
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler

llm = ChatOpenAI(
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()]
)
```

**Async Operations**:
```python
# Async chain execution
result = await chain.ainvoke({"input": query})

# Batch processing
results = await chain.abatch([
    {"input": query1},
    {"input": query2},
    {"input": query3}
])
```

### Testing Patterns

```python
import pytest
from langchain.llms.fake import FakeListLLM

def test_chain_with_mock():
    # Mock LLM responses
    fake_llm = FakeListLLM(responses=["Mocked response 1", "Mocked response 2"])

    chain = LLMChain(llm=fake_llm, prompt=prompt)
    result = chain.invoke({"input": "test"})

    assert "Mocked response" in result["text"]

def test_agent_tool_selection():
    # Test that agent selects correct tool
    agent_executor = create_test_agent()

    result = agent_executor.invoke({"input": "Calculate 2 + 2"})

    # Verify calculator tool was used
    assert "calculator" in str(result.get("intermediate_steps", []))
```

## Production Checklist

### Error Handling
- [ ] Implement retry logic for API calls
- [ ] Handle rate limits gracefully
- [ ] Fallback chains for failures
- [ ] Timeout configuration

### Logging & Monitoring
- [ ] Structured logging with correlation IDs
- [ ] Token usage tracking
- [ ] Latency monitoring
- [ ] Cost tracking per request

### Security
- [ ] Input validation and sanitization
- [ ] Output filtering for PII
- [ ] API key rotation
- [ ] Prompt injection prevention

### Observability
- [ ] LangSmith integration for tracing
- [ ] Custom callbacks for metrics
- [ ] Error rate monitoring
- [ ] Chain execution visualization

## TRD Document Sections

When documenting LangChain architecture in TRD:

1. **Agent Design**: Type, tools, decision logic
2. **Chain Architecture**: Flow diagram, chain types used
3. **Memory Strategy**: Memory type, persistence, cleanup
4. **RAG Configuration**: Chunk size, overlap, retriever settings
5. **Vector Store**: Technology choice, indexing strategy
6. **LLM Selection**: Model, temperature, token limits
7. **Caching Strategy**: What to cache, TTL settings
8. **Error Handling**: Retry policies, fallbacks
9. **Cost Estimation**: Tokens per request, monthly estimates
10. **Scaling Plan**: Concurrent users, rate limits
