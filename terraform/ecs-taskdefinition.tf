resource "aws_ecs_task_definition" "server_app_td" {
  family                   = "server-app-definition"
  requires_compatibilities = ["FARGATE"]
  task_role_arn            = "arn:aws:iam::918195417335:role/ECS-task-role"
  execution_role_arn       = "arn:aws:iam::918195417335:role/ECS-execution-role"
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  container_definitions = jsonencode([
    {
      name      = "server-app"
      # image     = "918195417335.dkr.ecr.ap-southeast-1.amazonaws.com/server-app:latest"
      image = "hoangdat12/face_recognition-server:latest"
      cpu       = 256
      memory    = 512
      essential = true
      environment: [
        { name = "AWS_DYNAMODB_TABLE_NAME", value = "face-recognition-employees" },
        { name = "AWS_DYNAMODB_TABLE_DEVICE_ID", value = "face-recognition-device_ids" },
        { name = "AWS_DYNAMODB_TABLE_HISTORY", value = "face-recognition-history" },
        { name = "AWS_DYNAMODB_TABLE_HISTORY_ACTION", value = "face-recognition-history-action" },
        { name = "AWS_S3_BUCKET_EMPLOYEES", value = "recognition-employees" },
        { name = "AWS_S3_BUCKET_GUEST", value = "recognition-guest" },
        { name = "AWS_REKOGNITION_COLLECTION", value = "employees" },
        { name = "AWS_REGION", value = "ap-southeast-1" },
        { name = "ACCESS_TOKEN_SECRET_KEY", value = "abc123" },
        { name = "REFRESH_TOKEN_SECRET_KEY", value = "abc234" }
      ],
      portMappings = [
        {
          containerPort = 8000
          hostPort      = 8000
          appProtocol   = "http"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-create-group"   = "true"
          "awslogs-group"          = "/ecs/server-app-definition"
          "awslogs-region"         = "ap-southeast-1"
          "awslogs-stream-prefix"  = "ecs"
        }
      }
    }
  ])
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
}

resource "aws_ecs_task_definition" "client_app_td" {
  family                   = "client-app-definition"
  requires_compatibilities = ["FARGATE"]
  execution_role_arn       = "arn:aws:iam::918195417335:role/ECS-execution-role"
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  container_definitions = jsonencode([
    {
      name      = "client-app"
      # image     = "918195417335.dkr.ecr.ap-southeast-1.amazonaws.com/client-app:latest"
      image = "hoangdat12/face_recognition-client:latest"
      cpu       = 256
      memory    = 512
      essential = true
      environment: [
        {"name": "VITE_APP_SERVER_URL", "value": "http://${data.aws_lb.backend_lb.dns_name}"}
      ],
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          appProtocol   = "http"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-create-group"   = "true"
          "awslogs-group"          = "/ecs/client-app-definition"
          "awslogs-region"         = "ap-southeast-1"
          "awslogs-stream-prefix"  = "ecs"
        }
      }
    }
  ])
}

