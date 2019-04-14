﻿using Microsoft.Extensions.Logging;
using SimpleInjector;
using SimpleInjector.Advanced;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using Container = SimpleInjector.Container;

namespace AutoTesting
{
    class MsContextualLoggerInjectionBehavior : IDependencyInjectionBehavior
    {
        private readonly ILoggerFactory factory;
        private readonly IDependencyInjectionBehavior original;
        private readonly Container container;

        public MsContextualLoggerInjectionBehavior(
            ILoggerFactory factory, Container container)
        {
            this.factory = factory;
            this.original = container.Options.DependencyInjectionBehavior;
            this.container = container;
        }

        public void Verify(InjectionConsumerInfo consumer) => original.Verify(consumer);

        public InstanceProducer GetInstanceProducer(InjectionConsumerInfo i, bool t) =>
            i.Target.TargetType == typeof(ILogger)
                ? GetLoggerInstanceProducer(i.ImplementationType)
                : original.GetInstanceProducer(i, t);

        private InstanceProducer<ILogger> GetLoggerInstanceProducer(Type type) =>
            Lifestyle.Singleton.CreateProducer(() => factory.CreateLogger(type), container);
    }
}